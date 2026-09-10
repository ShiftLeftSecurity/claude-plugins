#!/usr/bin/env bash
# Harness SCA: scan a dependency manifest (same pipeline as extension save).
set -e
if [ -z "$1" ]; then
  echo "Usage: $0 <manifest_path>" >&2
  exit 1
fi
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec node "$DIR/run-sca-manifest.cjs" "$1"
