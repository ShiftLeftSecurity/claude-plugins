---
name: curness
description: Run local Harness SAST on source files, or SCA on dependency manifests. Use when the user asks to scan code, check dependencies or CVEs, or mentions Harness SAST and SCA, Curness, security scanning, Review, Analyze, Qwiet, or ShiftLeft.
---

# Harness SAST and SCA (Curness)

Analysis runs **on the user’s machine**: static analysis for source files, and dependency-manifest scanning using ShiftLeft package metadata. The editor extension can also scan on save; these scripts are for **on-demand** runs from the agent.

---

## Where to run the scripts from

Use the directory that matches how the user installed Curness:

| Situation                                       | Folder containing `run-scan.sh`     | Example                                                              |
| ----------------------------------------------- | ----------------------------------- | -------------------------------------------------------------------- |
| **Cursor** (skill installed with the extension) | `~/.cursor/skills/curness/`         | `bash "$HOME/.cursor/skills/curness/run-scan.sh" /path/to/File.java` |
| **Claude Code** with `--plugin-dir`             | `<that plugin folder>/skills/scan/` | `bash "<plugin>/skills/scan/run-scan.sh" /path/to/File.java`         |

For Claude plugins, **`<plugin>`** is the root you pass to **`claude --plugin-dir`** (it contains `.claude-plugin/`, `hooks/`, `skills/`, etc.). Do not assume a path under `~/.claude/plugins/` unless the user said they installed there.

The same folder holds **`run-sca-manifest.sh`** and **`run-sca-manifest.cjs`**; keep using that folder’s paths for SCA so the `.sh` and `.cjs` stay paired.

---

## Source code scan (`run-scan.sh`)

Findings describe data flow as **SOURCE → FLOW → SINK**.

### Supported file types

- Java: `.java`
- C/C++: `.c`, `.cpp`, `.cc`, `.cxx`, `.h`, `.hpp`
- JavaScript/TypeScript: `.js`, `.jsx`, `.ts`, `.tsx`
- Python: `.py`
- PHP: `.php`

### Before running

- **Java** available (`PATH` or `JAVA_HOME`)
- Curness data under **`~/.shiftleft/`** (local analyzer bundle and scripts; the skill wrapper picks the best available launcher on your machine)

### Run

```bash
bash "<path-to-run-scan.sh>" "<source_file_path>"
```

### Output

Stdout may include logs. The JSON block is between:

- Start: `===FINDINGS_JSON_START===`
- End: `===FINDINGS_JSON_END===`

### What to do with the result

1. If the file’s extension is not supported, say so and skip the scan.
2. Otherwise run the script and parse the JSON between the markers.
3. Summarize findings (title, severity/score, source, flow, sink).

---

## Dependency manifest scan (`run-sca-manifest.sh`)

Scans a manifest (for example `package.json`, `pom.xml`) for vulnerable dependencies using the same approach as the extension’s manifest flow.

### Before running

- Valid ShiftLeft config at **`~/.shiftleft/config.json`** (**`orgId`** and **`accessToken`**)
- Dependency-scan tooling installed under **`~/.shiftleft/`** (same layout the extension uses for manifest scans)
- For **`package.json`**, a lockfile next to it (**`package-lock.json`**, **`yarn.lock`**, or **`pnpm-lock.yaml`**) when required

### Run

```bash
bash "<path-to-run-sca-manifest.sh>" "<manifest_path>"
```

### Output

- JSON between **`===SCA_FINDINGS_JSON_START===`** and **`===SCA_FINDINGS_JSON_END===`**
- Progress lines on stderr: `[SCA] ...`

### What to do with the result

1. Run the script on the manifest path the user cares about.
2. Parse the JSON between the SCA markers (for example dependency vulnerabilities or warnings about a missing lockfile).
3. Summarize for the user.

### If something fails

Misconfigured credentials, missing tooling under `~/.shiftleft/`, or a missing lockfile usually shows up in script output or as warnings inside the JSON. If the script file is not found, the path to the skill folder is wrong—re-check **Where to run the scripts from** above.
