---
name: scan
description: Run security analysis on source code files. Use when the user asks to scan, analyze, or check files for security vulnerabilities, or mentions Review, Analyze, Harness SAST and SCA, Qwiet, ShiftLeft, or security scanning.
---

# Harness SAST and SCA Security Analysis

Run security analysis on source code files to detect vulnerabilities and security issues.

## Supported Languages

- Java: `.java`
- C/C++: `.c`, `.cpp`, `.cc`, `.cxx`, `.h`, `.hpp`
- JavaScript/TypeScript: `.js`, `.jsx`, `.ts`, `.tsx`
- Python: `.py`
- Kotlin: `.kt`, `.kts`
- Ruby: `.rb`
- PHP: `.php`
- Swift: `.swift`

## Usage

When the user asks to scan a file or check for security issues:

1. Verify the file has a supported extension
2. Check that the file exists
3. Run the analysis script
4. Extract JSON results from stdout between markers

## Running the Scan

Run the wrapper script (use the path where the Harness SAST and SCA plugin is installed; common locations below):

**If the plugin is installed via Claude Code plugin manager** (e.g. under `~/.claude/plugins/curness/`):

```bash
bash "$HOME/.claude/plugins/curness/skills/scan/run-scan.sh" "<file_path>"
```

**If using `claude --plugin-dir /path/to/curness/claude-plugin`**, use that directory:

```bash
bash "/path/to/curness/claude-plugin/skills/scan/run-scan.sh" "<file_path>"
```

The script uses tools from `$HOME/.shiftleft/` (downloaded on first use by the Harness SAST and SCA extension or when hooks run). If dependencies are missing, prompt the user to run the Harness SAST and SCA install or trigger a file edit so the hook can download it.

**Output:** JSON findings are printed between `===FINDINGS_JSON_START===` and `===FINDINGS_JSON_END===`. Extract and parse that substring.

## Workflow

1. Identify the file to scan (user request or current file)
2. Verify file extension is supported
3. Run the script with the file path
4. Parse JSON from stdout between the markers
5. Present findings with title, score, source, flow, sink, and remediation

## Error Handling

If the script fails or dependencies are not found, suggest the user install Harness SAST and SCA (e.g. run `install.sh` from the Harness SAST and SCA repo or install the extension) so that `~/.shiftleft/ocular-mini/` and `~/.shiftleft/analyze.sc` exist.
