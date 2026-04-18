'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SOURCE_PATH = path.join(ROOT, 'rulepacks', 'SM-BT-rules-pack.json');
const OUT_PATH = path.join(ROOT, 'rulepacks', 'CN-SM-BT-rules-pack.json');

const PACK_ID = 'cn-sm-bt-rules-pack';
const PACK_VERSION = '1.0.0-cn.1';
const PACK_DATE = '2026-04-18';

const DETACHMENT_NAME_MAP = new Map([
  ['Gladius Task Force', '格拉迪乌斯特遣队'],
  ['Anvil Siege Force', '铁砧攻城特遣队'],
  ['Ironstorm Spearhead', '铁暴矛头'],
  ['Firestorm Assault Force', '烈焰风暴突击部队'],
  ['Stormlance Task Force', '风暴枪骑特遣队'],
  ['Vanguard Spearhead', '先锋矛头'],
  ['Bastion Task Force', '堡垒特遣队'],
  ['Orbital Assault Force', '轨道突击部队'],
  ['Wrathful Procession', '愤怒巡征'],
  ['Companions of Vehemence', '狂烈伴军'],
  ['Vindication Task Force', '昭雪特遣队'],
  ['Godhammer Assault Force', '神锤突击部队'],
]);

const EXACT_NAME_MAP = new Map([
  ...DETACHMENT_NAME_MAP.entries(),
  ['Space Marines', '星际战士'],
  ['Black Templars', '黑色圣堂'],
  ['Combat Doctrines', '战斗条令'],
  ['Shield of the Imperium', '帝国之盾'],
  ['Armoured Wrath', '装甲之怒'],
  ['Close-range Eradication', '近距歼灭'],
  ['Lightning Assault', '闪电突击'],
  ['Shadow Masters', '暗影宗师'],
  ['Zealous Litanies', '狂热连祷'],
  ['Righteous Fervour', '正义狂热'],
  ['Purge and Sanctify', '净化与神圣化'],
  ['Shock and Awe', '震慑突击'],
  ['Interlocking Tactics', '联锁战术'],
  ['Rapid-drop Deployment', '快速空降部署'],
]);

const EXACT_KEYWORD_MAP = new Map([
  ['Infantry', '步兵'],
  ['Character', '角色'],
  ['Imperium', '帝国'],
  ['Grenades', '手雷'],
  ['Battleline', '战线'],
  ['Fly', '飞行'],
  ['Jump Pack', '跳跃背包'],
  ['Vehicle', '载具'],
  ['Transport', '运输'],
  ['Dedicated Transport', '专属运输'],
  ['Titanic', '巨型'],
  ['Epic Hero', '史诗英雄'],
  ['Mounted', '骑乘'],
  ['Monster', '怪兽'],
  ['Walker', '步行机甲'],
  ['Psyker', '灵能者'],
]);

const COMMENT_CN = 'BecomeChampion 中文规则包 - 星际战士 / 黑色圣堂（第10版）。由现有黑色圣堂规则包派生生成，保留结构化字段并将主要玩家可见文本翻译为中文；规则关键词与部分游戏术语按原文保留，仅供应用内快速提示使用，并非官方规则原文。';
const SOURCE_NOTE_CN = '基于当前 SM-BT 黑色圣堂规则包生成的中文版本。包含黑色圣堂专属分遣队 Wrathful Procession、Companions of Vehemence、Vindication Task Force、Godhammer Assault Force，以及通用星际战士分遣队 Gladius Task Force、Anvil Siege Force、Ironstorm Spearhead、Firestorm Assault Force、Stormlance Task Force、Vanguard Spearhead、Bastion Task Force、Orbital Assault Force。单位范围与原黑色圣堂包保持一致；主要规则说明、时机、目标和效果翻译为中文，诸如 [LETHAL HITS]、Anti-X、invulnerable save X+ 等关键词可按英文理解。正式裁定请以官方出版物为准。';

const TEXT_REPLACEMENTS = [
  ['Detachment Rule - ', '分遣队规则 - '],
  ['Army Roster - ', '军队名单 - '],
  ['RESTRICTIONS', '限制'],
  ['Points: ', '点数：'],
  ['Each time a model in this unit makes a ranged attack that targets ', '本单位中的模型每次进行远程攻击并以'],
  ['Each time a model in this unit makes an attack that targets ', '本单位中的模型每次进行攻击并以'],
  ['Each time a model in this unit targets an enemy unit with a melee attack, ', '本单位中的模型每次以近战攻击选择敌方单位为目标时，'],
  ['weapons equipped by models in this unit', '本单位模型装备的武器'],
  ['weapons equipped by models in your unit', '你单位中模型装备的武器'],
  ['weapons equipped by that VEHICLE model', '该 VEHICLE 模型装备的武器'],
  ['weapons equipped by the bearer', '持有者装备的武器'],
  ['weapons equipped by this model', '该模型装备的武器'],
  ['ranged weapons equipped by models in your unit', '你单位中模型装备的远程武器'],
  ['melee weapons equipped by models in this unit', '本单位模型装备的近战武器'],
  ['models in your unit', '你单位中的模型'],
  ['from your army', '来自你军队的'],
  ['that has not been selected to shoot this phase.', '其在本阶段尚未被选中进行射击。'],
  ['that has not been selected to shoot this phase', '其在本阶段尚未被选中进行射击'],
  ['that was selected as the target of one or more of the attacking unit’s attacks.', '其被选为该攻击单位一次或多次攻击的目标。'],
  ["that was selected as the target of one or more of the attacking unit's attacks.", '其被选为该攻击单位一次或多次攻击的目标。'],
  ['that targets a MONSTER or VEHICLE unit', '以 MONSTER 或 VEHICLE 单位为目标'],
  ['that targets the closest eligible target', '以最近的合法目标为目标'],
  ['has the Feel No Pain 4+ ability', '拥有 Feel No Pain 4+ 能力'],
  ['has the Feel No Pain 5+ ability', '拥有 Feel No Pain 5+ 能力'],
  ['has the Feel No Pain 3+ ability', '拥有 Feel No Pain 3+ 能力'],
  ['has the [LETHAL HITS] ability', '拥有 [LETHAL HITS] 能力'],
  ['have the [LETHAL HITS] ability', '拥有 [LETHAL HITS] 能力'],
  ['have the [SUSTAINED HITS 1] ability', '拥有 [SUSTAINED HITS 1] 能力'],
  ['have the [DEVASTATING WOUNDS] ability', '拥有 [DEVASTATING WOUNDS] 能力'],
  ['have the [HEAVY] ability', '拥有 [HEAVY] 能力'],
  ['have the [ASSAULT] ability', '拥有 [ASSAULT] 能力'],
  ['has a 4+ invulnerable save.', '拥有 4+ invulnerable save。'],
  ['can return 1 destroyed model (excluding CHARACTER models) to that unit.', '可以将 1 个被摧毁的模型（不包括 CHARACTER 模型）返回该单位。'],
  ['roll one D6: on a 2+, you gain 1CP', '掷 1 个 D6：若为 2+，你获得 1CP'],
  ['worsen the Armour Penetration characteristic of that attack by 1.', '使该攻击的护甲穿透属性恶化 1。'],
  ['double the Objective Control characteristic of models in your unit', '将你单位中模型的目标控制（OC）属性翻倍'],
  ['but it must Remain Stationary this turn.', '但它本回合必须保持静止。'],
  ['if your unit Remained Stationary this turn', '若你的单位本回合保持静止'],
  ['scores a Critical Hit.', '则记为一次暴击。'],
  ['have the ', '拥有 '],
  ['has the ', '拥有 '],
  ['Your opponent’s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.', '在对手的射击阶段或近战阶段，敌方单位刚刚选择其目标后。'],
  ["Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.", '在对手的射击阶段或近战阶段，敌方单位刚刚选择其目标后。'],
  ['Your Shooting phase.', '你的射击阶段。'],
  ['Your Command phase.', '你的指挥阶段。'],
  ['Your Charge phase.', '你的冲锋阶段。'],
  ['Fight phase, this model can use this ability', '在近战阶段，该模型可以使用此能力'],
  ['At the start of your Command phase, ', '在你的指挥阶段开始时，'],
  ['At the start of the battle round, ', '在战斗轮开始时，'],
  ['At the start of the Declare Battle Formations step, ', '在声明战斗编成步骤开始时，'],
  ['At the end of your opponent’s turn, ', '在你对手回合结束时，'],
  ["At the end of your opponent's turn, ", '在你对手回合结束时，'],
  ['In your Command phase, ', '在你的指挥阶段，'],
  ['In your Shooting phase, ', '在你的射击阶段，'],
  ['In the Fight phase, ', '在近战阶段，'],
  ['Once per battle round, ', '每个战斗轮次一次，'],
  ['Once per battle, ', '每场战斗一次，'],
  ['Until the start of your next Command phase, ', '直到你下个指挥阶段开始时，'],
  ['Until the start of your next turn, ', '直到你下个回合开始时，'],
  ['Until the end of the battle round, ', '直到本战斗轮结束，'],
  ['Until the end of the battle, ', '直到战斗结束，'],
  ['Until the end of the turn, ', '直到本回合结束，'],
  ['Until the end of the phase, ', '直到本阶段结束，'],
  ['Each time a model in this unit makes an attack, ', '本单位中的模型每次进行攻击时，'],
  ['Each time a model in this unit makes a ranged attack, ', '本单位中的模型每次进行远程攻击时，'],
  ['Each time a model in this unit makes a melee attack, ', '本单位中的模型每次进行近战攻击时，'],
  ['Each time this unit ends a Charge move, ', '该单位每次结束一次冲锋移动时，'],
  ['Each time this unit is selected to fight, ', '该单位每次被选中进行近战时，'],
  ['Each time this model is selected to shoot or fight, ', '该模型每次被选中进行射击或近战时，'],
  ['Each time an attack targets ', '每次有攻击以'],
  ['Each time a ranged attack targets ', '每次有远程攻击以'],
  ['Each time a melee attack made by the bearer is allocated to an enemy model, ', '持有者每次进行的近战攻击被分配给敌方模型时，'],
  ['While this model is leading a unit, ', '当该模型领导一个单位时，'],
  ['While this model is within range of an objective marker and/or within 6" of the centre of the battlefield, ', '当该模型位于目标标记范围内且/或距离战场中心 6" 内时，'],
  ['When this model’s Bodyguard unit is destroyed, ', '当该模型的护卫单位被摧毁时，'],
  ["When this model's Bodyguard unit is destroyed, ", '当该模型的护卫单位被摧毁时，'],
  ['If this model’s unit destroys an enemy unit as the result of a melee attack, ', '如果该模型所在单位因一次近战攻击摧毁了敌方单位，'],
  ["If this model's unit destroys an enemy unit as the result of a melee attack, ", '如果该模型所在单位因一次近战攻击摧毁了敌方单位，'],
  ['If such a weapon already has this ability, ', '如果该武器已拥有此能力，'],
  ['if the attacking model’s unit Remained Stationary this turn, ', '若攻击模型所在单位本回合保持静止，'],
  ["if the attacking model's unit Remained Stationary this turn, ", '若攻击模型所在单位本回合保持静止，'],
  ['if it disembarked from a Transport this turn, ', '如果它本回合曾从运输载具中下车，'],
  ['if it was set up on the battlefield this turn, ', '如果它于本回合被部署到战场上，'],
  ['within Engagement Range of ', '位于以下目标的接战范围内：'],
  ['within range of an objective marker', '位于一个目标标记范围内'],
  ['within 6" of the bearer', '位于持有者 6" 内'],
  ['the bearer', '持有者'],
  ['this model', '该模型'],
  ['this unit', '该单位'],
  ['your army', '你的军队'],
  ['your unit', '你的单位'],
  ['enemy unit', '敌方单位'],
  ['enemy model', '敌方模型'],
  ['models in that unit', '该单位中的模型'],
  ['models in this unit', '本单位中的模型'],
  ['add 1 to the Hit roll', '命中掷骰结果 +1'],
  ['add 1 to the Wound roll', '致伤掷骰结果 +1'],
  ['subtract 1 from the Hit roll', '命中掷骰结果 -1'],
  ['subtract 1 from the Wound roll', '致伤掷骰结果 -1'],
  ['can re-roll the Hit roll', '可以重掷命中掷骰'],
  ['can re-roll the Wound roll', '可以重掷致伤掷骰'],
  ['can re-roll a Hit roll of 1', '可以重掷结果为 1 的命中掷骰'],
  ['can re-roll a Wound roll of 1', '可以重掷结果为 1 的致伤掷骰'],
  ['Hit roll', '命中掷骰'],
  ['Wound roll', '致伤掷骰'],
  ['Damage roll', '伤害掷骰'],
  ['Critical Hit', '暴击'],
  ['Armour Penetration characteristic', '护甲穿透属性'],
  ['Objective Control characteristic', '目标控制（OC）属性'],
  ['Ballistic Skill', '弹道技术'],
  ['Weapon Skill', '武器技术'],
  ['Move characteristic', '移动属性'],
  ['Wounds characteristic', '伤口属性'],
  ['Strength characteristic', '力量属性'],
  ['Toughness characteristic', '韧性属性'],
  ['Damage characteristic', '伤害属性'],
  ['Attacks characteristic', '攻击次数属性'],
  ['mortal wounds', '致命伤'],
  ['mortal wound', '致命伤'],
  ['ranged weapons', '远程武器'],
  ['melee weapons', '近战武器'],
  ['ranged weapon', '远程武器'],
  ['melee weapon', '近战武器'],
  ['ranged attack', '远程攻击'],
  ['melee attack', '近战攻击'],
  ['selected to shoot', '被选中进行射击'],
  ['selected to attack', '被选中进行攻击'],
  ['selected to fight', '被选中进行近战'],
  ['selected as the target', '被选为目标'],
  ['declares a charge', '声明冲锋'],
  ['Advance rolls', 'Advance 掷骰'],
  ['Charge rolls', '冲锋掷骰'],
  ['Battle-shock test', '战斗冲击测试'],
  ['Benefit of Cover', '掩体收益'],
  ['Normal move', '普通移动'],
  ['Deep Strike', 'Deep Strike'],
  ['Feel No Pain', 'Feel No Pain'],
  ['Fights First', 'Fights First'],
  ['Remained Stationary', '保持静止'],
  ['Advanced', 'Advance'],
  ['Fell Back', 'Fallback'],
  ['Wahapedia CSV / ', 'Wahapedia CSV / '],
  ['Battle Tactic Stratagem', '战斗战术战略'],
  ['Strategic Ploy Stratagem', '战略计策战略'],
  ['Epic Deed Stratagem', '英雄事迹战略'],
  ['Wargear Stratagem', '装备战略'],
  ['Reactive Stratagem', '反应战略'],
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function translateDetachmentNames(text) {
  let result = String(text || '');
  for (const [english, chinese] of DETACHMENT_NAME_MAP.entries()) {
    result = result.replace(new RegExp(escapeRegExp(english), 'g'), chinese);
  }
  return result;
}

function translateName(name) {
  if (!name) return name;
  return EXACT_NAME_MAP.get(name) || name;
}

function translateKeyword(keyword) {
  if (!keyword) return keyword;
  return EXACT_KEYWORD_MAP.get(keyword) || EXACT_NAME_MAP.get(keyword) || keyword;
}

function translateSource(source) {
  return translateText(source);
}

function translateTag(tag) {
  return translateText(tag);
}

function translateText(text) {
  if (!text) return text;

  let result = translateDetachmentNames(String(text));
  result = result
    .replace(/\bSpace Marines\b/g, '星际战士')
    .replace(/\bBlack Templars\b/g, '黑色圣堂');

  for (const [search, replacement] of TEXT_REPLACEMENTS) {
    result = result.split(search).join(replacement);
  }

  result = result
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/ ，/g, '，')
    .replace(/ \./g, '.')
    .trim();

  return result;
}

function translateAbility(ability) {
  return {
    ...ability,
    name: translateName(ability.name),
    timing: translateText(ability.timing),
    summary: translateText(ability.summary),
    source: translateSource(ability.source),
  };
}

function translateStratagem(stratagem) {
  return {
    ...stratagem,
    name: translateName(stratagem.name),
    timing: translateText(stratagem.timing),
    target: translateText(stratagem.target),
    effect: translateText(stratagem.effect),
    source: translateSource(stratagem.source),
    tags: Array.isArray(stratagem.tags) ? stratagem.tags.map(translateTag) : stratagem.tags,
  };
}

function translateDetachmentRule(rule) {
  return {
    ...rule,
    name: translateName(rule.name),
    timing: translateText(rule.timing),
    summary: translateText(rule.summary),
    source: translateSource(rule.source),
  };
}

function translateEnhancement(enhancement) {
  return {
    ...enhancement,
    name: translateName(enhancement.name),
    timing: translateText(enhancement.timing),
    summary: translateText(enhancement.summary),
    source: translateSource(enhancement.source),
  };
}

function translateUnit(unit) {
  return {
    ...unit,
    name: translateName(unit.name),
    keywords: Array.isArray(unit.keywords) ? unit.keywords.map(translateKeyword) : unit.keywords,
    abilities: Array.isArray(unit.abilities) ? unit.abilities.map(translateAbility) : unit.abilities,
  };
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function main() {
  const pack = readJson(SOURCE_PATH);
  const translated = {
    ...pack,
    $comment: COMMENT_CN,
    id: PACK_ID,
    faction: '星际战士',
    subfaction: '黑色圣堂',
    pack_version: PACK_VERSION,
    date: PACK_DATE,
    source_note: SOURCE_NOTE_CN,
    units: Array.isArray(pack.units) ? pack.units.map(translateUnit) : [],
    stratagems: Array.isArray(pack.stratagems) ? pack.stratagems.map(translateStratagem) : [],
    detachment_rules: Array.isArray(pack.detachment_rules) ? pack.detachment_rules.map(translateDetachmentRule) : [],
    enhancements: Array.isArray(pack.enhancements) ? pack.enhancements.map(translateEnhancement) : [],
  };

  writeJson(OUT_PATH, translated);

  console.log(`Wrote ${path.relative(ROOT, OUT_PATH)} (${translated.units.length} units, ${translated.stratagems.length} stratagems)`);
}

main();