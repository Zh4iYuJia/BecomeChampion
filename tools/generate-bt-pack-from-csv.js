'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CSV_DIR = path.join(ROOT, '10e');
const BASE_PACK_PATH = path.join(ROOT, 'sample-rules-pack.json');
const OUT_JSON_PATH = path.join(ROOT, 'sample-rules-pack.json');
const OUT_JS_PATH = path.join(ROOT, 'sample-pack.js');

const DETACHMENTS = [
  { id: '000001006', name: 'Wrathful Procession' },
  { id: '000000750', name: 'Gladius Task Force' },
  { id: '000001130', name: 'Bastion Task Force' },
];

function readCsv(fileName) {
  const raw = fs.readFileSync(path.join(CSV_DIR, fileName), 'utf8');
  const lines = raw.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];

  const headers = splitRow(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i += 1) {
    const parts = splitRow(lines[i]);
    const obj = {};
    for (let j = 0; j < headers.length; j += 1) {
      obj[headers[j]] = (parts[j] || '').trim();
    }
    rows.push(obj);
  }
  return rows;
}

function splitRow(line) {
  const cols = line.split('|');
  if (cols.length > 0 && cols[cols.length - 1] === '') {
    cols.pop();
  }
  return cols;
}

function stripHtml(input) {
  const text = String(input || '')
    .replace(/<br\s*\/?\s*>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<li>/gi, ' - ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+\n/g, '\n')
    .replace(/\n\s+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
  return text;
}

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'entry';
}

function mapPhases(phaseRaw) {
  const p = String(phaseRaw || '').toLowerCase();
  const phases = [];

  if (p.includes('command')) phases.push('command');
  if (p.includes('movement')) phases.push('movement');
  if (p.includes('shooting')) phases.push('shooting');
  if (p.includes('charge')) phases.push('charge');
  if (p.includes('fight')) phases.push('fight');
  if (p.includes('battle-shock') || p.includes('battleshock')) phases.push('battleshock');

  if (phases.length === 0 || p.includes('any')) {
    return ['any'];
  }
  return [...new Set(phases)];
}

function buildStratagemTiming(turn, phase) {
  const t = stripHtml(turn || 'Either player\'s turn');
  const p = stripHtml(phase || 'Any phase');
  return `${t} - ${p}`;
}

function main() {
  const basePack = JSON.parse(fs.readFileSync(BASE_PACK_PATH, 'utf8'));
  const detachmentIds = new Set(DETACHMENTS.map((d) => d.id));
  const detachmentById = new Map(DETACHMENTS.map((d) => [d.id, d.name]));
  const detachmentSummary = DETACHMENTS.map((d) => d.name).join(' + ');

  const stratagemRows = readCsv('Stratagems.csv')
    .filter((r) => detachmentIds.has(r.detachment_id));

  const detachmentAbilityRows = readCsv('Detachment_abilities.csv')
    .filter((r) => detachmentIds.has(r.detachment_id));

  const enhancementRows = readCsv('Enhancements.csv')
    .filter((r) => detachmentIds.has(r.detachment_id));

  const stratagems = stratagemRows.map((r) => {
    const name = stripHtml(r.name);
    const effect = stripHtml(r.description);
    const cp = Number(r.cp_cost);
    const detachmentName = detachmentById.get(r.detachment_id) || stripHtml(r.detachment) || 'Unknown Detachment';
    return {
      id: `strat-${r.id || slugify(name)}`,
      name,
      cp_cost: Number.isFinite(cp) ? cp : 1,
      phases: mapPhases(r.phase),
      timing: buildStratagemTiming(r.turn, r.phase),
      target: '见规则原文 TARGET 段落',
      effect,
      source: `Wahapedia CSV / ${detachmentName}`,
      once_per: 'phase',
      priority: 4,
      tags: [stripHtml(r.type || 'stratagem'), detachmentName],
    };
  });

  const detachmentRules = detachmentAbilityRows.map((r) => {
    const detachmentName = detachmentById.get(r.detachment_id) || stripHtml(r.detachment) || 'Unknown Detachment';
    return {
      id: `det-${r.id || slugify(r.name)}`,
      name: stripHtml(r.name),
      phases: ['any'],
      timing: `编队规则 - ${detachmentName}`,
      type: 'detachment',
      summary: stripHtml(r.description),
      source: `Wahapedia CSV / ${detachmentName}`,
      priority: 5,
    };
  });

  const enhancements = enhancementRows.map((r) => {
    const cost = String(r.cost || '').trim();
    const summaryBase = stripHtml(r.description);
    const summary = cost ? `${summaryBase}\n\n点数: ${cost}` : summaryBase;
    const detachmentName = detachmentById.get(r.detachment_id) || stripHtml(r.detachment) || 'Unknown Detachment';
    return {
      id: `enh-${r.id || slugify(r.name)}`,
      name: stripHtml(r.name),
      phases: ['any'],
      timing: `建军阶段 - ${detachmentName}`,
      type: 'enhancement',
      summary,
      source: `Wahapedia CSV / ${detachmentName}`,
      priority: 3,
    };
  });

  const out = {
    ...basePack,
    $comment: 'BecomeChampion Rules Pack - Black Templars (10th Edition). Generated from 10e CSV data with summarized text for Wrathful Procession, Gladius Task Force, and Bastion Task Force; not official rules text.',
    id: 'bt-multi-detachments-10th-v1.2',
    subfaction: detachmentSummary,
    pack_version: '1.2.0',
    date: new Date().toISOString().slice(0, 10),
    source_note: '基于 10e CSV 数据（Wahapedia 导出）自动生成。当前默认包含 Wrathful Procession、Gladius Task Force、Bastion Task Force 的编队规则、战略点与强化；单位能力仍保留黑圣堂核心条目。请以官方规则原文为准。',
    detachment_rules: detachmentRules,
    stratagems,
    enhancements,
  };

  fs.writeFileSync(OUT_JSON_PATH, `${JSON.stringify(out, null, 2)}\n`, 'utf8');
  fs.writeFileSync(OUT_JS_PATH, `window.BC_SAMPLE_PACK = ${JSON.stringify(out, null, 2)};\n`, 'utf8');

  console.log(
    `Generated ${stratagems.length} stratagems, ${detachmentRules.length} detachment rules, ${enhancements.length} enhancements from ${DETACHMENTS.length} detachments.`
  );
}

main();
