'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SOURCE_PATH = path.join(ROOT, 'rulepacks', 'SM-BT-rules-pack.json');
const OUT_PATH = path.join(ROOT, 'rulepacks', 'CN-SM-BT-rules-pack.json');
const CACHE_PATH = path.join(ROOT, 'tools', 'cn-bt-translation-cache.json');

const PACK_ID = 'cn-sm-bt-rules-pack';
const PACK_VERSION = '1.0.0-cn.2';
const PACK_DATE = '2026-05-05';
const TRANSLATE_API = 'https://api.mymemory.translated.net/get';
const USE_REMOTE_TRANSLATION = false;
let translationServiceUnavailable = false;

const COMMENT_CN = 'BecomeChampion 中文规则包 - 星际战士 / 黑色圣堂（第10版）。本包基于现有黑色圣堂规则包重新生成，并使用公开网络翻译与术语词表对玩家可见文本进行完整中文化；关键词、单位名、能力名、战略、强化与分遣队规则均尽量统一为常见 40K 中文用语，仅供应用内对局辅助使用，并非官方规则原文。';
const SOURCE_NOTE_CN = '基于现有 SM-BT 黑色圣堂规则包生成的完整中文版本。包含黑色圣堂专属分遣队与兼容的通用星际战士分遣队，单位范围与原包保持一致。文本翻译参考公开网络资料与常见 40K 社区术语，对诸如 致命命中、连击、毁灭伤害、反X、无敌豁免、深袭、先攻 等关键词做了统一处理。正式规则解释与裁定请以官方出版物为准。';

const EXACT_TRANSLATIONS = new Map([
  ['Space Marines', '星际战士'],
  ['Black Templars', '黑色圣堂'],
  ['10th Edition', '第10版'],
  ['Community', '社区'],
  ['Adeptus Astartes', '阿斯塔特修会'],
  ['Imperium', '帝国'],
  ['Character', '角色'],
  ['Infantry', '步兵'],
  ['Vehicle', '载具'],
  ['Transport', '运输'],
  ['Dedicated Transport', '专属运输'],
  ['Battleline', '战线'],
  ['Grenades', '手雷'],
  ['Fly', '飞行'],
  ['Jump Pack', '跳跃背包'],
  ['Titanic', '巨型'],
  ['Mounted', '骑乘'],
  ['Monster', '怪兽'],
  ['Walker', '步行机甲'],
  ['Epic Hero', '史诗英雄'],
  ['Psyker', '灵能者'],
  ['Tacticus', '战术型'],
  ['Gravis', '重甲型'],
  ['Phobos', '福波斯型'],
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
  ['Feel No Pain', '无视伤害'],
  ['Fights First', '先攻'],
  ['Deep Strike', '深袭'],
  ['Battle-shock', '战斗冲击'],
  ['Lone Operative', '独行特工'],
  ['Stealth', '隐蔽'],
  ['Infiltrators', '渗透者'],
  ['Leader', '领袖'],
  ['Scouts', '侦察'],
]);

const OUTPUT_REPLACEMENTS = [
  [/Wahapedia CSV/gi, 'Wahapedia 数据'],
  [/Armour Penetration/gi, '护甲穿透'],
  [/Objective Control/gi, '目标控制（OC）'],
  [/Ballistic Skill/gi, '弹道技术'],
  [/Weapon Skill/gi, '武器技术'],
  [/Feel No Pain/gi, '无视伤害'],
  [/Fights First/gi, '先攻'],
  [/Deep Strike/gi, '深袭'],
  [/Battle-shock/gi, '战斗冲击'],
  [/Engagement Range/gi, '接战范围'],
  [/Critical Hit/gi, '暴击'],
  [/Critical Wound/gi, '重创'],
  [/Normal move/gi, '普通移动'],
  [/Advance move/gi, 'Advance 移动'],
  [/Advance rolls?/gi, 'Advance 掷骰'],
  [/Fall Back/gi, 'Fallback'],
  [/Wound roll/gi, '致伤掷骰'],
  [/Hit roll/gi, '命中掷骰'],
  [/Damage roll/gi, '伤害掷骰'],
  [/invulnerable save/gi, '无敌豁免'],
  [/Benefit of Cover/gi, '掩体增益'],
  [/Lethal Hits/gi, '致命命中'],
  [/Sustained Hits/gi, '连击'],
  [/Devastating Wounds/gi, '毁灭伤害'],
  [/Ignores Cover/gi, '无视掩体'],
  [/Rapid Fire/gi, '速射'],
  [/Twin-linked/gi, '双联'],
  [/Precision/gi, '精准'],
  [/Lance/gi, '突刺'],
  [/Torrent/gi, '洪流'],
  [/Pistol/gi, '手枪'],
  [/Blast/gi, '爆炸'],
  [/Melta/gi, '熔融'],
  [/Heavy/gi, '重型'],
  [/Hazardous/gi, '凶险'],
  [/Extra Attacks/gi, '额外攻击'],
  [/One Shot/gi, '单发'],
  [/Indirect Fire/gi, '间接射击'],
  [/Reactive Stratagem/gi, '反应战略'],
  [/Battle Tactic Stratagem/gi, '战斗战术战略'],
  [/Strategic Ploy Stratagem/gi, '战略计策战略'],
  [/Epic Deed Stratagem/gi, '英雄事迹战略'],
  [/Wargear Stratagem/gi, '装备战略'],
  [/Detachment Rule - /gi, '分遣队规则 - '],
  [/Army Roster - /gi, '军队名单 - '],
  [/Points:/gi, '点数：'],
  [/RESTRICTIONS/gi, '限制'],
  [/Adeptus Astartes/gi, '阿斯塔特修会'],
  [/Black Templars/gi, '黑色圣堂'],
  [/Space Marines/gi, '星际战士'],
  [/ Tacticus /g, ' 战术型 '],
  [/ Gravis /g, ' 重甲型 '],
  [/ Phobos /g, ' 福波斯型 '],
  [/ CHARACTER /g, ' 角色 '],
  [/ MONSTER /g, ' 怪兽 '],
  [/ VEHICLE /g, ' 载具 '],
  [/ INFANTRY /g, ' 步兵 '],
  [/ BATTLELINE /g, ' 战线 '],
  [/ GRENADES /g, ' 手雷 '],
  [/ SMOKE /g, ' 烟幕 '],
  [/ TITANIC /g, ' 巨型 '],
  [/ WALKER /g, ' 步行机甲 '],
  [/ AIRCRAFT /g, ' 飞行器 '],
  [/ TRANSPORT /g, ' 运输 '],
  [/ PSYKER /g, ' 灵能者 '],
  [/ FLY /g, ' 飞行 '],
  [/ FORTIFICATION /g, ' 防御工事 '],
  [/Benefit of cover/gi, '掩体增益'],
  [/护甲穿透特性/g, '护甲穿透属性'],
  [/目标控制特性/g, '目标控制（OC）属性'],
  [/弹道技能/g, '弹道技术'],
  [/武器技能/g, '武器技术'],
  [/领导技能/g, '领导力'],
  [/个人资料/g, '数据卡'],
  [/合格目标/g, '可选目标'],
  [/近战阶段开始时/g, '近战阶段开始时'],
  [/无敌保存/g, '无敌豁免'],
  [/致命打击/g, '致命命中'],
  [/可持续命中/g, '连击'],
  [/毁灭性伤口/g, '毁灭伤害'],
  [/无视封面/g, '无视掩体'],
  [/渗透器/g, '渗透者'],
  [/  +/g, ' '],
  [/\s+([,.;:，。；：])/g, '$1'],
  [/（OC）特性/g, '（OC）属性'],
  [/“/g, '"'],
  [/”/g, '"'],
  [/’/g, '’'],
];

const FALLBACK_REPLACEMENTS = [
  ['Detachment Rule - ', '分遣队规则 - '],
  ['Army Roster - ', '军队名单 - '],
  ['RESTRICTIONS', '限制'],
  ['Points: ', '点数：'],
  ['Each time a model in this unit makes a ranged attack that targets ', '本单位中的模型每次进行远程攻击并以'],
  ['Each time a model in this unit makes an attack that targets ', '本单位中的模型每次进行攻击并以'],
  ['Each time a model in this unit targets an enemy unit with a melee attack, ', '本单位中的模型每次以近战攻击选择敌方单位为目标时，'],
  ['Each time a model in this unit makes an attack, ', '本单位中的模型每次进行攻击时，'],
  ['Each time a model in this unit makes a ranged attack, ', '本单位中的模型每次进行远程攻击时，'],
  ['Each time a model in this unit makes a melee attack, ', '本单位中的模型每次进行近战攻击时，'],
  ['Each time this unit ends a Charge move, ', '该单位每次结束一次冲锋移动时，'],
  ['Each time this unit is selected to fight, ', '该单位每次被选中进行近战时，'],
  ['Each time this model is selected to shoot or fight, ', '该模型每次被选中进行射击或近战时，'],
  ['Each time an attack targets ', '每次有攻击以'],
  ['Each time a ranged attack targets ', '每次有远程攻击以'],
  ['Each time a melee attack made by the bearer is allocated to an enemy model, ', '持有者每次进行的近战攻击被分配给敌方模型时，'],
  ['At the start of your Command phase, ', '在你的指挥阶段开始时，'],
  ['At the start of the battle round, ', '在战斗轮开始时，'],
  ['At the start of the Declare Battle Formations step, ', '在声明战斗编成步骤开始时，'],
  ['At the end of your opponent’s turn, ', '在你对手回合结束时，'],
  ["At the end of your opponent's turn, ", '在你对手回合结束时，'],
  ['In your Command phase, ', '在你的指挥阶段，'],
  ['in your Command phase, ', '在你的指挥阶段，'],
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
  ['Your opponent’s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.', '在对手的射击阶段或近战阶段，敌方单位刚刚选择其目标后。'],
  ["Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.", '在对手的射击阶段或近战阶段，敌方单位刚刚选择其目标后。'],
  ['Your opponent’s Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.', '在对手的移动阶段，敌方单位刚完成一次普通移动、Advance 或 Fallback 后。'],
  ['Your Shooting phase.', '你的射击阶段。'],
  ['Your Command phase.', '你的指挥阶段。'],
  ['Your Charge phase.', '你的冲锋阶段。'],
  ['Movement phase, ranged weapons equipped by models in this unit have the [DEVASTATING WOUNDS] ability', '在移动阶段，本单位模型装备的远程武器拥有 [毁灭伤害] 能力'],
  ['Fight phase, this model can use this ability', '在近战阶段，该模型可以使用此能力'],
  ['this unit', '该单位'],
  ['this model', '该模型'],
  ['the bearer', '持有者'],
  ['your army', '你的军队'],
  ['your unit', '你的单位'],
  ['enemy unit', '敌方单位'],
  ['enemy model', '敌方模型'],
  ['models in that unit', '该单位中的模型'],
  ['models in this unit', '本单位中的模型'],
  ['models in your unit', '你单位中的模型'],
  ['from your army', '来自你军队的'],
  ['one or more enemy units', '一个或多个敌方单位'],
  ['one or more enemy models', '一个或多个敌方模型'],
  ['within Engagement Range of ', '位于以下目标的接战范围内：'],
  ['within range of an objective marker', '位于一个目标标记范围内'],
  ['within 6" of the bearer', '位于持有者 6" 内'],
  ['weapons equipped by models in this unit', '本单位模型装备的武器'],
  ['weapons equipped by models in your unit', '你单位中模型装备的武器'],
  ['weapons equipped by that VEHICLE model', '该载具模型装备的武器'],
  ['weapons equipped by the bearer', '持有者装备的武器'],
  ['weapons equipped by this model', '该模型装备的武器'],
  ['ranged weapons equipped by models in your unit', '你单位中模型装备的远程武器'],
  ['melee weapons equipped by models in this unit', '本单位模型装备的近战武器'],
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
  ['declare a charge', '声明冲锋'],
  ['declares a charge', '声明冲锋'],
  ['Advance rolls', 'Advance 掷骰'],
  ['Charge rolls', '冲锋掷骰'],
  ['Battle-shock test', '战斗冲击测试'],
  ['Normal move', '普通移动'],
  ['Remained Stationary', '保持静止'],
  ['Advanced', 'Advance'],
  ['Fell Back', 'Fallback'],
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
  ['can re-roll the Hit roll', '可以重掷命中掷骰'],
  ['can re-roll the Wound roll', '可以重掷致伤掷骰'],
  ['can re-roll a Hit roll of 1', '可以重掷结果为 1 的命中掷骰'],
  ['can re-roll a Wound roll of 1', '可以重掷结果为 1 的致伤掷骰'],
  ['add 1 to the Hit roll', '命中掷骰结果 +1'],
  ['add 1 to the Wound roll', '致伤掷骰结果 +1'],
  ['subtract 1 from the Hit roll', '命中掷骰结果 -1'],
  ['subtract 1 from the Wound roll', '致伤掷骰结果 -1'],
  ['can return 1 destroyed model (excluding CHARACTER models) to this unit', '可以将 1 个被摧毁的模型（不包括角色模型）返回该单位'],
  ['can return 1 destroyed model (excluding CHARACTER models) to that unit.', '可以将 1 个被摧毁的模型（不包括角色模型）返回该单位。'],
  ['double the Objective Control characteristic of models in your unit', '将你单位中模型的目标控制（OC）属性翻倍'],
  ['worsen the Armour Penetration characteristic of that attack by 1.', '使该攻击的护甲穿透属性恶化 1。'],
  ['that targets a MONSTER or VEHICLE unit', '以怪兽或载具单位为目标'],
  ['that targets the closest eligible target', '以最近的可选目标为目标'],
  ['that was selected as the target of one or more of the attacking unit’s attacks.', '其被选为该攻击单位一次或多次攻击的目标。'],
  ["that was selected as the target of one or more of the attacking unit's attacks.", '其被选为该攻击单位一次或多次攻击的目标。'],
  ['that has not been selected to shoot this phase.', '其在本阶段尚未被选中进行射击。'],
  ['that has not been selected to shoot this phase', '其在本阶段尚未被选中进行射击'],
  ['has the Feel No Pain 4+ ability', '拥有无视伤害 4+ 能力'],
  ['has the Feel No Pain 5+ ability', '拥有无视伤害 5+ 能力'],
  ['has the Feel No Pain 3+ ability', '拥有无视伤害 3+ 能力'],
  ['has a 4+ invulnerable save.', '拥有 4+ 无敌豁免。'],
  ['has the Deep Strike ability.', '拥有深袭能力。'],
  ['The bearer has the Stealth and Lone Operative abilities.', '持有者拥有隐蔽与独行特工能力。'],
  ['Models in the bearer’s unit have a 5+ invulnerable save.', '持有者所在单位中的模型拥有 5+ 无敌豁免。'],
  ['Models in the bearer’s unit have the Deep Strike ability.', '持有者所在单位中的模型拥有深袭能力。'],
  ['The bearer’s melee weapons have the [DEVASTATING WOUNDS] ability.', '持有者的近战武器拥有 [毁灭伤害] 能力。'],
  ['One ADEPTUS ASTARTES unit from your army that has not been selected to shoot or fight this phase.', '你军队中 1 个本阶段尚未被选中进行射击或近战的阿斯塔特修会单位。'],
  ['One Adeptus Astartes Infantry unit from your army that has not been selected to fight this phase.', '你军队中 1 个本阶段尚未被选中进行近战的阿斯塔特修会步兵单位。'],
  ['One ADEPTUS ASTARTES MOUNTED or ADEPTUS ASTARTES VEHICLE unit (excluding WALKERS) from your army.', '你军队中 1 个阿斯塔特修会骑乘单位或阿斯塔特修会载具单位（不包括步行机甲）。'],
  ['One ADEPTUS ASTARTES INFANTRY unit from your army that has not been selected to shoot this phase.', '你军队中 1 个本阶段尚未被选中进行射击的阿斯塔特修会步兵单位。'],
  ['One ADEPTUS ASTARTES INFANTRY unit from your army that has not been selected to fight this phase.', '你军队中 1 个本阶段尚未被选中进行近战的阿斯塔特修会步兵单位。'],
  ['One ADEPTUS ASTARTES unit from your army that is within Engagement Range of one or more enemy units.', '你军队中 1 个位于一个或多个敌方单位接战范围内的阿斯塔特修会单位。'],
  ['This unit can only be selected as the target of a ranged attack if the attacking model is within 12".', '只有当攻击模型位于 12" 内时，该单位才能被选为远程攻击目标。'],
  ['Enemy units that are set up on the battlefield from Reserves cannot be set up within 12" of this unit.', '从预备队部署到战场上的敌方单位不能部署在该单位 12" 内。'],
  ['Until the end of the phase, melee weapons equipped by models in your unit have the [PRECISION] ability.', '直到本阶段结束，你单位中模型装备的近战武器拥有 [精准] 能力。'],
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function loadCache() {
  if (!fs.existsSync(CACHE_PATH)) {
    return {};
  }

  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
  } catch {
    return {};
  }
}

function saveCache(cache) {
  fs.writeFileSync(CACHE_PATH, `${JSON.stringify(cache, null, 2)}\n`, 'utf8');
}

function containsEnglish(text) {
  return /[A-Za-z]/.test(String(text || ''));
}

function decodeHtmlEntities(text) {
  return String(text || '')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function splitLongText(text, maxLength = 650) {
  if (text.length <= maxLength) {
    return [text];
  }

  const rawSegments = text.split(/(\n+)/);
  const chunks = [];
  let current = '';

  function pushCurrent() {
    if (current) {
      chunks.push(current);
      current = '';
    }
  }

  for (const segment of rawSegments) {
    if (!segment) {
      continue;
    }

    if (segment.length > maxLength && !/^\n+$/.test(segment)) {
      pushCurrent();
      const sentences = segment.split(/(?<=[.!?])\s+/);
      let sentenceChunk = '';

      for (const sentence of sentences) {
        if ((sentenceChunk + sentence).length > maxLength && sentenceChunk) {
          chunks.push(sentenceChunk);
          sentenceChunk = sentence;
        } else {
          sentenceChunk += sentenceChunk ? ` ${sentence}` : sentence;
        }
      }

      if (sentenceChunk) {
        chunks.push(sentenceChunk);
      }
      continue;
    }

    if ((current + segment).length > maxLength && current) {
      pushCurrent();
    }

    current += segment;
  }

  pushCurrent();
  return chunks;
}

function applyOutputReplacements(text) {
  let result = String(text || '');

  result = result
    .replace(/\[LETHAL HITS\]/gi, '[致命命中]')
    .replace(/\[SUSTAINED HITS\s*(\d+)\]/gi, '[连击 $1]')
    .replace(/\[DEVASTATING WOUNDS\]/gi, '[毁灭伤害]')
    .replace(/\[ASSAULT\]/gi, '[突击]')
    .replace(/\[HEAVY\]/gi, '[重型]')
    .replace(/\[LANCE\]/gi, '[突刺]')
    .replace(/\[PRECISION\]/gi, '[精准]')
    .replace(/\[IGNORES COVER\]/gi, '[无视掩体]')
    .replace(/\[TWIN-LINKED\]/gi, '[双联]')
    .replace(/\[RAPID FIRE\s*(\d+)\]/gi, '[速射 $1]')
    .replace(/\[TORRENT\]/gi, '[洪流]')
    .replace(/\[PISTOL\]/gi, '[手枪]')
    .replace(/\[BLAST\]/gi, '[爆炸]')
    .replace(/\[MELTA\s*([^\]]*)\]/gi, (_, value) => `[熔融${value ? ` ${value.trim()}` : ''}]`)
    .replace(/\[INDIRECT FIRE\]/gi, '[间接射击]')
    .replace(/\[HAZARDOUS\]/gi, '[凶险]')
    .replace(/\[EXTRA ATTACKS\]/gi, '[额外攻击]')
    .replace(/\[ONE SHOT\]/gi, '[单发]')
    .replace(/\[ANTI-([A-Z\- ]+?)\s*(\d\+?)\]/g, (_, keyword, value) => {
      const translatedKeyword = keyword
        .trim()
        .replace(/VEHICLE/g, '载具')
        .replace(/MONSTER/g, '怪兽')
        .replace(/PSYKER/g, '灵能者')
        .replace(/CHARACTER/g, '角色')
        .replace(/INFANTRY/g, '步兵')
        .replace(/FLY/g, '飞行')
        .replace(/TITANIC/g, '巨型');
      return `[反${translatedKeyword} ${value}]`;
    });

  for (const [pattern, replacement] of OUTPUT_REPLACEMENTS) {
    result = result.replace(pattern, replacement);
  }

  return result
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function fallbackTranslate(text) {
  let result = String(text || '');

  for (const [english, chinese] of EXACT_TRANSLATIONS.entries()) {
    result = result.split(english).join(chinese);
  }

  for (const [search, replacement] of FALLBACK_REPLACEMENTS) {
    result = result.split(search).join(replacement);
  }

  return applyOutputReplacements(result);
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function requestTranslation(text, attempt = 1) {
  if (translationServiceUnavailable) {
    throw new Error('FALLBACK_ONLY');
  }

  const params = new URLSearchParams({
    q: text,
    langpair: 'en|zh-CN',
  });

  const response = await fetch(`${TRANSLATE_API}?${params.toString()}`, {
    signal: AbortSignal.timeout(20000),
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error(`HTTP 429`);
    }
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();
  const translatedText = decodeHtmlEntities(data?.responseData?.translatedText || '').trim();

  if (!translatedText) {
    throw new Error('Empty translation result');
  }

  if (translatedText.startsWith('MYMEMORY WARNING:')) {
    translationServiceUnavailable = true;
    throw new Error('QUOTA_EXCEEDED');
  }

  return translatedText;
}

async function translateChunk(text) {
  for (let attempt = 1; attempt <= 8; attempt += 1) {
    try {
      return await requestTranslation(text, attempt);
    } catch (error) {
      if (String(error.message).includes('429')) {
        await wait(5000 * attempt);
        continue;
      }

      if (attempt === 8) {
        throw error;
      }

      await wait(3000 * attempt);
    }
  }

  return text;
}

async function translateValue(text, cache) {
  const raw = String(text || '');
  if (!raw) {
    return raw;
  }

  if (EXACT_TRANSLATIONS.has(raw)) {
    return EXACT_TRANSLATIONS.get(raw);
  }

  if (!containsEnglish(raw)) {
    return raw;
  }

  if (cache[raw]) {
    return cache[raw];
  }

  let translated;

  if (!USE_REMOTE_TRANSLATION) {
    translated = fallbackTranslate(raw);
    cache[raw] = translated;
    return translated;
  }

  try {
    const chunks = splitLongText(raw);
    const translatedChunks = [];

    for (const chunk of chunks) {
      translatedChunks.push(await translateChunk(chunk));
    }

    translated = applyOutputReplacements(translatedChunks.join(''));
  } catch {
    translated = fallbackTranslate(raw);
  }

  cache[raw] = translated;
  return translated;
}

function collectUniqueStrings(pack) {
  const values = new Set();
  const add = (value) => {
    if (value) {
      values.add(String(value));
    }
  };

  add(pack.faction);
  add(pack.subfaction);
  add(pack.game_version);
  add(pack.author);

  for (const unit of pack.units || []) {
    add(unit.name);
    for (const keyword of unit.keywords || []) add(keyword);
    for (const ability of unit.abilities || []) {
      add(ability.name);
      add(ability.timing);
      add(ability.summary);
      add(ability.source);
    }
  }

  for (const stratagem of pack.stratagems || []) {
    add(stratagem.name);
    add(stratagem.timing);
    add(stratagem.target);
    add(stratagem.effect);
    add(stratagem.source);
    for (const tag of stratagem.tags || []) add(tag);
  }

  for (const rule of pack.detachment_rules || []) {
    add(rule.name);
    add(rule.timing);
    add(rule.summary);
    add(rule.source);
  }

  for (const enhancement of pack.enhancements || []) {
    add(enhancement.name);
    add(enhancement.timing);
    add(enhancement.summary);
    add(enhancement.source);
  }

  return [...values].sort((left, right) => left.length - right.length);
}

function mapValue(value, translatedMap) {
  if (!value) {
    return value;
  }
  return translatedMap.get(String(value)) || value;
}

async function main() {
  const pack = readJson(SOURCE_PATH);
  const cache = loadCache();
  const uniqueStrings = collectUniqueStrings(pack);
  const translatedMap = new Map();

  for (let index = 0; index < uniqueStrings.length; index += 1) {
    const value = uniqueStrings[index];
    const translated = await translateValue(value, cache);
    translatedMap.set(value, translated);

    if ((index + 1) % 25 === 0 || index === uniqueStrings.length - 1) {
      console.log(`Translated ${index + 1}/${uniqueStrings.length}`);
      saveCache(cache);
    }
  }

  const translated = {
    ...pack,
    $comment: COMMENT_CN,
    id: PACK_ID,
    faction: '星际战士',
    subfaction: '黑色圣堂',
    game_version: '第10版',
    pack_version: PACK_VERSION,
    date: PACK_DATE,
    author: '社区',
    source_note: SOURCE_NOTE_CN,
    units: (pack.units || []).map((unit) => ({
      ...unit,
      name: mapValue(unit.name, translatedMap),
      keywords: (unit.keywords || []).map((keyword) => mapValue(keyword, translatedMap)),
      abilities: (unit.abilities || []).map((ability) => ({
        ...ability,
        name: mapValue(ability.name, translatedMap),
        timing: mapValue(ability.timing, translatedMap),
        summary: mapValue(ability.summary, translatedMap),
        source: mapValue(ability.source, translatedMap),
      })),
    })),
    stratagems: (pack.stratagems || []).map((stratagem) => ({
      ...stratagem,
      name: mapValue(stratagem.name, translatedMap),
      timing: mapValue(stratagem.timing, translatedMap),
      target: mapValue(stratagem.target, translatedMap),
      effect: mapValue(stratagem.effect, translatedMap),
      source: mapValue(stratagem.source, translatedMap),
      tags: (stratagem.tags || []).map((tag) => mapValue(tag, translatedMap)),
    })),
    detachment_rules: (pack.detachment_rules || []).map((rule) => ({
      ...rule,
      name: mapValue(rule.name, translatedMap),
      timing: mapValue(rule.timing, translatedMap),
      summary: mapValue(rule.summary, translatedMap),
      source: mapValue(rule.source, translatedMap),
    })),
    enhancements: (pack.enhancements || []).map((enhancement) => ({
      ...enhancement,
      name: mapValue(enhancement.name, translatedMap),
      timing: mapValue(enhancement.timing, translatedMap),
      summary: mapValue(enhancement.summary, translatedMap),
      source: mapValue(enhancement.source, translatedMap),
    })),
  };

  writeJson(OUT_PATH, translated);
  saveCache(cache);

  console.log(`Wrote ${path.relative(ROOT, OUT_PATH)} (${translated.units.length} units, ${translated.stratagems.length} stratagems)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});