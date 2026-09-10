#!/usr/bin/env node

import fs from 'fs';
import os from 'os';
import path from 'path';
import { spawnSync } from 'child_process';

const DEFAULT_PACKAGE = 'harness-code-security-mcp';
const DEFAULT_VERSION = 'latest';

function parseArgs(argv) {
  const options = {
    install: false,
    packageName: DEFAULT_PACKAGE,
    version: DEFAULT_VERSION,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--install') {
      options.install = true;
    } else if (arg === '--package') {
      options.packageName = argv[i + 1] || DEFAULT_PACKAGE;
      i += 1;
    } else if (arg === '--version') {
      options.version = argv[i + 1] || DEFAULT_VERSION;
      i += 1;
    } else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    } else {
      fail(`Unknown argument: ${arg}`);
    }
  }
  return options;
}

function fail(message) {
  process.stderr.write(`Error: ${message}\n`);
  process.exit(2);
}

function npmCommand() {
  return process.platform === 'win32' ? 'npm.cmd' : 'npm';
}

function run(command, args, options = {}) {
  return spawnSync(command, args, {
    encoding: 'utf8',
    shell: false,
    stdio: options.stdio || ['ignore', 'pipe', 'pipe'],
  });
}

function printHelp() {
  process.stdout.write(`Usage: node scripts/doctor.mjs [--install] [--package harness-code-security-mcp] [--version latest]

Checks local prerequisites for the Harness SAST and SCA MCP setup.

Options:
  --install          Install the MCP launcher with npm install -g
  --package <name>   npm package name (default: harness-code-security-mcp)
  --version <ver>    npm package version or dist-tag (default: latest)
`);
}

function printCheck(ok, label, detail = '') {
  const status = ok ? 'OK' : 'MISSING';
  process.stdout.write(`${status}: ${label}${detail ? ` - ${detail}` : ''}\n`);
}

function nodeCheck() {
  const major = Number(process.versions.node.split('.')[0]);
  const ok = Number.isInteger(major) && major >= 20;
  printCheck(ok, 'Node.js >=20', process.version);
  return ok;
}

function npmCheck() {
  const result = run(npmCommand(), ['--version']);
  const ok = result.status === 0;
  printCheck(ok, 'npm', ok ? result.stdout.trim() : result.stderr.trim());
  return ok;
}

function slmcpCheck() {
  const result = run('harness-code-security-mcp', ['--version']);
  const ok = result.status === 0;
  printCheck(
    ok,
    'Harness Code Security MCP launcher',
    ok ? result.stdout.trim() : 'run with --install'
  );
  return ok;
}

function installSlmcp(packageName, version) {
  const spec = version === DEFAULT_VERSION ? packageName : `${packageName}@${version}`;
  process.stdout.write(`Installing ${spec} globally with npm...\n`);
  const result = run(npmCommand(), ['install', '-g', spec], { stdio: 'inherit' });
  if (result.status !== 0) {
    fail(`npm install failed for ${spec}`);
  }
}

function shiftLeftHome() {
  return (
    process.env.SL_HOME ||
    process.env.SHIFTLEFT_HOME ||
    path.join(os.homedir(), '.shiftleft')
  );
}

function authCheck() {
  const configPath = path.join(shiftLeftHome(), 'config.json');
  try {
    const raw = fs.readFileSync(configPath, 'utf8');
    const parsed = JSON.parse(raw);
    const ok =
      typeof parsed.orgId === 'string' &&
      parsed.orgId !== '' &&
      typeof parsed.accessToken === 'string' &&
      parsed.accessToken !== '';
    printCheck(ok, 'Qwiet auth config', configPath);
    return ok;
  } catch {
    printCheck(false, 'Qwiet auth config', `${configPath} (run sl auth)`);
    return false;
  }
}

function printSnippets() {
  process.stdout.write(`
MCP config (no env block required — defaults: app.shiftleft.io, ~/.shiftleft):

Claude Code (terminal or Bash inside a session):
  claude mcp add harness-code-security-mcp -- npx -y harness-code-security-mcp

Claude Code (JSON — easier from an agent Bash tool):
  claude mcp add-json harness-code-security-mcp '{"type":"stdio","command":"npx","args":["-y","harness-code-security-mcp"]}'

Cursor / other agents (after npm install -g):
{
  "mcpServers": {
    "harness-code-security-mcp": {
      "command": "harness-code-security-mcp"
    }
  }
}

Optional env overrides: QWIET_API_HOST, SL_HOME, WORKSPACE_FOLDER

Restart required after MCP config:
  Hosts load MCP at startup. After adding or changing config, fully restart the agent:
  - Cursor: quit/reopen or Developer: Reload Window
  - Claude Code: exit and restart the app (new chat alone is usually not enough)
  - Cursor CLI (agent): stop and rerun agent
  Then verify sl_whoami in a new session (/mcp or MCP tool list).
`);
}

const options = parseArgs(process.argv.slice(2));
const nodeOk = nodeCheck();
const npmOk = npmCheck();
let slmcpOk = slmcpCheck();
if (!slmcpOk && options.install) {
  if (!npmOk) {
    fail('npm is required to install harness-code-security-mcp');
  }
  installSlmcp(options.packageName, options.version);
  slmcpOk = slmcpCheck();
}
const authOk = authCheck();
printSnippets();

if (!nodeOk || !npmOk || !slmcpOk || !authOk) {
  process.exitCode = 1;
}
