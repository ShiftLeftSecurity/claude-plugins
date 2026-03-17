---
name: update
description: Check for dependency updates or install dependencies if missing. Use when the user asks to update Harness SAST and SCA, install dependencies, or check for updates.
---

# Harness SAST and SCA Update / Install

Install dependencies (if missing) or check for and apply updates.

## When to use

- User asks to "update Harness SAST and SCA", "update dependencies", "check for updates", or "install dependencies"
- User wants to ensure they have the latest security analysis engine

## What to do

Run the update handler script. It will:

- If dependencies are not installed: download and install them (~400MB), then report success.
- If dependencies are installed and an update is available: download and install the new version, then report success.
- If dependencies are already up to date: report that and the current version.

## Command

Run this command and show the user the output:

```bash
node "${CLAUDE_PLUGIN_ROOT}/handlers/update-handler.js"
```

If `CLAUDE_PLUGIN_ROOT` is not set (e.g. in some environments), use the typical plugin path:

```bash
node "$HOME/.claude/plugins/curness/handlers/update-handler.js"
```

Report the script output to the user. If the command fails, mention that they may need to start a new session so the SessionStart hook can install dependencies, or run the Harness SAST and SCA repo `install.sh`.
