@echo off
SETLOCAL
SET "PSScriptRoot=%~dp0"
SET "NodePath=%PSScriptRoot%.shopify-cli-env\node-v24.15.0-win-x64"

IF NOT EXIST "%NodePath%" (
    echo Portable Node.js environment not found at %NodePath%
    exit /b 1
)

SET "PATH=%NodePath%;%PATH%"
"%NodePath%\shopify.cmd" %*
ENDLOCAL
