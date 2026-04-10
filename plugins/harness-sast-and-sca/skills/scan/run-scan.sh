#!/bin/bash
# Curness Scan Wrapper - Ensures Java is available

set -e

# Check for file argument
if [ -z "$1" ]; then
  echo "Usage: $0 <file_path>"
  exit 1
fi

FILE_PATH="$1"

# Find and set JAVA_HOME if not already set
if [ -z "$JAVA_HOME" ]; then
  # Try macOS java_home helper
  if command -v /usr/libexec/java_home >/dev/null 2>&1; then
    export JAVA_HOME=$(/usr/libexec/java_home 2>/dev/null)
  # Try common locations
  elif [ -d "/Library/Java/JavaVirtualMachines" ]; then
    LATEST_JDK=$(ls -1 /Library/Java/JavaVirtualMachines | sort -r | head -1)
    export JAVA_HOME="/Library/Java/JavaVirtualMachines/$LATEST_JDK/Contents/Home"
  fi
fi

# Add Java to PATH
if [ -n "$JAVA_HOME" ]; then
  export PATH="$JAVA_HOME/bin:$PATH"
fi

# Verify Java is available
if ! command -v java >/dev/null 2>&1; then
  echo "Error: Java not found. Please install Java or set JAVA_HOME." >&2
  exit 1
fi

# Harness SAST and SCA data lives under ~/.shiftleft (same as sllsp)
OCULAR_DATA_DIR="$HOME/.shiftleft"

if [ ! -d "$OCULAR_DATA_DIR" ]; then
  echo "Error: ShiftLeft data directory not found at $OCULAR_DATA_DIR" >&2
  echo "Please install and activate the Curness extension to download dependencies." >&2
  exit 1
fi

# Prefer native `analyze` launcher when present; else legacy shell + optional analyze.sc
OCULAR_MINI_DIR="$OCULAR_DATA_DIR/ocular-mini"
NATIVE_ANALYZE="$OCULAR_MINI_DIR/analyze/bin/analyze"
OCULAR_SCRIPT="$OCULAR_MINI_DIR/ocular.sh"
ANALYZE_SCRIPT="$OCULAR_DATA_DIR/analyze.sc"

if [ -f "$NATIVE_ANALYZE" ] || [ -x "$NATIVE_ANALYZE" ]; then
  "$NATIVE_ANALYZE" "$FILE_PATH" 2>&1
  exit $?
fi

# Verify legacy launcher exists
if [ ! -f "$OCULAR_SCRIPT" ]; then
  echo "Error: Security analysis engine not found (expected $NATIVE_ANALYZE or $OCULAR_SCRIPT)" >&2
  echo "Please activate the Curness extension to download dependencies." >&2
  exit 1
fi

if [ -f "$ANALYZE_SCRIPT" ]; then
  sh "$OCULAR_SCRIPT" --script "$ANALYZE_SCRIPT" --param fileName="$FILE_PATH" 2>&1
else
  sh "$OCULAR_SCRIPT" --param fileName="$FILE_PATH" 2>&1
fi
