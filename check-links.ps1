$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$htmlFiles = Get-ChildItem -Path $root -Filter *.html -File
$broken = @()

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    $matches = [regex]::Matches($content, '(?:href|src)\s*=\s*"([^"]+)"')

    foreach ($m in $matches) {
        $target = $m.Groups[1].Value.Trim()

        if (
            [string]::IsNullOrWhiteSpace($target) -or
            $target.StartsWith("#") -or
            $target.StartsWith("http://") -or
            $target.StartsWith("https://") -or
            $target.StartsWith("tel:") -or
            $target.StartsWith("mailto:") -or
            $target.StartsWith("javascript:") -or
            $target.StartsWith("//")
        ) {
            continue
        }

        $cleanTarget = $target.Split("?")[0].Split("#")[0]
        $resolved = Join-Path $file.DirectoryName $cleanTarget

        if (-not (Test-Path -Path $resolved)) {
            $broken += [PSCustomObject]@{
                File = $file.Name
                Link = $target
            }
        }
    }
}

if ($broken.Count -gt 0) {
    Write-Host "Broken local links found:" -ForegroundColor Red
    $broken | ForEach-Object { Write-Host "- $($_.File): $($_.Link)" -ForegroundColor Yellow }
    exit 1
}

Write-Host "All local links are valid." -ForegroundColor Green
exit 0
