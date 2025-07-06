# PowerShell script to fix double .js.js extensions
$srcPath = "c:/Users/ASUS/OneDrive/Desktop/PARLOUR-PROJECT/backend-parlour-api/src"

# Get all TypeScript files
$tsFiles = Get-ChildItem -Path $srcPath -Recurse -Filter "*.ts"

foreach ($file in $tsFiles) {
    Write-Host "Processing: $($file.FullName)"
    
    # Read file content
    $content = Get-Content $file.FullName -Raw
    
    # Fix double extensions
    $content = $content -replace "\.js\.js'", ".js'"
    
    # Write back to file
    Set-Content -Path $file.FullName -Value $content -NoNewline
}

Write-Host "Double extensions fixed!"