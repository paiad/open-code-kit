# open-code-kit

<p align="center">
  <img src="./assets/opencode-kit-logo.png" width="180" alt="open-code-kit logo">
</p>

<p align="center">
  <em><strong>A curated skill kit and extension collection for OpenCode-compatible AI agents.</strong></em>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/opencode-peek?style=flat-square&color=111111&label=npm" alt="npm">
  <img src="https://img.shields.io/badge/node-%3E%3D22-111111?style=flat-square" alt="Node.js >=22">
  <img src="https://img.shields.io/badge/OpenCode-%3E%3D1.17.14-111111?style=flat-square" alt="OpenCode >=1.17.14">
  <img src="https://img.shields.io/badge/license-MIT-111111?style=flat-square" alt="MIT license">
</p>

`open-code-kit` is a versioned collection of reusable agent skills plus practical OpenCode extensions. The skill kit covers engineering workflows, research, AI news, location services, persona-skill creation, and Feishu/Lark operations. The repository also ships `opencode-peek`, a plugin that renders a readable HTML transcript of an OpenCode session.

## Skill kit

| Area | Skills | Purpose |
| --- | --- | --- |
| Engineering | `brainstorming`, `grilling`, `tdd`, `diagnosing-bugs` | Shape work, stress-test designs, test changes, and investigate failures. |
| Research | `agent-reach`, `aihot` | Route web research and retrieve current Chinese AI news. |
| Creation | `nuwa-skill` | Distill a person's or topic's thinking framework into a reusable skill. |
| Location | `amap-lbs-skill` | Search POIs, plan routes, and generate map links with Amap. |
| Collaboration | `lark-skills` | Official Feishu/Lark CLI workflows for documents, Drive, tasks, calendar, IM, Base, slides, approvals, and more. |

Each skill documents its own prerequisites, scope, and safety constraints in its `SKILL.md`.

### Distribution layouts

The same skill collection is available in two layouts:

```text
open-code-kit/
├── .opencode/skills/     # Source of truth for OpenCode projects
└── .agents/skills/       # Deep-copy distribution for agents that use .agents/
```

The directories are intentionally identical. Edit `.opencode/skills/` first, then synchronize the deep copy:

```bash
tar -C .opencode/skills -cf - . | tar -C .agents/skills -xf -
```

To consume the kit in another project, copy the entries you need into that project's `.opencode/skills/` directory, or use the `.agents/skills/` layout when the target agent discovers skills from `.agents/`.

### Skill catalog

| Skill | Description |
| --- | --- |
| [`agent-reach`](./.opencode/skills/agent-reach/SKILL.md) | Internet research router for web, social, video, GitHub, and other supported sources. |
| [`aihot`](./.opencode/skills/aihot/SKILL.md) | Current Chinese AI industry news from the public AI HOT API. |
| [`amap-lbs-skill`](./.opencode/skills/amap-lbs-skill/SKILL.md) | Amap POI search, nearby search, route planning, travel planning, and map visualization. |
| [`brainstorming`](./.opencode/skills/brainstorming/SKILL.md) | Turn a vague idea into a validated design before implementation. |
| [`diagnosing-bugs`](./.opencode/skills/diagnosing-bugs/SKILL.md) | Build a tight reproduction loop and identify the root cause of a bug or regression. |
| [`grilling`](./.opencode/skills/grilling/SKILL.md) | Stress-test a plan or design one decision at a time. |
| [`lark-skills`](./.opencode/skills/lark-skills) | Official 27-skill Feishu/Lark CLI suite. |
| [`nuwa-skill`](./.opencode/skills/nuwa-skill/SKILL.md) | Generate a high-fidelity person or topic perspective skill through research and validation. |
| [`tdd`](./.opencode/skills/tdd/SKILL.md) | Apply a red-green-refactor workflow to features, fixes, and refactors. |

### Amap configuration

`amap-lbs-skill` does not contain an API key. To use Amap Web Service APIs, create a local `.env` from the provided template and enter your own key:

```bash
cp .opencode/skills/amap-lbs-skill/.env.example .opencode/skills/amap-lbs-skill/.env
```

Never commit the resulting `.env` or a generated `config.json`.

## Packages

| Package | Description | Install |
| --- | --- | --- |
| [`opencode-peek`](./packages/opencode-peek) | Render the current OpenCode session as a readable HTML transcript with token usage and model avatars. | `opencode plugin opencode-peek` |

## Peek

`opencode-peek` turns the current OpenCode session into a readable, interactive HTML transcript.

<p align="center">
  <img src="https://img.paiad.top/img/peek-session-overview.png" alt="opencode-peek session overview" width="860">
</p>

## Install

### 🤖 Recommended: let your Agent configure it

Send this instruction to your OpenCode Agent:

````text
Install and configure opencode-peek for the current OpenCode project.

1. Run `opencode plugin opencode-peek` from the current project directory.
2. Read `.opencode/opencode.json` and preserve all existing settings, plugins, and commands.
3. Add or update `command.peek` with this template:

```json
{
  "description": "Generate an HTML view of the current OpenCode session",
  "template": "Generate a `peek` HTML transcript for the current session. First call `session_inspect` to generate a fresh snapshot and token report. Then call `peek`. Do not pass `firstNTurns` unless the user explicitly requests the first N turns only. If `session_inspect` fails, briefly state the reason and stop. If `peek` fails, briefly state the reason and stop. On success, reply only with the `markdownLink` returned by `peek`. Do not add explanations or perform other actions."
}
```

4. Validate `.opencode/opencode.json`.
5. Tell me to restart OpenCode after setup.

Do not install the package with npm directly, create a duplicate local plugin, or modify unrelated files.
````

### 🛠️ Manual configuration

Install the plugin for the current project:

```bash
opencode plugin opencode-peek
```

Requirements: Node.js `>=22` and OpenCode `>=1.17.14`.

To install it globally instead, use `opencode plugin -g opencode-peek`.

The plugin and command are configured in `.opencode/opencode.json`:

```json
{
  "plugin": ["opencode-peek"],
  "command": {
    "peek": {
      "description": "Generate an HTML view of the current OpenCode session",
      "template": "Generate a `peek` HTML transcript for the current session. First call `session_inspect` to generate a fresh snapshot and token report. Then call `peek`. Do not pass `firstNTurns` unless the user explicitly requests the first N turns only. If `session_inspect` fails, briefly state the reason and stop. If `peek` fails, briefly state the reason and stop. On success, reply only with the `markdownLink` returned by `peek`. Do not add explanations or perform other actions."
    }
  }
}
```

Restart OpenCode after changing the configuration.

## Usage

Run the command in OpenCode:

```text
/peek
```

The command:

1. Inspects the current session.
2. Generates the session report.
3. Renders the HTML transcript.
4. Writes the latest result to `.workspace/cache/peek/latest.html`.

On success, the command returns a clickable local link: `[🍟 Open Peek report](file:///...)`.

## Features

- Two-column session transcript layout.
- Token usage and cost details.
- Model-specific avatars.
- Stable colors for custom tools based on tool-name hashing.
- Neutral styling for OpenCode built-in tools.
- Session summaries with configurable message truncation.
- Separate session inspection and HTML rendering stages.
- Extensible visual themes.
- Transparent generated HTML background.

## Generated artifacts

Generated files are stored under `.workspace/cache/`:

```text
.workspace/cache/
├── peek/
│   └── latest.html
└── session-inspect/
    ├── latest.json
    └── latest.md
```

These files are local artifacts and should not be committed.

`session_inspect` prepares structured session data. `peek` renders that data into HTML.

## Repository structure

```text
open-code-kit/
├── assets/                         # Root README assets
├── .agents/skills/                 # Deep-copy skill distribution
├── .opencode/
│   ├── .agents/                    # OpenCode project agents
│   ├── skills/                     # Canonical skill collection
│   └── opencode.json               # Project configuration, including /peek
├── packages/
│   └── opencode-peek/
│       ├── src/                    # Plugin source and runtime modules
│       ├── tests/                  # Local package tests (gitignored)
│       ├── scripts/                # Build-time asset preparation
│       ├── dist/                   # Published build output
│       └── README.md               # Package documentation
├── package.json                    # Root workspace configuration
└── README.md                       # This document
```

The root `assets/` directory is used only by this repository README. Package documentation screenshots are hosted remotely and are not bundled into the npm package.

## Development

The repository uses npm workspaces. Each package is independently buildable and publishable.

```bash
npm install
npm run build
npm test
npm run pack:peek -- --dry-run
```

`npm run pack:peek -- --dry-run` verifies the files that will be included in the `opencode-peek` package before publishing.

## Adding a package

1. Create a directory under `packages/`.
2. Add the package to the workspace configuration.
3. Provide a package README and tests.
4. Keep package-specific assets inside the package.
5. Verify the npm tarball before publishing.

## Documentation

- [`opencode-peek` package documentation](./packages/opencode-peek/README.md)

## License

MIT — see [`LICENSE`](./packages/opencode-peek/LICENSE).
