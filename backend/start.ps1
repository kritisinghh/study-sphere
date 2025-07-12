# PowerShell script to start the backend server

param(
    [switch]$dev
)

# Check if node_modules exists
if (-not (Test-Path -Path "./node_modules")) {
    Write-Host "Dependencies not installed. Running installation script..."
    ./install.ps1
}

# Start the server
if ($dev) {
    Write-Host "Starting server in development mode with auto-reload..."
    npx nodemon server.js
} else {
    Write-Host "Starting server..."
    node server.js
} 
