# Policy DSL cheat sheet

Full reference: https://docs.shiftleft.io/sast/core-concepts/policy-language

Use-case recipes live in [SKILL.md](../SKILL.md). Audit-tag adaptation: [adapting-audit-tags.md](adapting-audit-tags.md).

## Common blocks

| Block | Purpose |
| --- | --- |
| `IMPORT io.shiftleft/default` | Standard vulnerability definitions |
| `IMPORT io.shiftleft/defaultdict` | Generic sensitive-data dictionary (omit with `no-dictionary` template) |
| `DATA name = VAR …` | Custom data groups (use case 2) |
| `IO tag = METHOD -f "…" { … }` | Tag methods — audit sinks, HTTP, etc. |
| `CONCLUSION id = FLOW …` | Data-flow rule |
| `WHEN CONCLUSION id => EMIT { … }` | Finding metadata |

## FLOW patterns (by use case)

| Use case | Pattern |
| --- | --- |
| 1 — Unaudited private data | `FLOW DATA (pii OR …) -> IO (NOT audited)` |
| 3 — Controller-scoped | `FLOW IO (http) -> DATA (…) -> IO (NOT audited)` |

## Method signatures

`METHOD -f` must match the language frontend's CPG naming:

| Language | Shape | Example |
| --- | --- | --- |
| Java | `pkg.Class.method:returnType(args)` | `org.slf4j.Logger.warn:void(java.lang.String)` |
| Python | `^file.py^.method` | `^other.py^.func` |
| Any | Regex | `METHOD -f r".*FileInputStream.read:.*"` |

Annotation/type shortcuts (Java):

```
IO http = METHOD -a "org.springframework.web.bind.annotation.RequestMapping" { RET "SINK" }
```

## Validate

`sl_policy_validate` requires `sl auth`. `OK` = syntax accepted; semantic match requires analyze after push/assign.
