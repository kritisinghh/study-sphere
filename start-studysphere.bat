@echo off
echo Starting StudySphere Application...

echo Starting backend server...
start cmd /k "cd backend && node server.js"

echo Opening frontend in browser...
timeout /t 2 >nul
start "" "index.html"

echo StudySphere is now running!
echo Backend API: http://localhost:3000/api
echo Frontend: file:///%cd%/index.html

echo Press any key to shut down the application
pause >nul

echo Shutting down...
taskkill /f /im node.exe >nul 2>&1
echo Application stopped. 
