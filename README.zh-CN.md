# open-code-kit

<p align="center">
  <img src="./assets/opencode-kit-logo.png" width="180" alt="open-code-kit logo">
</p>

<p align="center">
  <strong>面向 OpenCode 兼容 Agent 的可复用 skill 与扩展集合。</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/opencode-peek?style=flat-square&color=111111&label=npm" alt="npm">
  <img src="https://img.shields.io/badge/node-%3E%3D22-111111?style=flat-square" alt="Node.js >=22">
  <img src="https://img.shields.io/badge/license-MIT-111111?style=flat-square" alt="MIT license">
</p>

`open-code-kit` 收录经过筛选的可复用 Agent skill 快照，以及 `opencode-peek` 插件。本仓库以已提交的 skill 文件为准；更新收录 skill 前，请先核对表中的上游来源。

## Skill

下表是来源与时效的唯一记录。每个 `SKILL.md` 定义该 skill 的触发条件、前置条件和安全边界。

| 分类 | Skill | 能力 | 来源 |
| --- | --- | --- | --- |
| 调研 | [`agent-reach`](./.opencode/skills/agent-reach/SKILL.md) | 路由网页、社交媒体、视频和 GitHub 调研。 | [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) |
| AI 资讯 | [`aihot`](./.opencode/skills/aihot/SKILL.md) | 从 AI HOT 获取最新中文 AI 资讯。 | [KKKKhazix/Khazix-Skills](https://github.com/KKKKhazix/Khazix-Skills) |
| 位置服务 | [`amap-lbs-skill`](./.opencode/skills/amap-lbs-skill/SKILL.md) | POI 搜索、路线规划和地图数据可视化。 | [Skill 源码](https://github.com/AMap-Web/amap-lbs-skill) · [高德 API 文档](https://lbs.amap.com/api/webservice/summary) |
| 设计 | [`brainstorming`](./.opencode/skills/brainstorming/SKILL.md) | 将模糊想法收敛为可审阅的设计。 | [obra/superpowers](https://github.com/obra/superpowers/tree/main/skills/brainstorming) |
| 工程 | [`diagnosing-bugs`](./.opencode/skills/diagnosing-bugs/SKILL.md) | 先构建紧密复现环，再定位缺陷或回归。 | [mattpocock/skills](https://github.com/mattpocock/skills/tree/main/skills/engineering/diagnosing-bugs) |
| 工程 | [`grilling`](./.opencode/skills/grilling/SKILL.md) | 通过设计树分轮收敛计划、决策或想法。 | [mattpocock/skills](https://github.com/mattpocock/skills/tree/main/skills/productivity/grilling) |
| 协作 | [`lark-skills`](./.opencode/skills/lark-skills) | 飞书/Lark CLI 工作流：文档、云盘、任务、日历、IM 等。 | [larksuite/cli](https://github.com/larksuite/cli) |
| 创作 | [`nuwa-skill`](./.opencode/skills/nuwa-skill/SKILL.md) | 将人物或主题的思维框架提炼为 skill。 | [alchaincyf/nuwa-skill](https://github.com/alchaincyf/nuwa-skill) |
| 工程 | [`tdd`](./.opencode/skills/tdd/SKILL.md) | 以 seam 为中心运行 red → green 测试开发循环。 | [mattpocock/skills](https://github.com/mattpocock/skills/tree/main/skills/engineering/tdd) |
| 文档 | [`writing-for-agents`](./.opencode/skills/writing-for-agents/SKILL.md) | 为 skill 和 Agent 文档建立清晰、稳定的上下文。 | [mattpocock/skills](https://github.com/mattpocock/skills/tree/main/skills/productivity/writing-for-agents) |

<sub>来源最近核验于 2026-08-31。此清单是经过筛选的快照；上游 skill 此后可能已更新。</sub>

这些 skill 不会自动同步上游。导入上游更新时，应在同一提交中更新相关 `SKILL.md`、支持文件、此表中的来源链接（如有变化）和核验日期。

## 使用 skill

`.opencode/skills/` 是规范集合。将所需 skill 复制到其他项目的 `.opencode/skills/`；若目标 Agent 从 `.agents/skills/` 发现 skill，则使用对应的分发目录。

```text
open-code-kit/
├── .opencode/skills/  # 规范集合
└── .agents/skills/    # 对应的分发目录
```

修改 skill 后，同步分发目录：

```bash
tar -C .opencode/skills -cf - . | tar -C .agents/skills -xf -
```

`amap-lbs-skill` 需要高德 Web Service Key。使用随附模板创建本地配置，生成的 `.env` 和 `config.json` 不应提交。

```bash
cp .opencode/skills/amap-lbs-skill/.env.example .opencode/skills/amap-lbs-skill/.env
```

## 插件：opencode-peek

[`opencode-peek`](./packages/opencode-peek) 将当前 OpenCode 会话渲染成带 Token 报告和模型头像的本地 HTML transcript。

```bash
opencode plugin opencode-peek
```

它需要 Node.js `>=22` 和 OpenCode plugin API `>=1.17.14`。可选 `/peek` command 的配置、更新步骤、隐私说明和开发细节请查看[插件 README](./packages/opencode-peek/README.zh-CN.md)。

## 开发

```bash
npm install
npm run build
npm test
npm run pack:peek -- --dry-run
```

## 许可证

MIT，详见 [`packages/opencode-peek/LICENSE`](./packages/opencode-peek/LICENSE)。
