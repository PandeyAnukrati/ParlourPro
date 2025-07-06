# PowerShell script to fix ES module imports in TypeScript files
$srcPath = "c:/Users/ASUS/OneDrive/Desktop/PARLOUR-PROJECT/backend-parlour-api/src"

# Get all TypeScript files
$tsFiles = Get-ChildItem -Path $srcPath -Recurse -Filter "*.ts"

foreach ($file in $tsFiles) {
    Write-Host "Processing: $($file.FullName)"
    
    # Read file content
    $content = Get-Content $file.FullName -Raw
    
    # Fix relative imports - add .js extension
    $content = $content -replace "from '(\.\./[^']+)';", "from '`$1.js';"
    $content = $content -replace "from '(\./[^']+)';", "from '`$1.js';"
    
    # Write back to file
    Set-Content -Path $file.FullName -Value $content -NoNewline
}

Write-Host "All imports fixed!"