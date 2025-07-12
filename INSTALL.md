# StudySphere Installation Guide

This guide will help you set up and run the StudySphere application on your system.

## Prerequisites

1. **Node.js and npm**: Required for the backend server
   - Download from [nodejs.org](https://nodejs.org/) (version 14 or higher recommended)
   - Verify installation with `node -v` and `npm -v`

2. **Modern Web Browser**: Chrome, Firefox, Edge, or Safari
   - Make sure JavaScript is enabled

## Installation Steps

### Windows

1. **Download or Clone the Repository**
   - Extract the ZIP file if downloaded as a ZIP

2. **Install Backend Dependencies**
   - Open Command Prompt as Administrator
   - Navigate to the backend directory:
     ```
     cd path\to\studysphere\backend
     ```
   - Install dependencies:
     ```
     npm install
     ```

3. **Start the Application**
   - Option 1: Use the included batch file (recommended)
     ```
     start-studysphere.bat
     ```
   
   - Option 2: Manual start
     - Start the backend server:
       ```
       cd path\to\studysphere\backend
       node server.js
       ```
     - Open `index.html` in your web browser

### macOS/Linux

1. **Download or Clone the Repository**

2. **Install Backend Dependencies**
   - Open Terminal
   - Navigate to the backend directory:
     ```
     cd path/to/studysphere/backend
     ```
   - Install dependencies:
     ```
     npm install
     ```

3. **Start the Application**
   - Start the backend server:
     ```
     node server.js
     ```
   - Open `index.html` in your web browser:
     ```
     open ../index.html
     ```

## Troubleshooting

### Common Issues

1. **Port 3000 Already in Use**
   - Change the port in `backend/server.js`
   - Update the API_URL in `helpers.js` to match the new port

2. **"npm not recognized" Error**
   - Make sure Node.js is properly installed
   - Try restarting your computer
   - Add Node.js to your PATH if needed

3. **Cannot Connect to Server**
   - Check if the server is running (you should see "Server running on port 3000" in the console)
   - Verify firewall settings
   - The frontend falls back to local storage if the backend is unavailable

4. **Permission Errors**
   - On Windows: Run Command Prompt as Administrator
   - On macOS/Linux: Use `sudo` if needed

## Support

If you encounter any issues not covered here, please:
1. Check the browser console for error messages (F12 or Cmd+Option+I)
2. Look for errors in the terminal where the server is running
3. Contact support at [support@studysphere.example](mailto:support@studysphere.example) 
