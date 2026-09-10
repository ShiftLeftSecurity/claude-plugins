@echo off
setlocal
if "%~1"=="" (
  echo Usage: %~n0 ^<manifest_path^> >&2
  exit /b 1
)
set "SCRIPT_DIR=%~dp0"
node "%SCRIPT_DIR%run-sca-manifest.cjs" "%~1"
