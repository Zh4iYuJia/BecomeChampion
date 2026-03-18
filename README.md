# BecomeChampion

战锤40K 规则助手（手机优先、离线可用、零构建前端）。

核心目标：在对局中按阶段快速看到可用规则，勾选已用能力，减少漏开与反复翻书。

## 项目特性

1. 阶段视图：覆盖 10版常用 6 阶段（指挥、移动、射击、冲锋、近战、战斗冲击）。
2. 能力卡片：展示名称、来源、触发时机、摘要、CP、目标。
3. 已用标记：能力可单独标记，支持一键清空。
4. 回合追踪：支持 1-5 回合计数。
5. 建军筛选：可先在“建军阶段”勾选本局实际携带单位，后续阶段仅展示这些单位的能力。
6. 双层筛选：
   1. 按类别筛选（全部、单位能力、战略点、编队规则）。
   2. 按编队筛选（全部、Gladius Task Force、Bastion Task Force等）。
7. 规则包管理：导入、切换、删除、导出备份。
8. 离线能力：IndexedDB + localStorage 存储数据，Service Worker 缓存外壳。

## 适用人群

1. 主要使用手机或平板进行对局辅助的玩家。
2. 希望把编队规则、战略点和强化集中查看的玩家。
3. 需要离线使用（场地信号不稳定）的玩家。

## 快速开始

1. 克隆或下载本仓库。
2. 打开 [index.html](index.html) 即可使用。
3. 进入规则包管理，可手动导入 [sample-rules-pack.json](sample-rules-pack.json)，也可点击“使用样例规则包（黑色圣堂）”一键自动导入。
4. 进入“建军阶段”勾选本局实际携带单位。
5. 返回主页点击阶段按钮开始使用。

说明：
1. 使用 file:// 也能运行主要功能（本地存储可用）。
2. 若希望启用 Service Worker 缓存，建议使用 http://localhost 访问。

## 当前样例与规则包

当前内置样例仍是黑色圣堂主题，样例文件保持不变：

1. [sample-rules-pack.json](sample-rules-pack.json)
2. [sample-pack.js](sample-pack.js)

另外，仓库现在支持把完整规则包生成为独立 JSON 文件，放在 [rulepacks](rulepacks) 目录中，便于手动导入、备份和版本管理。

当前已生成规则包：

1. [rulepacks/SM-BT-rules-pack.json](rulepacks/SM-BT-rules-pack.json)：Black Templars 专属单位 + 通用 SM 合法单位 + 通用分队 + BT 专属分队。
2. [rulepacks/SM-UM-rules-pack.json](rulepacks/SM-UM-rules-pack.json)：Ultramarines 专属单位 + 通用 SM 单位 + 通用分队 + UM 专属分队。

## CSV 生成流程

项目支持从 [10e](10e) CSV 自动生成独立规则包 JSON。样例包仍单独保留，不要求由这些脚本覆盖。

数据目录：

1. [10e](10e)

生成脚本：

1. [tools/generate-bt-pack-from-csv.js](tools/generate-bt-pack-from-csv.js)
2. [tools/generate-um-pack-from-csv.js](tools/generate-um-pack-from-csv.js)

执行命令：

```bash
node .\tools\generate-bt-pack-from-csv.js
node .\tools\generate-um-pack-from-csv.js
```

脚本会输出：

1. [rulepacks/SM-BT-rules-pack.json](rulepacks/SM-BT-rules-pack.json)
2. [rulepacks/SM-UM-rules-pack.json](rulepacks/SM-UM-rules-pack.json)

当前脚本的设计目标：

1. 保留战团专属单位和专属分队。
2. 同时纳入该战团可合法使用的通用 Space Marines 单位与通用分队。
3. 对 CSV 文本做基础清洗和结构化，生成适合本应用阶段提示的 rules pack。

## 项目结构

```text
BecomeChampion/
  app.js
  index.html
  style.css
  sw.js
  manifest.json
  icon.svg
  rulepacks/
    SM-BT-rules-pack.json
    SM-UM-rules-pack.json
  sample-rules-pack.json
  sample-pack.js
  10e/
  tools/
    generate-bt-pack-from-csv.js
    generate-um-pack-from-csv.js
```

关键文件说明：

1. [app.js](app.js)：状态管理、筛选逻辑、渲染与事件处理。
2. [style.css](style.css)：移动端样式与组件外观。
3. [sw.js](sw.js)：离线缓存逻辑。
4. [sample-rules-pack.json](sample-rules-pack.json)：可导入的示例规则包。
5. [sample-pack.js](sample-pack.js)：内置样例数据（供一键导入和下载按钮回退使用）。
6. [rulepacks](rulepacks)：独立生成的规则包目录。
7. [tools/generate-bt-pack-from-csv.js](tools/generate-bt-pack-from-csv.js)：Black Templars 规则包生成器。
8. [tools/generate-um-pack-from-csv.js](tools/generate-um-pack-from-csv.js)：Ultramarines 规则包生成器。

## 规则包格式（简版）

顶层字段：

1. id
2. faction
3. subfaction
4. game_version
5. pack_version
6. date
7. source_note
8. units
9. stratagems
10. detachment_rules
11. enhancements

阶段枚举：

1. command
2. movement
3. shooting
4. charge
5. fight
6. battleshock
7. any

## 开发与维护

常用维护动作：

1. 更新 10e CSV 后，执行对应生成脚本刷新 [rulepacks](rulepacks) 中的独立规则包。
2. 打开页面后在“规则包管理”里导入目标规则包，并验证“建军阶段”筛选与阶段视图行为。
3. 需要发布新规则包时，更新 pack_version 与 source_note。
 4. 如果本次发布修改了 [index.html](index.html)、[app.js](app.js)、[style.css](style.css)、[sample-pack.js](sample-pack.js)、[sample-rules-pack.json](sample-rules-pack.json)、[manifest.json](manifest.json) 或 [icon.svg](icon.svg)，请同时更新 [sw.js](sw.js) 中的 `CACHE_NAME`。当前离线缓存采用固定版本号，未同步 bump 缓存版本时，GitHub Pages 已更新但客户端仍可能继续读取旧缓存。

## 版权与声明

1. 本项目不存储官方 Codex 原文。
2. 规则文本为社区数据的摘要与结构化展示，仅供对局辅助。
3. Warhammer 40,000 相关知识产权归 Games Workshop 所有。

---

# BecomeChampion

Warhammer 40K Rules Assistant (Mobile-first, offline-capable, zero-build frontend).

Core Goal: Quickly view available rules by phase during games, check used abilities, reduce missed opportunities and repeated book-flipping.

## Project Features

1. Phase View: Covers 6 common phases in 10th edition (Command, Movement, Shooting, Charge, Fight, Battleshock).
2. Ability Cards: Display name, source, trigger timing, summary, CP, target.
3. Used Marker: Abilities can be marked individually, support one-click clear.
4. Turn Tracking: Supports 1-5 turn counting.
5. Roster Filtering: In the roster step, select only the units actually brought so later phase views show only their unit abilities.
6. Dual Filtering:
   1. Filter by category (All, Unit Abilities, Stratagems, Detachment Rules).
   2. Filter by detachment (All, Wrathful Procession, Gladius Task Force, Bastion Task Force).
7. Rules Pack Management: Import, switch, delete, export backup.
8. Offline Capability: IndexedDB + localStorage for data storage, Service Worker for shell caching.

## Target Users

1. Players who mainly use mobile or tablet for game assistance.
2. Players who want to view detachment rules, stratagems, and enhancements centrally.
3. Players who need offline use (unstable venue signals).

## Quick Start

1. Clone or download this repository.
2. Open [index.html](index.html) to use.
3. Go to Rules Pack Management, import [sample-rules-pack.json](sample-rules-pack.json) or directly use the built-in Black Templars sample.
4. Go to the roster step and select the units actually brought to the game.
5. Return to home and click phase buttons to start using.

Notes:
1. Using file:// can also run main functions (local storage available).
2. If you want to enable Service Worker caching, recommend using http://localhost access.

## Current Sample And Rules Packs

The built-in sample remains Black Templars themed and is intentionally unchanged:

1. [sample-rules-pack.json](sample-rules-pack.json)
2. [sample-pack.js](sample-pack.js)

In addition, the repository now supports generating standalone rules packs into [rulepacks](rulepacks) for manual import, backup and versioning.

Currently generated packs:

1. [rulepacks/SM-BT-rules-pack.json](rulepacks/SM-BT-rules-pack.json): Black Templars exclusive units + BT-legal generic Space Marines units + generic detachments + BT-exclusive detachments.
2. [rulepacks/SM-UM-rules-pack.json](rulepacks/SM-UM-rules-pack.json): Ultramarines exclusive units + generic Space Marines units + generic detachments + UM-exclusive detachments.

## CSV Generation Process

The project supports generating standalone rules-pack JSON files from [10e](10e) CSV exports. The sample pack remains separate and does not need to be overwritten by these scripts.

Data directory:

1. [10e](10e)

Generation scripts:

1. [tools/generate-bt-pack-from-csv.js](tools/generate-bt-pack-from-csv.js)
2. [tools/generate-um-pack-from-csv.js](tools/generate-um-pack-from-csv.js)

Execution command:

```bash
node .\tools\generate-bt-pack-from-csv.js
node .\tools\generate-um-pack-from-csv.js
```

The scripts will output:

1. [rulepacks/SM-BT-rules-pack.json](rulepacks/SM-BT-rules-pack.json)
2. [rulepacks/SM-UM-rules-pack.json](rulepacks/SM-UM-rules-pack.json)

Current script goals:

1. Keep chapter-exclusive units and exclusive detachments.
2. Include generic Space Marines units and detachments that are legal for that chapter.
3. Clean and normalize CSV text into rules packs suitable for this app’s phase-based prompting flow.

## Project Structure

```text
BecomeChampion/
  app.js
  index.html
  style.css
  sw.js
  manifest.json
  icon.svg
  rulepacks/
    SM-BT-rules-pack.json
    SM-UM-rules-pack.json
  sample-rules-pack.json
  sample-pack.js
  10e/
  tools/
    generate-bt-pack-from-csv.js
    generate-um-pack-from-csv.js
```

Key file descriptions:

1. [app.js](app.js): State management, filtering logic, rendering and event handling.
2. [style.css](style.css): Mobile styles and component appearance.
3. [sw.js](sw.js): Offline caching logic.
4. [sample-rules-pack.json](sample-rules-pack.json): Importable sample rules pack.
5. [sample-pack.js](sample-pack.js): Built-in sample data used by the sample import/download fallback.
6. [rulepacks](rulepacks): Directory for standalone generated rules packs.
7. [tools/generate-bt-pack-from-csv.js](tools/generate-bt-pack-from-csv.js): Black Templars rules-pack generator.
8. [tools/generate-um-pack-from-csv.js](tools/generate-um-pack-from-csv.js): Ultramarines rules-pack generator.

## Rules Pack Format (Simplified)

Top-level fields:

1. id
2. faction
3. subfaction
4. game_version
5. pack_version
6. date
7. source_note
8. units
9. stratagems
10. detachment_rules
11. enhancements

Phase enums:

1. command
2. movement
3. shooting
4. charge
5. fight
6. battleshock
7. any

## Development and Maintenance

Common maintenance actions:

1. After updating 10e CSV, run the relevant generator to refresh the standalone pack in [rulepacks](rulepacks).
2. After opening the page, import the target rules pack in Rules Pack Management and verify roster filtering and phase-view behavior.
3. When releasing a new rules pack, update pack_version and source_note.
 4. If a release changes [index.html](index.html), [app.js](app.js), [style.css](style.css), [sample-pack.js](sample-pack.js), [sample-rules-pack.json](sample-rules-pack.json), [manifest.json](manifest.json), or [icon.svg](icon.svg), also bump `CACHE_NAME` in [sw.js](sw.js). The offline shell currently uses a fixed cache version, so GitHub Pages can be updated while clients continue serving old cached assets unless the cache version changes.

## Copyright and Disclaimer

1. This project does not store official Codex text.
2. Rules text is summary and structured display of community data, for game assistance only.
3. Warhammer 40,000 related intellectual property belongs to Games Workshop.
