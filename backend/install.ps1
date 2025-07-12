# PowerShell script to install and set up the backend

# Check if npm is installed
$npmVersion = npm -v
if (-not $?) {
    Write-Host "Error: npm is not installed. Please install Node.js and npm first."
    exit 1
}

Write-Host "Installing dependencies..."
npm install

Write-Host "Creating necessary directories..."
# Create data directory structure if it doesn't exist
if (-not (Test-Path -Path "./data")) {
    New-Item -ItemType Directory -Path "./data" | Out-Null
    Write-Host "Created data directory"
}

if (-not (Test-Path -Path "./data/pdfs")) {
    New-Item -ItemType Directory -Path "./data/pdfs" | Out-Null
    Write-Host "Created data/pdfs directory"
}

Write-Host "Setup complete!"
Write-Host "To start the server, run: npm start"
Write-Host "For development with auto-reload, run: npm run dev" 
