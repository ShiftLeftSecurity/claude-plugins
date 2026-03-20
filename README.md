# Claude Code Plugins Directory

Harness SAST and SCA plugins for Claude Code.

## Quick Start

Add this marketplace to Claude Code:

```
/plugin marketplace add https://github.com/ShiftLeftSecurity/claude-plugins
/reload-plugins
```

> [!TIP]
> Take advantage of new features and fixes by typing `/plugin`, select **Marketplaces**, and then `harness-sast-and-sca-plugins`. Select *Enable auto-update*.

Install the Harness SAST and SCA plugin:

```
/plugin install harness-sast-and-sca
/reload-plugins
```

## Available Plugins

- `harness-sast-and-sca`: Automatic security analysis on file edit and save. Analyzes code for vulnerabilities (including dataflow analysis!) and reports findings back so Claude can fix them.

## Documentation

See the official documentation on the Harness SAST and SCA [documentation website](https://docs.shiftleft.io/sast/secure-ai-coding-ai-assisted-development).
