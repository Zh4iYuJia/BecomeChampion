'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CSV_DIR = path.join(ROOT, '10e');
const OUT_JSON_PATH = path.join(ROOT, 'rulepacks', 'SM-BT-rules-pack.json');

const PACK_VERSION = '1.0.0';
const PACK_ID = 'sm-bt-rules-pack';
const PACK_NAME = 'SM-BT-rules-pack.json';
const CORE_STRATAGEM_TYPE_RE = /^Core\s*[–-]/i;

const INCLUDED_DETACHMENTS = [
  { id: '000000750', name: 'Gladius Task Force', kind: 'generic' },
  { id: '000000793', name: 'Anvil Siege Force', kind: 'generic' },
  { id: '000000794', name: 'Ironstorm Spearhead', kind: 'generic' },
  { id: '000000795', name: 'Firestorm Assault Force', kind: 'generic' },
  { id: '000000796', name: 'Stormlance Task Force', kind: 'generic' },
  { id: '000000797', name: 'Vanguard Spearhead', kind: 'generic' },
  { id: '000001130', name: 'Bastion Task Force', kind: 'generic' },
  { id: '000001131', name: 'Orbital Assault Force', kind: 'generic' },
  { id: '000001006', name: 'Wrathful Procession' },
  { id: '000001091', name: 'Companions of Vehemence' },
  { id: '000001092', name: 'Vindication Task Force' },
  { id: '000001093', name: 'Godhammer Assault Force' },
];

const OTHER_CHAPTER_KEYWORDS = new Set([
  'Blood Angels',
  'Dark Angels',
  'Deathwatch',
  'Deathwing',
  'Imperial Fists',
  'Inner Circle',
  'Iron Hands',
  'Raven Guard',
  'Ravenwing',
  'Salamanders',
  'Space Wolves',
  'Ultramarines',
  'White Scars',
]);

const BANNED_GENERIC_DATASHEETS = new Set([
  'Gladiator Lancer',
  'Gladiator Reaper',
  'Gladiator Valiant',
  'Impulsor',
  'Land Raider Crusader',
  'Repulsor',
  'Repulsor Executioner',
  'Sternguard Veteran Squad',
  'Terminator Squad',
]);

function readCsv(fileName) {
  const raw = fs.readFileSync(path.join(CSV_DIR, fileName), 'utf8');
  const lines = raw.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];

  const headers = splitRow(lines[0]);
  if (headers.length > 0) {
    headers[0] = headers[0].replace(/^\uFEFF/, '');
  }
  const rows = [];
  for (let index = 1; index < lines.length; index += 1) {
    const parts = splitRow(lines[index]);
    const row = {};
    for (let col = 0; col < headers.length; col += 1) {
      row[headers[col]] = (parts[col] || '').trim();
    }
    rows.push(row);
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
  return String(input || '')
    .replace(/<br\s*\/??\s*>/gi, '\n')
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
}

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'entry';
}

function mapPhases(phaseRaw) {
  const phase = String(phaseRaw || '').toLowerCase();
  const phases = [];

  if (phase.includes('command')) phases.push('command');
  if (phase.includes('movement')) phases.push('movement');
  if (phase.includes('shooting')) phases.push('shooting');
  if (phase.includes('charge')) phases.push('charge');
  if (phase.includes('fight')) phases.push('fight');
  if (phase.includes('battle-shock') || phase.includes('battleshock')) phases.push('battleshock');

  return phases.length > 0 ? [...new Set(phases)] : ['any'];
}

function mapTurnScope(turnRaw) {
  const turn = String(turnRaw || '').toLowerCase();
  if (turn.includes('either')) return 'either';
  if (turn.includes('opponent')) return 'enemy';
  if (turn.includes('your')) return 'friendly';
  return 'either';
}

function inferPhasesFromText(name, description) {
  const text = `${name || ''}\n${stripHtml(description || '')}`.toLowerCase();
  const phases = [];

  if (/command phase|battle-shock step of your command phase/.test(text)) phases.push('command');
  if (/movement phase|normal move|advance move|fall back move|ends a move/.test(text)) phases.push('movement');
  if (/shooting phase|ranged attack|selected to shoot|has shot/.test(text)) phases.push('shooting');
  if (/charge phase|charge move|declare a charge/.test(text)) phases.push('charge');
  if (/fight phase|melee attack|selected to fight|pile-?in|consolidation/.test(text)) phases.push('fight');
  if (/battle-shock|battleshocked|leadership test/.test(text)) phases.push('battleshock');

  return phases.length > 0 ? [...new Set(phases)] : ['any'];
}

function inferAbilityType(sourceType, description) {
  const source = String(sourceType || '').toLowerCase();
  const text = stripHtml(description || '').toLowerCase();

  if (source.includes('wargear')) return 'wargear';
  if (/just after|opponent's|enemy unit|selected as the target|was selected as the target/.test(text)) return 'reaction';
  if (/once per battle|once per turn|at the start of|in your |your command phase|select one/.test(text)) return 'active';
  return 'passive';
}

function inferOncePer(description) {
  const text = stripHtml(description || '').toLowerCase();
  const match = text.match(/once per (battle round|battle|turn|phase)/);
  return match ? match[1] : undefined;
}

function extractTiming(description) {
  const text = stripHtml(description || '').replace(/\s+/g, ' ').trim();
  const patterns = [
    /At the start of your [^.]+/i,
    /At the end of your [^.]+/i,
    /In your [^.]+/i,
    /Your opponent'?s [^.]+/i,
    /Fight phase[^.]*/i,
    /Shooting phase[^.]*/i,
    /Movement phase[^.]*/i,
    /Charge phase[^.]*/i,
    /Battle-shock[^.]*/i,
    /While this [^.]+/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[0].trim();
  }

  return text.slice(0, 120) || 'See rule text';
}

function extractRuleSection(description, label) {
  const text = stripHtml(description || '').replace(/\s+/g, ' ').trim();
  const pattern = new RegExp(`${label}:\\s*(.+?)(?=\\b(?:WHEN|TARGET|EFFECT|RESTRICTIONS):|$)`, 'i');
  const match = text.match(pattern);
  return match ? match[1].trim() : '';
}

function buildSourceMap(rows) {
  return new Map(rows.map((row) => [row.id, row]));
}

function buildKeywordMap(rows) {
  const byDatasheetId = new Map();
  for (const row of rows) {
    const list = byDatasheetId.get(row.datasheet_id) || [];
    list.push(row.keyword);
    byDatasheetId.set(row.datasheet_id, list);
  }
  return byDatasheetId;
}

function buildAbilityMap(rows) {
  const byDatasheetId = new Map();
  for (const row of rows) {
    const list = byDatasheetId.get(row.datasheet_id) || [];
    list.push(row);
    byDatasheetId.set(row.datasheet_id, list);
  }
  return byDatasheetId;
}

function getSourceName(sourceRow) {
  return String(sourceRow?.name || '');
}

function isBtCompatibleSource(sourceRow) {
  return /space marines|black templars/i.test(getSourceName(sourceRow));
}

function isBtSource(sourceRow) {
  return /black templars/i.test(getSourceName(sourceRow));
}

function isPsykerUnit(datasheet, keywords) {
  const keywordSet = new Set(keywords || []);
  return keywordSet.has('Psyker') || /librarian/i.test(String(datasheet?.name || ''));
}

function isBtOrCommonUnit(datasheet, keywords, sourceRow) {
  if (!datasheet || datasheet.faction_id !== 'SM') return false;
  if (!isBtCompatibleSource(sourceRow)) return false;

  const sourceName = getSourceName(sourceRow);
  const keywordSet = new Set((keywords || []).filter(Boolean));
  if (isPsykerUnit(datasheet, keywords)) return false;

  if (/^space marines/i.test(sourceName) && BANNED_GENERIC_DATASHEETS.has(stripHtml(datasheet.name))) {
    return false;
  }

  if (keywordSet.has('Black Templars')) return true;

  for (const keyword of OTHER_CHAPTER_KEYWORDS) {
    if (keywordSet.has(keyword)) return false;
  }

  return true;
}

function buildUnitAbility(unitName, row, sourceName) {
  const name = stripHtml(row.name);
  const summary = stripHtml(row.description);
  if (!name || !summary) return null;

  const sourceType = String(row.type || '');
  if (!/datasheet|wargear/i.test(sourceType)) return null;

  const phases = inferPhasesFromText(name, summary);
  return {
    id: `unit-${slugify(unitName)}-${slugify(name)}`,
    name,
    phases,
    timing: extractTiming(summary),
    type: inferAbilityType(sourceType, summary),
    once_per: inferOncePer(summary),
    summary,
    source: sourceName,
    priority: phases.includes('any') ? 2 : 3,
  };
}

function buildUnits(datasheets, abilityMap, keywordMap, sourceMap) {
  const unitsByName = new Map();

  for (const datasheet of datasheets) {
    const keywords = [...new Set(keywordMap.get(datasheet.id) || [])];
    const sourceRow = sourceMap.get(datasheet.source_id);
    if (!isBtOrCommonUnit(datasheet, keywords, sourceRow)) continue;

    const sourceName = getSourceName(sourceRow) || datasheet.source_id || 'Wahapedia CSV';
    const abilities = (abilityMap.get(datasheet.id) || [])
      .map((row) => buildUnitAbility(datasheet.name, row, sourceName))
      .filter(Boolean);

    if (abilities.length === 0) continue;

    const unit = {
      id: `unit-${datasheet.id}`,
      name: stripHtml(datasheet.name),
      keywords,
      abilities,
    };

    const existing = unitsByName.get(unit.name);
    if (!existing) {
      unitsByName.set(unit.name, unit);
      continue;
    }

    const existingSource = sourceMap.get(existing.id.replace(/^unit-/, ''));
    if (isBtSource(sourceRow) && !isBtSource(existingSource)) {
      unitsByName.set(unit.name, unit);
    }
  }

  return [...unitsByName.values()].sort((left, right) => left.name.localeCompare(right.name));
}

function buildStratagems(rows, detachmentById) {
  const seenCoreNames = new Set();

  return rows.flatMap((row) => {
    const typeName = stripHtml(row.type || 'Stratagem');
    const isCoreStratagem = CORE_STRATAGEM_TYPE_RE.test(typeName);
    const coreKey = `${stripHtml(row.name)}|${stripHtml(row.turn)}|${stripHtml(row.phase)}`;

    if (isCoreStratagem && seenCoreNames.has(coreKey)) {
      return [];
    }

    if (isCoreStratagem) {
      seenCoreNames.add(coreKey);
    }

    const detachmentName = isCoreStratagem
      ? 'Core Stratagems'
      : detachmentById.get(row.detachment_id) || stripHtml(row.detachment) || 'Unknown Detachment';
    const timing = extractRuleSection(row.description, 'WHEN') || `${stripHtml(row.turn)} - ${stripHtml(row.phase)}`;
    const target = extractRuleSection(row.description, 'TARGET') || 'See rule text';
    const effect = extractRuleSection(row.description, 'EFFECT') || stripHtml(row.description);
    const cpCost = Number(row.cp_cost);

    return [{
      id: `strat-${row.id || slugify(row.name)}`,
      name: stripHtml(row.name),
      cp_cost: Number.isFinite(cpCost) ? cpCost : 1,
      phases: mapPhases(row.phase),
      turn: stripHtml(row.turn),
      turn_scope: mapTurnScope(row.turn),
      timing,
      target,
      effect,
      source: `Wahapedia CSV / ${detachmentName}`,
      once_per: 'phase',
      priority: 4,
      tags: [typeName, detachmentName],
    }];
  });
}

function buildDetachmentRules(rows, detachmentById) {
  return rows
    .filter((row) => !/^restrictions$/i.test(stripHtml(row.name)))
    .map((row) => {
      const detachmentName = detachmentById.get(row.detachment_id) || stripHtml(row.detachment) || 'Unknown Detachment';
      return {
        id: `det-${row.id || slugify(row.name)}`,
        name: stripHtml(row.name),
        phases: ['any'],
        timing: `Detachment Rule - ${detachmentName}`,
        type: 'detachment',
        summary: stripHtml(row.description),
        source: `Wahapedia CSV / ${detachmentName}`,
        priority: 5,
      };
    });
}

function buildEnhancements(rows, detachmentById) {
  return rows.map((row) => {
    const detachmentName = detachmentById.get(row.detachment_id) || stripHtml(row.detachment) || 'Unknown Detachment';
    const cost = String(row.cost || '').trim();
    const summaryBase = stripHtml(row.description);
    return {
      id: `enh-${row.id || slugify(row.name)}`,
      name: stripHtml(row.name),
      phases: ['any'],
      timing: `Army Roster - ${detachmentName}`,
      type: 'enhancement',
      summary: cost ? `${summaryBase}\n\nPoints: ${cost}` : summaryBase,
      source: `Wahapedia CSV / ${detachmentName}`,
      priority: 3,
    };
  });
}

function main() {
  const detachmentIds = new Set(INCLUDED_DETACHMENTS.map((detachment) => detachment.id));
  const detachmentById = new Map(INCLUDED_DETACHMENTS.map((detachment) => [detachment.id, detachment.name]));
  const genericDetachmentNames = INCLUDED_DETACHMENTS
    .filter((detachment) => detachment.kind === 'generic')
    .map((detachment) => detachment.name);
  const btDetachmentNames = INCLUDED_DETACHMENTS
    .filter((detachment) => detachment.kind !== 'generic')
    .map((detachment) => detachment.name);

  const sourceMap = buildSourceMap(readCsv('Source.csv'));
  const datasheets = readCsv('Datasheets.csv');
  const keywordMap = buildKeywordMap(readCsv('Datasheets_keywords.csv'));
  const abilityMap = buildAbilityMap(readCsv('Datasheets_abilities.csv'));

  const stratagemRows = readCsv('Stratagems.csv')
    .filter((row) => detachmentIds.has(row.detachment_id) || CORE_STRATAGEM_TYPE_RE.test(stripHtml(row.type || '')));

  const detachmentAbilityRows = readCsv('Detachment_abilities.csv')
    .filter((row) => detachmentIds.has(row.detachment_id));

  const enhancementRows = readCsv('Enhancements.csv')
    .filter((row) => detachmentIds.has(row.detachment_id));

  const units = buildUnits(datasheets, abilityMap, keywordMap, sourceMap);
  const stratagems = buildStratagems(stratagemRows, detachmentById);
  const detachmentRules = buildDetachmentRules(detachmentAbilityRows, detachmentById);
  const enhancements = buildEnhancements(enhancementRows, detachmentById);

  const pack = {
    $schema: 'https://becomechampion.app/schemas/rules-pack-v1.json',
    $comment: 'BecomeChampion Rules Pack - Space Marines / Black Templars (10th Edition). Generated from 10e CSV data. Includes Black Templars-exclusive detachments, Black Templars-exclusive units, and all compatible common Space Marines units and detachments surfaced from the current dataset; not official rules text.',
    id: PACK_ID,
    faction: 'Space Marines',
    subfaction: 'Black Templars',
    game_version: '10th Edition',
    pack_version: PACK_VERSION,
    date: new Date().toISOString().slice(0, 10),
    author: 'Community',
    source_note: `Generated from current 10e CSV exports. This pack includes Black Templars-exclusive detachments ${btDetachmentNames.join(', ')}, plus generic Space Marines detachments ${genericDetachmentNames.join(', ')} and standard Core Stratagems. Units include Black Templars-exclusive datasheets and common Space Marines datasheets compatible with Heirs of Sigismund restrictions, excluding Adeptus Astartes Psykers, 1st Company Task Force content, and generic codex datasheets explicitly banned for Black Templars armies. Rules text is extracted and normalized for in-app prompting; check official publications for authoritative wording.`,
    units,
    stratagems,
    detachment_rules: detachmentRules,
    enhancements,
  };

  fs.writeFileSync(OUT_JSON_PATH, `${JSON.stringify(pack, null, 2)}\n`, 'utf8');

  console.log(`Generated ${PACK_NAME}`);
  console.log(`Units: ${units.length}`);
  console.log(`Stratagems: ${stratagems.length}`);
  console.log(`Detachment rules: ${detachmentRules.length}`);
  console.log(`Enhancements: ${enhancements.length}`);
}

main();
