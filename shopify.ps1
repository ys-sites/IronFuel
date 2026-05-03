# Shopify CLI Helper Script
# This script allows you to run Shopify CLI using the portable Node.js environment installed in .shopify-cli-env

$PSScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
$NodePath = Join-Path $PSScriptRoot ".shopify-cli-env\node-v24.15.0-win-x64"

if (-not (Test-Path $NodePath)) {
    Write-Error "Portable Node.js environment not found at $NodePath"
    exit 1
}

# Add Node to Path for this session
$env:Path = "$NodePath;" + $env:Path

# Bypass execution policy for this session to allow running npm/shopify scripts
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force

# Run shopify with passed arguments
& (Join-Path $NodePath "shopify.cmd") @args
