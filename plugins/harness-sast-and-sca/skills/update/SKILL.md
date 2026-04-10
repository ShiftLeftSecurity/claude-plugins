---
name: update
description: Install or update Harness SAST and SCA engine dependencies (analyzers and dependency tooling). Use when the user asks to update the security tools, install missing dependencies, or check for updates.
---

# Update Harness SAST and SCA dependencies

Use this when the user wants to **install** analysis dependencies (first-time, ~400MB) or **update** them to the latest version.

## What happens

- Nothing installed yet: downloads and installs dependencies, then reports success.
- Installed but an update exists: installs the update and reports success.
- Already up to date: reports the current version.

## Claude Code plugin

If the user is using the **Harness SAST and SCA** plugin with Claude Code, run the bundled update script and show the output:

```bash
node "${CLAUDE_PLUGIN_ROOT}/handlers/update-handler.js"
```

If **`CLAUDE_PLUGIN_ROOT`** is not set, use the plugin directory the user actually loaded with **`claude --plugin-dir`**, for example:

```bash
node "/path/to/plugin/handlers/update-handler.js"
```

Some installs use a default under **`$HOME/.claude/plugins/`**; only use that if it matches how the user installed the plugin.

## Cursor / VS Code

If the user is **not** using the Claude plugin (only Cursor or VS Code), they typically install or update via the **Curness / Harness SAST** extension or the project **`install.sh`**. Point them there instead of running **`update-handler.js`**, which ships with the Claude plugin.

## If the command fails

Suggest starting a new session so install hooks can run, or running **`install.sh`** from the Curness / Harness SAST project if they are setting up from source.
