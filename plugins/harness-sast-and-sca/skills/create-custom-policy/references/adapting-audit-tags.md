# Adapting audit tags (use case 1)

The `unaudited-data-use` pattern ships **Java SLF4J** `IO audited` lines from the official docs. The `CONCLUSION` and `EMIT` blocks are language-agnostic — adapt **only** the audit-sink tags.

## Quick check

Grep the repo for audit/logging calls (`logging.`, `logger.`, `log.`, `audit`, `print(`). If none exist, say so in the handoff: the policy **validates** but will not match until the app has tagged sinks or you add logging.

## Java / JVM

Keep the bundled lines, or match your logger exactly:

```
IO audited = METHOD -f "org.slf4j.Logger.warn:void(java.lang.String)" { PAR -i 1 "SINK" }
```

Use JVM return + argument types. For Spring controllers, see `IO (http)` in use case 3.

## Python

CPG method names use a **file-path prefix**, not packages:

```
^path/to/module.py^.methodName
```

**Regex while exploring** (tighten after analyze):

```
IO audited = METHOD -f r".*\.(warning|info|warn|error)" { PAR -i 1 "SINK" }
```

For a specific call site in `flask_webgoat/actions.py` → `log_entry`:

```
IO audited = METHOD -f "^flask_webgoat/actions.py^.log_entry" { RET "SINK" }
```

(Exact `fullName` values are best confirmed with analyze — validate only checks syntax.)

## Other stacks

- **Go:** common patterns include `logrus`, `zap` — use regex or match CPG names from a scan.
- **JavaScript:** match framework logging (`console.log`, `winston`, etc.) via regex or exact CPG names.

See [dsl-cheatsheet.md](dsl-cheatsheet.md) for `METHOD -f` / regex syntax.

## Validate vs match

| Step | What it proves |
| --- | --- |
| `sl_policy_validate` | Policy syntax accepted by API |
| `sl analyze` (after push/assign) | Signatures actually hit code in the app |

Wrong signatures validate fine but produce no findings.
