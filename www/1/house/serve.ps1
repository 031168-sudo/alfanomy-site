#Requires -Version 5
$ErrorActionPreference = 'Stop'

$port = 8020
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$adb  = Join-Path $env:LOCALAPPDATA 'Android\Sdk\platform-tools\adb.exe'

if (-not (Test-Path $adb)) {
  $adb = 'adb'
}

Write-Host '== Устройства adb (должен быть виден Meta Quest 3) ==' -ForegroundColor Cyan
& $adb devices

Write-Host "`n== Проброс порта $port на шлем (adb reverse) ==" -ForegroundColor Cyan
& $adb reverse "tcp:$port" "tcp:$port"

Write-Host ''
Write-Host "Откройте в браузере Meta Quest 3:  http://localhost:$port/" -ForegroundColor Green
Write-Host 'Нажмите ENTER VR. Останов сервера - Ctrl+C.' -ForegroundColor Green
Write-Host ''

python -m http.server $port --directory $root
