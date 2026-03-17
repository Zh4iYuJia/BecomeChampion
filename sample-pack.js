window.BC_SAMPLE_PACK = {
  "$schema": "https://becomechampion.app/schemas/rules-pack-v1.json",
  "$comment": "BecomeChampion Rules Pack - Black Templars (10th Edition). Generated from 10e CSV data with summarized text for Wrathful Procession, Gladius Task Force, and Bastion Task Force; not official rules text.",
  "id": "bt-multi-detachments-10th-v1.2",
  "faction": "黑圣堂",
  "subfaction": "Wrathful Procession + Gladius Task Force + Bastion Task Force",
  "game_version": "10th Edition",
  "pack_version": "1.2.0",
  "date": "2026-03-17",
  "author": "Community",
  "source_note": "基于 10e CSV 数据（Wahapedia 导出）自动生成。当前默认包含 Wrathful Procession、Gladius Task Force、Bastion Task Force 的编队规则、战略点与强化；单位能力仍保留黑圣堂核心条目。请以官方规则原文为准。",
  "units": [
    {
      "id": "chaplain-grimaldus",
      "name": "Chaplain Grimaldus",
      "keywords": [
        "Character",
        "Infantry",
        "Black Templars"
      ],
      "abilities": [
        {
          "id": "grimaldus-litanies-of-the-devout",
          "name": "Litanies of the Devout",
          "phases": [
            "fight"
          ],
          "timing": "近战阶段 - 该模型领导单位进行近战攻击时",
          "type": "passive",
          "summary": "若该单位由 Chaplain Grimaldus 领导，该单位模型进行近战攻击时可重掷命中骰。",
          "source": "Imperium - Black Templars.cat",
          "priority": 4
        },
        {
          "id": "grimaldus-temple-relics",
          "name": "Temple Relics",
          "phases": [
            "command"
          ],
          "timing": "你的指挥阶段",
          "type": "active",
          "once_per": "turn",
          "summary": "若该单位仍有 Cenobyte Servitor，可在己方指挥阶段选择 1 项 Temple Relics 效果，持续到下个己方指挥阶段：推进与冲锋 +1、单位 Toughness +1，或近战武器 AP 改善 1。",
          "source": "Imperium - Black Templars.cat",
          "priority": 5
        }
      ]
    },
    {
      "id": "high-marshal-helbrecht",
      "name": "High Marshal Helbrecht",
      "keywords": [
        "Character",
        "Infantry",
        "Black Templars"
      ],
      "abilities": [
        {
          "id": "helbrecht-crusade-of-wrath",
          "name": "Crusade of Wrath",
          "phases": [
            "fight"
          ],
          "timing": "近战阶段 - 该模型领导单位时",
          "type": "passive",
          "summary": "该模型领导的单位，其近战武器攻击次数与力量值各加 1。",
          "source": "Imperium - Black Templars.cat",
          "priority": 5
        },
        {
          "id": "helbrecht-high-marshal",
          "name": "High Marshal",
          "phases": [
            "fight"
          ],
          "timing": "近战阶段开始时",
          "type": "active",
          "once_per": "phase",
          "summary": "选择与本单位接战的 1 个敌方单位，掷 1D6，并按本单位模型数量获得加值；结果可对目标造成 D3、3 或 D3+3 点致命伤害。",
          "source": "Imperium - Black Templars.cat",
          "priority": 4
        }
      ]
    },
    {
      "id": "crusader-squad",
      "name": "Crusader Squad",
      "keywords": [
        "Battleline",
        "Infantry",
        "Black Templars"
      ],
      "abilities": [
        {
          "id": "crusader-righteous-zeal",
          "name": "Righteous Zeal",
          "phases": [
            "shooting"
          ],
          "timing": "敌方射击阶段 - 本单位有模型被敌方射击摧毁后",
          "type": "reaction",
          "summary": "本单位可进行一次 Righteous Zeal move：掷 1D6+2 并向最近敌军移动，允许进入接战范围；若本单位 Battle-shocked 或已在接战范围内，则不能触发；每阶段最多 1 次。",
          "source": "Imperium - Black Templars.cat",
          "priority": 5
        }
      ]
    },
    {
      "id": "sword-brethren",
      "name": "Sword Brethren",
      "keywords": [
        "Infantry",
        "Veterans",
        "Black Templars"
      ],
      "abilities": [
        {
          "id": "sword-brethren-exploit-their-cowardice",
          "name": "Exploit Their Cowardice",
          "phases": [
            "movement"
          ],
          "timing": "敌方从本单位接战范围内后撤后",
          "type": "reaction",
          "summary": "若敌方单位从本单位接战范围内 Fall Back，且本单位结束时不再与任何敌军接战，则本单位可立即进行一次 Normal move。",
          "source": "Imperium - Black Templars.cat",
          "priority": 3
        }
      ]
    },
    {
      "id": "emperors-champion",
      "name": "Emperor's Champion",
      "keywords": [
        "Character",
        "Infantry",
        "Black Templars"
      ],
      "abilities": [
        {
          "id": "emperors-champion-armour-of-faith",
          "name": "Armour of Faith",
          "phases": [
            "any"
          ],
          "timing": "每阶段 1 次 - 该模型一次豁免失败后",
          "type": "reaction",
          "once_per": "phase",
          "summary": "将那次攻击的 Damage 特性改为 0。",
          "source": "Imperium - Black Templars.cat",
          "priority": 5
        },
        {
          "id": "emperors-champion-sigismunds-heir",
          "name": "Sigismund's Heir",
          "phases": [
            "charge",
            "fight"
          ],
          "timing": "宣告冲锋时 / 每场战斗 1 次的近战阶段",
          "type": "active",
          "once_per": "battle",
          "summary": "若冲锋目标中有 CHARACTER，本单位冲锋骰 +2。每场战斗一次，若本单位与敌方 CHARACTER 接战，则本模型近战武器在该阶段获得 DEVASTATING WOUNDS。",
          "source": "Imperium - Black Templars.cat",
          "priority": 5
        }
      ]
    },
    {
      "id": "marshal",
      "name": "Marshal",
      "keywords": [
        "Character",
        "Infantry",
        "Black Templars"
      ],
      "abilities": [
        {
          "id": "marshal-vehement-aggression",
          "name": "Vehement Aggression",
          "phases": [
            "fight"
          ],
          "timing": "近战阶段 - 该模型领导单位被选中作战时",
          "type": "active",
          "once_per": "phase",
          "summary": "为本单位进行 Leadership 测试；成功则本阶段近战攻击可重掷全部命中骰，失败则可重掷命中骰 1。",
          "source": "Imperium - Black Templars.cat",
          "priority": 4
        },
        {
          "id": "marshal-prioritised-eradication",
          "name": "Prioritised Eradication",
          "phases": [
            "fight"
          ],
          "timing": "近战阶段 - 本单位模型摧毁敌方单位后",
          "type": "reaction",
          "summary": "若本单位模型的近战攻击摧毁了 1 个或更多敌方单位，掷 1D6，4+ 获得 1CP。",
          "source": "Imperium - Black Templars.cat",
          "priority": 3
        }
      ]
    },
    {
      "id": "castellan",
      "name": "Castellan",
      "keywords": [
        "Character",
        "Infantry",
        "Black Templars"
      ],
      "abilities": [
        {
          "id": "castellan-inspirational-exemplar",
          "name": "Inspirational Exemplar",
          "phases": [
            "fight"
          ],
          "timing": "近战阶段 - 该模型领导单位时",
          "type": "passive",
          "summary": "该模型领导的单位进行近战攻击时，未修正命中骰 5+ 视为 Critical Hit。",
          "source": "Imperium - Black Templars.cat",
          "priority": 4
        },
        {
          "id": "castellan-pious-fervour",
          "name": "Pious Fervour",
          "phases": [
            "fight"
          ],
          "timing": "近战阶段 - 本单位被选中作战时",
          "type": "active",
          "once_per": "phase",
          "summary": "本阶段本模型的 Master-Crafted Power Weapon 攻击次数，按 6 英寸内敌方单位数量增加，最多 +3。",
          "source": "Imperium - Black Templars.cat",
          "priority": 3
        },
        {
          "id": "castellan-remorseless-persecution",
          "name": "Remorseless Persecution",
          "phases": [
            "charge"
          ],
          "timing": "本回合已 Advance 时宣告冲锋",
          "type": "passive",
          "summary": "该模型领导的单位在本回合 Advance 后仍可宣告冲锋。",
          "source": "Imperium - Black Templars.cat",
          "priority": 5
        }
      ]
    },
    {
      "id": "execrator",
      "name": "Execrator",
      "keywords": [
        "Character",
        "Infantry",
        "Black Templars"
      ],
      "abilities": [
        {
          "id": "execrator-condemnatory-annihilation",
          "name": "Condemnatory Annihilation",
          "phases": [
            "fight"
          ],
          "timing": "近战阶段 - 本单位完成作战并摧毁敌军后",
          "type": "reaction",
          "summary": "若本单位本次作战摧毁了 1 个或更多敌方单位，则本模型 6 英寸内的每个敌方单位都必须进行 Battle-shock 测试。",
          "source": "Imperium - Black Templars.cat",
          "priority": 4
        },
        {
          "id": "execrator-vengeful-exhortation",
          "name": "Vengeful Exhortation",
          "phases": [
            "fight"
          ],
          "timing": "近战阶段 - 该模型领导单位有模型被近战摧毁时",
          "type": "reaction",
          "summary": "若本单位模型被近战攻击摧毁且尚未作战，掷 1D6；4+ 则该模型在敌军攻击结算后仍可进行攻击，然后再移除。",
          "source": "Imperium - Black Templars.cat",
          "priority": 4
        }
      ]
    },
    {
      "id": "crusade-ancient",
      "name": "Crusade Ancient",
      "keywords": [
        "Character",
        "Infantry",
        "Black Templars"
      ],
      "abilities": [
        {
          "id": "crusade-ancient-martial-honour",
          "name": "Martial Honour",
          "phases": [
            "fight"
          ],
          "timing": "近战阶段 - 首次以本单位摧毁敌军后",
          "type": "reaction",
          "summary": "本单位首次以近战摧毁敌方单位后，直到战斗结束，只要本单位未 Battle-shocked，本模型 Objective Control +5。",
          "source": "Imperium - Black Templars.cat",
          "priority": 3
        }
      ]
    },
    {
      "id": "terminator-squad",
      "name": "Terminator Squad",
      "keywords": [
        "Infantry",
        "Terminator",
        "Black Templars"
      ],
      "abilities": [
        {
          "id": "terminators-teleport-homer",
          "name": "Teleport Homer",
          "phases": [
            "movement"
          ],
          "timing": "战斗开始时 / 使用 Rapid Ingress 时",
          "type": "active",
          "once_per": "battle",
          "summary": "开战时可放置 1 个 Teleport Homer 标记。每场战斗一次，本单位可被 0CP Rapid Ingress 到该标记 3 英寸内，且需距离敌军 9 英寸外，随后移除标记。",
          "source": "Imperium - Black Templars.cat",
          "priority": 4
        },
        {
          "id": "terminators-judgement-of-the-weak",
          "name": "Judgement of the Weak",
          "phases": [
            "movement",
            "battleshock"
          ],
          "timing": "敌方从本单位接战范围内后撤时",
          "type": "reaction",
          "summary": "与本单位接战的敌方非 Monster、非 Vehicle 单位 Fall Back 时，其全部模型都必须进行 Desperate Escape 测试；若该单位已 Battle-shocked，则这些测试额外受 -1。",
          "source": "Imperium - Black Templars.cat",
          "priority": 4
        }
      ]
    },
    {
      "id": "sternguard-veteran-squad",
      "name": "Sternguard Veteran Squad",
      "keywords": [
        "Infantry",
        "Veterans",
        "Black Templars"
      ],
      "abilities": [
        {
          "id": "sternguard-vitruous-onslaught",
          "name": "Vitruous Onslaught",
          "phases": [
            "shooting",
            "fight"
          ],
          "timing": "本单位攻击最近的合法目标时",
          "type": "passive",
          "summary": "本单位攻击最近的合法目标时，可重掷 1 个伤害骰。",
          "source": "Imperium - Black Templars.cat",
          "priority": 2
        }
      ]
    },
    {
      "id": "gladiator-valiant",
      "name": "Gladiator Valiant",
      "keywords": [
        "Vehicle",
        "Black Templars"
      ],
      "abilities": [
        {
          "id": "gladiator-valiant-rotating-death",
          "name": "Rotating Death",
          "phases": [
            "shooting"
          ],
          "timing": "射击阶段 - twin heavy onslaught gatling cannon 攻击 Infantry 时",
          "type": "passive",
          "summary": "该武器攻击 Infantry 单位时获得 SUSTAINED HITS 2。",
          "source": "Imperium - Black Templars.cat",
          "priority": 3
        },
        {
          "id": "gladiator-valiant-ferocious-assault",
          "name": "Ferocious Assault",
          "phases": [
            "shooting"
          ],
          "timing": "射击阶段 - twin las-talon 攻击最近的 Monster 或 Vehicle 时",
          "type": "passive",
          "summary": "该武器攻击最近的合法 Monster 或 Vehicle 目标时，命中骰 +1。",
          "source": "Imperium - Black Templars.cat",
          "priority": 3
        }
      ]
    },
    {
      "id": "impulsor",
      "name": "Impulsor",
      "keywords": [
        "Transport",
        "Vehicle",
        "Black Templars"
      ],
      "abilities": [
        {
          "id": "impulsor-assault-vehicle",
          "name": "Assault Vehicle",
          "phases": [
            "movement"
          ],
          "timing": "移动阶段 - 该运输载具 Advance 后下车时",
          "type": "passive",
          "summary": "搭乘单位可在该载具 Advance 后下车，但视为已进行 Normal move，且该回合不能宣告冲锋。",
          "source": "Imperium - Black Templars.cat",
          "priority": 4
        },
        {
          "id": "impulsor-orbital-comms-array",
          "name": "Orbital Comms Array [Aura]",
          "phases": [
            "any"
          ],
          "timing": "友军 6 英寸内单位成为 Stratagem 目标时",
          "type": "reaction",
          "summary": "当 6 英寸内友军 Adeptus Astartes 单位成为 Stratagem 目标时，掷 1D6；5+ 获得 1CP。",
          "source": "Imperium - Black Templars.cat",
          "priority": 3
        }
      ]
    },
    {
      "id": "repulsor",
      "name": "Repulsor",
      "keywords": [
        "Transport",
        "Vehicle",
        "Black Templars"
      ],
      "abilities": [
        {
          "id": "repulsor-stabilised-disembarkation",
          "name": "Stabilised Disembarkation",
          "phases": [
            "shooting"
          ],
          "timing": "敌方射击阶段 - 该运输载具成为目标并被射击后",
          "type": "reaction",
          "summary": "若敌方单位完成射击且其中有攻击以该运输载具为目标，则其中搭乘单位可立即下车，需 wholly within 6 英寸且不在敌军接战范围内。",
          "source": "Imperium - Black Templars.cat",
          "priority": 4
        },
        {
          "id": "repulsor-shield-dome",
          "name": "Shield Dome",
          "phases": [
            "any"
          ],
          "timing": "恒常生效",
          "type": "passive",
          "summary": "该模型具有 5+ invulnerable save。",
          "source": "Imperium - Black Templars.cat",
          "priority": 2
        }
      ]
    },
    {
      "id": "land-raider-crusader",
      "name": "Land Raider Crusader",
      "keywords": [
        "Transport",
        "Vehicle",
        "Black Templars"
      ],
      "abilities": [
        {
          "id": "land-raider-assault-ramp",
          "name": "Assault Ramp",
          "phases": [
            "movement",
            "charge"
          ],
          "timing": "该模型 Normal move 后单位下车时",
          "type": "passive",
          "summary": "本回合若单位在该模型进行 Normal move 后下车，该单位仍可宣告冲锋。",
          "source": "Imperium - Black Templars.cat",
          "priority": 5
        },
        {
          "id": "land-raider-legacy-of-jerulas",
          "name": "Legacy of Jerulas",
          "phases": [
            "shooting"
          ],
          "timing": "射击阶段 - 该模型完成射击后",
          "type": "active",
          "once_per": "phase",
          "summary": "选择本次被命中的 1 个敌方单位。直到回合结束，本回合从该运输载具下车的友军模型攻击该目标时，可重掷 1 个命中骰和 1 个伤害骰。",
          "source": "Imperium - Black Templars.cat",
          "priority": 3
        }
      ]
    }
  ],
  "stratagems": [
    {
      "id": "strat-000010677002",
      "name": "CODEX DISCIPLINE",
      "cp_cost": 1,
      "phases": [
        "shooting",
        "fight"
      ],
      "timing": "Either player’s turn - Shooting or Fight phase",
      "target": "见规则原文 TARGET 段落",
      "effect": "WHEN: Your Shooting phase or the Fight phase.\nTARGET: One ADEPTUS ASTARTES unit from your army that has not been selected to shoot or fight this phase.\nEFFECT: Until the end of the phase, each time a model in your unit makes an attack that targets an enemy unit, re-roll a Hit roll of 1. If that target is auspex scanned, re-roll a Wound roll of 1 as well.",
      "source": "Wahapedia CSV / Bastion Task Force",
      "once_per": "phase",
      "priority": 4,
      "tags": [
        "Bastion Task Force – Battle Tactic Stratagem",
        "Bastion Task Force"
      ]
    },
    {
      "id": "strat-000010677004",
      "name": "LIGHT OF VENGEANCE",
      "cp_cost": 1,
      "phases": [
        "shooting",
        "fight"
      ],
      "timing": "Either player’s turn - Shooting or Fight phase",
      "target": "见规则原文 TARGET 段落",
      "effect": "WHEN: Your Shooting phase or the Fight phase.\nTARGET: One ADEPTUS ASTARTES unit from your army that has not been selected to shoot or fight this phase.\nEFFECT: Select the [LETHAL HITS] or [SUSTAINED HITS 1] ability. Until the end of the phase, weapons equipped by models in your unit have that ability while targeting an auspex scanned unit or if the bearer has the Battleline keyword.",
      "source": "Wahapedia CSV / Bastion Task Force",
      "once_per": "phase",
      "priority": 4,
      "tags": [
        "Bastion Task Force – Battle Tactic Stratagem",
        "Bastion Task Force"
      ]
    },
    {
      "id": "strat-000010677007",
      "name": "HERESY UNDONE",
      "cp_cost": 1,
      "phases": [
        "shooting",
        "charge"
      ],
      "timing": "Your turn - Shooting or Charge phase",
      "target": "见规则原文 TARGET 段落",
      "effect": "WHEN: Your Shooting phase or your Charge phase.\nTARGET: One ADEPTUS ASTARTES unit (excluding Battleline units) from your army.\nEFFECT: Until the end of the phase, your unit is eligible to shoot and declare a charge in a turn in which it Advanced or Fell Back. If it does, every target of that charge and every target of those attacks must be an auspex scanned unit.",
      "source": "Wahapedia CSV / Bastion Task Force",
      "once_per": "phase",
      "priority": 4,
      "tags": [
        "Bastion Task Force – Strategic Ploy Stratagem",
        "Bastion Task Force"
      ]
    },
    {
      "id": "strat-000010677003",
      "name": "GUIDED DISRUPTION",
      "cp_cost": 1,
      "phases": [
        "shooting",
        "fight"
      ],
      "timing": "Either player’s turn - Shooting or Fight phase",
      "target": "见规则原文 TARGET 段落",
      "effect": "WHEN: Your Shooting phase or the Fight phase, just after an Adeptus Astartes Battleline unit from your army has finished making its attacks.\nTARGET: That ADEPTUS ASTARTES BATTLELINE unit.\nEFFECT: When an enemy unit is auspex scanned as a result of those attacks this turn, if that enemy unit does not have the MONSTER or VEHICLE keywords, until the start of your next turn, it is pinned. While a unit is pinned, subtract 2 from that unit’s Move characteristic and subtract 2 from Charge rolls made for that unit.",
      "source": "Wahapedia CSV / Bastion Task Force",
      "once_per": "phase",
      "priority": 4,
      "tags": [
        "Bastion Task Force – Strategic Ploy Stratagem",
        "Bastion Task Force"
      ]
    },
    {
      "id": "strat-000010677005",
      "name": "SHOCK BOMBARDMENT",
      "cp_cost": 1,
      "phases": [
        "shooting",
        "fight"
      ],
      "timing": "Either player’s turn - Shooting or Fight phase",
      "target": "见规则原文 TARGET 段落",
      "effect": "WHEN: Your Shooting phase or the Fight phase, just after an Adeptus Astartes Battleline unit from your army finished making its attacks.\nTARGET: That ADEPTUS ASTARTES BATTLELINE unit.\nEFFECT: When an enemy unit is auspex scanned as a result of those attacks this turn, until the start of your next turn, it is suppressed. While a unit is suppressed, each time a model in that unit makes an attack, subtract 1 from the Hit roll.",
      "source": "Wahapedia CSV / Bastion Task Force",
      "once_per": "phase",
      "priority": 4,
      "tags": [
        "Bastion Task Force – Strategic Ploy Stratagem",
        "Bastion Task Force"
      ]
    },
    {
      "id": "strat-000008352006",
      "name": "STORM OF FIRE",
      "cp_cost": 1,
      "phases": [
        "shooting"
      ],
      "timing": "Your turn - Shooting phase",
      "target": "见规则原文 TARGET 段落",
      "effect": "WHEN: Your Shooting phase.\nTARGET: One ADEPTUS ASTARTES unit from your army that has not been selected to shoot this phase.\nEFFECT: Until the end of the phase, ranged weapons equipped by models in your unit have the [IGNORES COVER] ability. If your unit is under the effects of the Devastator Doctrine, until the end of the phase, improve the Armour Penetration characteristic of such weapons by 1 as well.",
      "source": "Wahapedia CSV / Gladius Task Force",
      "once_per": "phase",
      "priority": 4,
      "tags": [
        "Gladius Task Force – Battle Tactic Stratagem",
        "Gladius Task Force"
      ]
    },
    {
      "id": "strat-000008352002",
      "name": "ARMOUR OF CONTEMPT",
      "cp_cost": 1,
      "phases": [
        "shooting",
        "fight"
      ],
      "timing": "Either player’s turn - Shooting or Fight phase",
      "target": "见规则原文 TARGET 段落",
      "effect": "WHEN: Your opponent’s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.\nTARGET: One ADEPTUS ASTARTES unit from your army that was selected as the target of one or more of the attacking unit’s attacks.\nEFFECT: Until the attacking unit has finished making its attacks, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1.",
      "source": "Wahapedia CSV / Gladius Task Force",
      "once_per": "phase",
      "priority": 4,
      "tags": [
        "Gladius Task Force – Battle Tactic Stratagem",
        "Gladius Task Force"
      ]
    },
    {
      "id": "strat-000008352004",
      "name": "HONOUR THE CHAPTER",
      "cp_cost": 1,
      "phases": [
        "fight"
      ],
      "timing": "Either player’s turn - Fight phase",
      "target": "见规则原文 TARGET 段落",
      "effect": "WHEN: Fight phase.\nTARGET: One ADEPTUS ASTARTES unit from your army.\nEFFECT: Until the end of the phase, melee weapons equipped by models in your unit have the [LANCE] ability. If your unit is under the effects of the Assault Doctrine, until the end of the phase, improve the Armour Penetration characteristic of such weapons by 1 as well.",
      "source": "Wahapedia CSV / Gladius Task Force",
      "once_per": "phase",
      "priority": 4,
      "tags": [
        "Gladius Task Force – Battle Tactic Stratagem",
        "Gladius Task Force"
      ]
    },
    {
      "id": "strat-000008352003",
      "name": "ONLY IN DEATH DOES DUTY END",
      "cp_cost": 2,
      "phases": [
        "fight"
      ],
      "timing": "Either player’s turn - Fight phase",
      "target": "见规则原文 TARGET 段落",
      "effect": "WHEN: Fight phase, just after an enemy unit has selected its targets.\nTARGET: One ADEPTUS ASTARTES unit from your army that was selected as the target of one or more of the attacking unit’s attacks.\nEFFECT: Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, do not remove it from play. The destroyed model can fight after the attacking model’s unit has finished making its attacks, and is then removed from play.",
      "source": "Wahapedia CSV / Gladius Task Force",
      "once_per": "phase",
      "priority": 4,
      "tags": [
        "Gladius Task Force – Epic Deed Stratagem",
        "Gladius Task Force"
      ]
    },
    {
      "id": "strat-000008352005",
      "name": "ADAPTIVE STRATEGY",
      "cp_cost": 1,
      "phases": [
        "command"
      ],
      "timing": "Your turn - Command phase",
      "target": "见规则原文 TARGET 段落",
      "effect": "WHEN: Your Command phase.\nTARGET: One ADEPTUS ASTARTES unit from your army.\nEFFECT: Select the Devastator Doctrine, Tactical Doctrine or Assault Doctrine. Until the start of your next Command phase, that Combat Doctrine is active for that unit instead of any other Combat Doctrine that is active for your army, even if you have already selected that doctrine this battle.",
      "source": "Wahapedia CSV / Gladius Task Force",
      "once_per": "phase",
      "priority": 4,
      "tags": [
        "Gladius Task Force – Strategic Ploy Stratagem",
        "Gladius Task Force"
      ]
    },
    {
      "id": "strat-000008352007",
      "name": "SQUAD TACTICS",
      "cp_cost": 1,
      "phases": [
        "movement"
      ],
      "timing": "Opponent’s turn - Movement phase",
      "target": "见规则原文 TARGET 段落",
      "effect": "WHEN: Your opponent’s Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.\nTARGET: One Adeptus Astartes Infantry or Adeptus Astartes Mounted unit from your army that is within 9\" of the enemy unit that just ended that move.\nEFFECT: Your unit can make a Normal move of up to D6\", or a Normal move of up to 6\" instead if it is under the effects of the Tactical Doctrine.\nRESTRICTIONS: You cannot select a unit that is within Engagement Range of one or more enemy units.",
      "source": "Wahapedia CSV / Gladius Task Force",
      "once_per": "phase",
      "priority": 4,
      "tags": [
        "Gladius Task Force – Strategic Ploy Stratagem",
        "Gladius Task Force"
      ]
    },
    {
      "id": "strat-000009844005",
      "name": "BRUTE FERVOUR",
      "cp_cost": 1,
      "phases": [
        "fight"
      ],
      "timing": "Either player’s turn - Fight phase",
      "target": "见规则原文 TARGET 段落",
      "effect": "WHEN: Fight phase.\nTARGET: One ADEPTUS ASTARTES unit from your army that has not been selected to fight this phase.\nEFFECT: Until the end of the phase, each time a model in your unit makes an attack, re-roll a Hit roll of 1 and you can ignore any or all modifiers to the following: that attack’s Weapon Skill characteristic; the Hit roll; the Wound roll.",
      "source": "Wahapedia CSV / Wrathful Procession",
      "once_per": "phase",
      "priority": 4,
      "tags": [
        "Wrathful Procession – Battle Tactic Stratagem",
        "Wrathful Procession"
      ]
    },
    {
      "id": "strat-000009844004",
      "name": "CASTIGATE THE DEMAGOGUES",
      "cp_cost": 1,
      "phases": [
        "fight"
      ],
      "timing": "Either player’s turn - Fight phase",
      "target": "见规则原文 TARGET 段落",
      "effect": "WHEN: Fight phase.\nTARGET: One ADEPTUS ASTARTES unit from your army that has not been selected to fight this phase.\nEFFECT: Until the end of the phase, melee weapons equipped by models in your unit have the [PRECISION] ability.",
      "source": "Wahapedia CSV / Wrathful Procession",
      "once_per": "phase",
      "priority": 4,
      "tags": [
        "Wrathful Procession – Battle Tactic Stratagem",
        "Wrathful Procession"
      ]
    },
    {
      "id": "strat-000009844002",
      "name": "FUELLED BY FAITH",
      "cp_cost": 1,
      "phases": [
        "any"
      ],
      "timing": "Either player’s turn - Any phase",
      "target": "见规则原文 TARGET 段落",
      "effect": "WHEN: Any phase, just after a mortal wound is allocated to an ADEPTUS ASTARTES unit from your army.\nTARGET: That ADEPTUS ASTARTES unit.\nEFFECT: Until the end of the phase, models in your unit have the Feel No Pain 5+ ability against mortal wounds.",
      "source": "Wahapedia CSV / Wrathful Procession",
      "once_per": "phase",
      "priority": 4,
      "tags": [
        "Wrathful Procession – Battle Tactic Stratagem",
        "Wrathful Procession"
      ]
    },
    {
      "id": "strat-000009844003",
      "name": "ARMOUR OF CONTEMPT",
      "cp_cost": 1,
      "phases": [
        "shooting",
        "fight"
      ],
      "timing": "Either player’s turn - Shooting or Fight phase",
      "target": "见规则原文 TARGET 段落",
      "effect": "WHEN: Your opponent’s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.\nTARGET: One ADEPTUS ASTARTES unit from your army that was selected as the target of one or more of the attacking unit’s attacks.\nEFFECT: Until the attacking unit has finished making its attacks, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1.",
      "source": "Wahapedia CSV / Wrathful Procession",
      "once_per": "phase",
      "priority": 4,
      "tags": [
        "Wrathful Procession – Battle Tactic Stratagem",
        "Wrathful Procession"
      ]
    },
    {
      "id": "strat-000009844007",
      "name": "VOICE OF DEVOTION",
      "cp_cost": 1,
      "phases": [
        "command"
      ],
      "timing": "Your turn - Command phase",
      "target": "见规则原文 TARGET 段落",
      "effect": "WHEN: Your Command phase.\nTARGET: One Adeptus Astartes Infantry or Adeptus Astartes Mounted unit from your army.\nEFFECT: Select the Chorus of Relentless Hate, Rite of Perfervid Wrath or Chant of Deathless Devotion Litany. Until the end of the battle round, that Litany is active for your unit instead of any other Litany that is active for your army.",
      "source": "Wahapedia CSV / Wrathful Procession",
      "once_per": "phase",
      "priority": 4,
      "tags": [
        "Wrathful Procession – Strategic Ploy Stratagem",
        "Wrathful Procession"
      ]
    },
    {
      "id": "strat-000009844006",
      "name": "RELENTLESS MOMENTUM",
      "cp_cost": 1,
      "phases": [
        "fight"
      ],
      "timing": "Either player’s turn - Fight phase",
      "target": "见规则原文 TARGET 段落",
      "effect": "WHEN: Fight phase.\nTARGET: One ADEPTUS ASTARTES unit from your army that has not been selected to fight this phase and is within Engagement Range of one or more enemy units.\nEFFECT: Until the end of the phase, when determining which models in your unit are eligible to fight, any models in it that are within 3\" of one or more enemy models are eligible to fight. When resolving those attacks, such models can target one of those enemy units that is within 3\" of them and within Engagement Range of their unit.",
      "source": "Wahapedia CSV / Wrathful Procession",
      "once_per": "phase",
      "priority": 4,
      "tags": [
        "Wrathful Procession – Strategic Ploy Stratagem",
        "Wrathful Procession"
      ]
    }
  ],
  "detachment_rules": [
    {
      "id": "det-combat-doctrines",
      "name": "Combat Doctrines",
      "phases": [
        "any"
      ],
      "timing": "编队规则 - Gladius Task Force",
      "type": "detachment",
      "summary": "At the start of your Command phase, you can select one of the Combat Doctrines listed below. Until the start of your next Command phase, that Combat Doctrine is active and its effects apply to all ADEPTUS ASTARTES units from your army. You can only select each Combat Doctrine once per battle. Devastator Doctrine\nThe Codex Astartes details the strategic value of overwhelming firepower applied to key targets while advancing into position to eliminate threats.\nThis unit is eligible to shoot in a turn in which it Advanced .\nTactical Doctrine\nAs the warring armies close upon one another and vicious fire-fights erupt, the Codex lays out strategies for swiftly seizing the initiative and combining versatility with firepower.\nThis unit is eligible to shoot and declare a charge in a turn in which it Fell Back .\nAssault Doctrine\nThe Codex Astartes leaves no doubt that the killing blow in most engagements must be delivered with a decisive close-quarters strike. It presents plentiful tactical means to achieve this end.\nThis unit is eligible to declare a charge in a turn in which it Advanced .",
      "source": "Wahapedia CSV / Gladius Task Force",
      "priority": 5
    },
    {
      "id": "det-zealous-litanies",
      "name": "Zealous Litanies",
      "phases": [
        "any"
      ],
      "timing": "编队规则 - Wrathful Procession",
      "type": "detachment",
      "summary": "At the start of the battle round, you can select one of the Litanies listed below. If you do, until the end of the battle round, that Litany is active and its effects apply to all Adeptus Astartes Infantry and Adeptus Astartes Mounted units from your army.\nChorus of Relentless Hate\nAdd 2\" to the Move characteristic of models in this unit and add 1 to Advance rolls made for it.\nRite of Perfervid Wrath\nAdd 1 to the Strength characteristic of melee weapons equipped by models in this unit.\nCHANT OF DEATHLESS DEVOTION\nModels in this unit have a 5+ invulnerable save against ranged attacks.\nRESTRICTIONS\nYour army can include Black Templars units, but it cannot include ADEPTUS ASTARTES units drawn from any other Chapter.",
      "source": "Wahapedia CSV / Wrathful Procession",
      "priority": 5
    },
    {
      "id": "det-interlocking-tactics",
      "name": "Interlocking Tactics",
      "phases": [
        "any"
      ],
      "timing": "编队规则 - Bastion Task Force",
      "type": "detachment",
      "summary": "Adeptus Astartes Battleline units from your army:\n- Are eligible to shoot and declare a charge in a turn in which they Advanced or Fell Back.\n- Are eligible to start to perform an Action in a turn in which they Advanced or Fell Back.\nEach time an ADEPTUS ASTARTES BATTLELINE unit from your army is selected to attack, after resolving those attacks, select one enemy unit hit by one or more of those attacks. Until the end of the turn, that enemy unit is auspex scanned. Each time an ADEPTUS ASTARTES model from your army makes an attack that targets an auspex scanned unit, re-roll a Hit roll of 1.",
      "source": "Wahapedia CSV / Bastion Task Force",
      "priority": 5
    }
  ],
  "enhancements": [
    {
      "id": "enh-000010676002",
      "name": "Eye of the Primarch",
      "phases": [
        "any"
      ],
      "timing": "建军阶段 - Bastion Task Force",
      "type": "enhancement",
      "summary": "ADEPTUS ASTARTES model only. Ranged weapons equipped by the bearer and Battleline models in the bearer’s unit have the [PRECISION] ability.\n\n点数: 10",
      "source": "Wahapedia CSV / Bastion Task Force",
      "priority": 3
    },
    {
      "id": "enh-000008353002",
      "name": "Artificer Armour",
      "phases": [
        "any"
      ],
      "timing": "建军阶段 - Gladius Task Force",
      "type": "enhancement",
      "summary": "ADEPTUS ASTARTES model only. The bearer has a Save characteristic of 2+ and the Feel No Pain 5+ ability.\n\n点数: 10",
      "source": "Wahapedia CSV / Gladius Task Force",
      "priority": 3
    },
    {
      "id": "enh-000009843002",
      "name": "Pyrebrand",
      "phases": [
        "any"
      ],
      "timing": "建军阶段 - Wrathful Procession",
      "type": "enhancement",
      "summary": "Black Templars model only. Models in the bearer’s unit have the Stealth ability.\n\n点数: 25",
      "source": "Wahapedia CSV / Wrathful Procession",
      "priority": 3
    },
    {
      "id": "enh-000008353003",
      "name": "The Honour Vehement",
      "phases": [
        "any"
      ],
      "timing": "建军阶段 - Gladius Task Force",
      "type": "enhancement",
      "summary": "ADEPTUS ASTARTES model only. Add 1 to the Attacks and Strength characteristics of the bearer’s melee weapons. While the bearer is under the effects of the Assault Doctrine, add 2 to the Attacks and Strength characteristics of the bearers melee weapons instead.\n\n点数: 15",
      "source": "Wahapedia CSV / Gladius Task Force",
      "priority": 3
    },
    {
      "id": "enh-000010676003",
      "name": "Hero of the Chapter",
      "phases": [
        "any"
      ],
      "timing": "建军阶段 - Bastion Task Force",
      "type": "enhancement",
      "summary": "ADEPTUS ASTARTES model only. While the bearer is leading a unit, the bearer has the Battleline keyword.\n\n点数: 20",
      "source": "Wahapedia CSV / Bastion Task Force",
      "priority": 3
    },
    {
      "id": "enh-000009843003",
      "name": "Sacred Rage",
      "phases": [
        "any"
      ],
      "timing": "建军阶段 - Wrathful Procession",
      "type": "enhancement",
      "summary": "ADEPTUS ASTARTES model only. Once per battle, at the start of the Fight phase, the bearer can use this Enhancement. If it does, until the end of the phase, models in the bearer’s unit have the Fights First ability.\n\n点数: 30",
      "source": "Wahapedia CSV / Wrathful Procession",
      "priority": 3
    },
    {
      "id": "enh-000009843004",
      "name": "Taramond’s Censer",
      "phases": [
        "any"
      ],
      "timing": "建军阶段 - Wrathful Procession",
      "type": "enhancement",
      "summary": "Black Templars model only. At the start of the Fight phase, each enemy unit within Engagement Range of the bearer’s unit must take a Battle-shock test. When doing so, subtract 1 from the result.\n\n点数: 15",
      "source": "Wahapedia CSV / Wrathful Procession",
      "priority": 3
    },
    {
      "id": "enh-000010676004",
      "name": "Blades of Valour",
      "phases": [
        "any"
      ],
      "timing": "建军阶段 - Bastion Task Force",
      "type": "enhancement",
      "summary": "ADEPTUS ASTARTES model only. Improve the Armour Penetration characteristic of melee weapons equipped by the bearer and Battleline models in the bearer’s unit by 1.\n\n点数: 15",
      "source": "Wahapedia CSV / Bastion Task Force",
      "priority": 3
    },
    {
      "id": "enh-000008353004",
      "name": "Adept of the Codex",
      "phases": [
        "any"
      ],
      "timing": "建军阶段 - Gladius Task Force",
      "type": "enhancement",
      "summary": "CAPTAIN model only. At the start of your Command phase, if the bearer is on the battlefield, instead of selecting a Combat Doctrine to be active for your army, you can select the Tactical Doctrine. If you do, until the start of your next Command phase, that Combat Doctrine is active for the bearer’s unit only, even if you have already selected that Combat Doctrine to be active for your army this battle.\n\n点数: 20",
      "source": "Wahapedia CSV / Gladius Task Force",
      "priority": 3
    },
    {
      "id": "enh-000009843005",
      "name": "Benediction of Fury",
      "phases": [
        "any"
      ],
      "timing": "建军阶段 - Wrathful Procession",
      "type": "enhancement",
      "summary": "Chaplain model only. The bearer’s melee weapons have the [DEVASTATING WOUNDS] ability.\n\n点数: 10",
      "source": "Wahapedia CSV / Wrathful Procession",
      "priority": 3
    },
    {
      "id": "enh-000010676005",
      "name": "Bombast Omnivox",
      "phases": [
        "any"
      ],
      "timing": "建军阶段 - Bastion Task Force",
      "type": "enhancement",
      "summary": "ADEPTUS ASTARTES model only. Each time you select the bearer’s unit as the target of a Stratagem, roll one D6, adding 1 if the bearer’s unit has the Battleline keyword: on a 4+, you gain 1CP.\n\n点数: 15",
      "source": "Wahapedia CSV / Bastion Task Force",
      "priority": 3
    },
    {
      "id": "enh-000008353005",
      "name": "Fire Discipline",
      "phases": [
        "any"
      ],
      "timing": "建军阶段 - Gladius Task Force",
      "type": "enhancement",
      "summary": "ADEPTUS ASTARTES model only. While the bearer is leading a unit, ranged weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability. In addition, while the bearer’s unit is under the effects of the Devastator Doctrine, you can reroll Advance rolls made for that unit.\n\n点数: 25",
      "source": "Wahapedia CSV / Gladius Task Force",
      "priority": 3
    }
  ]
};
