@echo off
setlocal
if "%~1"=="" (
  echo Usage: %~n0 ^<file_path^> >&2
  exit /b 1
)
set "SCRIPT_DIR=%~dp0"
node "%SCRIPT_DIR%skill-ocular-scan.cjs" "%~1"
