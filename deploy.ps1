# Parlour Management System - Deployment Script
# Run this script to prepare your application for deployment

Write-Host "🚀 Preparing Parlour Management System for Deployment..." -ForegroundColor Green

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
}

# Build backend
Write-Host "Building backend..." -ForegroundColor Yellow
Set-Location "backend-parlour-api"
npm install
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Backend build failed!" -ForegroundColor Red
    exit 1
}
Set-Location ".."

# Build frontend
Write-Host "Building frontend..." -ForegroundColor Yellow
Set-Location "frontend-parlour-dashboard"
npm install
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend build failed!" -ForegroundColor Red
    exit 1
}
Set-Location ".."

Write-Host "✅ Both applications built successfully!" -ForegroundColor Green

# Check for environment files
Write-Host "Checking environment configuration..." -ForegroundColor Yellow

if (-not (Test-Path "backend-parlour-api/.env")) {
    Write-Host "⚠️  Backend .env file not found. Please create one based on .env.example" -ForegroundColor Yellow
}

if (-not (Test-Path "frontend-parlour-dashboard/.env.local")) {
    Write-Host "⚠️  Frontend .env.local file not found. Please create one based on .env.example" -ForegroundColor Yellow
}

Write-Host "🎉 Deployment preparation complete!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Push your code to GitHub" -ForegroundColor White
Write-Host "2. Deploy backend on Render" -ForegroundColor White
Write-Host "3. Deploy frontend on Render" -ForegroundColor White
Write-Host "4. Configure environment variables" -ForegroundColor White
Write-Host "5. Test your deployed application" -ForegroundColor White
Write-Host ""
Write-Host "See DEPLOYMENT.md for detailed instructions." -ForegroundColor Cyan