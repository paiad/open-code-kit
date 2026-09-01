# open-code-kit

<p align="center">
  <img src="./assets/opencode-kit-logo.png" width="180" alt="open-code-kit logo">
</p>

<p align="center">
  <strong>Reusable skills and extensions for OpenCode-compatible agents.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/opencode-peek?style=flat-square&color=111111&label=npm" alt="npm">
  <img src="https://img.shields.io/badge/node-%3E%3D22-111111?style=flat-square" alt="Node.js >=22">
  <img src="https://img.shields.io/badge/license-MIT-111111?style=flat-square" alt="MIT license">
</p>

`open-code-kit` is a curated snapshot of reusable agent skills plus the `opencode-peek` plugin. Use the checked-in skill files for this repository; consult the linked upstream before updating a vendored skill.

## Skills

The catalog is the source of truth for provenance and freshness. Each `SKILL.md` defines its triggers, prerequisites, and safety boundaries.

| Area | Skill | What it provides | Source |
| --- | --- | --- | --- |
| Research | [`agent-reach`](./.opencode/skills/agent-reach/SKILL.md) | Routes web, social, video, and GitHub research. | [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) |
| AI news | [`aihot`](./.opencode/skills/aihot/SKILL.md) | Retrieves current Chinese AI news from AI HOT. | [KKKKhazix/Khazix-Skills](https://github.com/KKKKhazix/Khazix-Skills) |
| Location | [`amap-lbs-skill`](./.opencode/skills/amap-lbs-skill/SKILL.md) | Searches places, plans routes, and visualizes map data. | [Skill source](https://github.com/AMap-Web/amap-lbs-skill) · [Amap API docs](https://lbs.amap.com/api/webservice/summary) |
| Design | [`brainstorming`](./.opencode/skills/brainstorming/SKILL.md) | Turns a vague idea into a reviewed design. | [obra/superpowers](https://github.com/obra/superpowers/tree/main/skills/brainstorming) |
| Engineering | [`diagnosing-bugs`](./.opencode/skills/diagnosing-bugs/SKILL.md) | Builds a tight reproduction loop before diagnosing a defect or regression. | [mattpocock/skills](https://github.com/mattpocock/skills/tree/main/skills/engineering/diagnosing-bugs) |
| Engineering | [`grilling`](./.opencode/skills/grilling/SKILL.md) | Resolves a plan, decision, or idea through design-tree rounds. | [mattpocock/skills](https://github.com/mattpocock/skills/tree/main/skills/productivity/grilling) |
| Collaboration | [`lark-skills`](./.opencode/skills/lark-skills) | Feishu/Lark CLI workflows for documents, Drive, tasks, calendar, IM, and more. | [larksuite/cli](https://github.com/larksuite/cli) |
| Creation | [`nuwa-skill`](./.opencode/skills/nuwa-skill/SKILL.md) | Distills a person's or topic's thinking framework into a skill. | [alchaincyf/nuwa-skill](https://github.com/alchaincyf/nuwa-skill) |
| Engineering | [`tdd`](./.opencode/skills/tdd/SKILL.md) | Runs a seam-focused red → green test-development loop. | [mattpocock/skills](https://github.com/mattpocock/skills/tree/main/skills/engineering/tdd) |
| Documentation | [`writing-for-agents`](./.opencode/skills/writing-for-agents/SKILL.md) | Writes skills and agent-facing documents with clear, stable context. | [mattpocock/skills](https://github.com/mattpocock/skills/tree/main/skills/productivity/writing-for-agents) |

<sub>Sources last verified on 2026-08-31. This catalog is a curated snapshot; upstream skills may have changed since then.</sub>

These skills do not auto-update. When importing an upstream change, update the affected `SKILL.md`, its supporting files, this table's link if needed, and the `Checked` date in the same change.

## Use the skills

The canonical collection is `.opencode/skills/`. Copy the skills you need into another project's `.opencode/skills/`; agents that discover `.agents/skills/` can use the matching distribution directory.

```text
open-code-kit/
├── .opencode/skills/  # canonical collection
└── .agents/skills/    # matching distribution
```

After changing a skill, synchronize the distribution:

```bash
tar -C .opencode/skills -cf - . | tar -C .agents/skills -xf -
```

`amap-lbs-skill` needs an Amap Web Service key. Create its local configuration from the supplied template; keep the resulting `.env` and `config.json` uncommitted.

```bash
cp .opencode/skills/amap-lbs-skill/.env.example .opencode/skills/amap-lbs-skill/.env
```

## Plugin: opencode-peek

[`opencode-peek`](./packages/opencode-peek) renders the current OpenCode session as a local HTML transcript with token reporting and model avatars.

```bash
opencode plugin opencode-peek
```

It requires Node.js `>=22` and OpenCode plugin API `>=1.17.14`. Configure the optional `/peek` command, update instructions, privacy notes, and development details in the [package README](./packages/opencode-peek/README.md).

## Development

```bash
npm install
npm run build
npm test
npm run pack:peek -- --dry-run
```

## License

MIT — see [`packages/opencode-peek/LICENSE`](./packages/opencode-peek/LICENSE).
