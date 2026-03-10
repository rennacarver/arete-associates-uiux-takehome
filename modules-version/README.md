# Areté Office 3-Day Forecast

A single-page web application displaying a 3-day weather forecast for Areté office locations using the National Weather Service (NWS) API.

## How to Run

This version uses ES Modules, which require a local web server to run (browsers cannot load modules directly from the file system due to CORS).

### Using Python (Often pre-installed on macOS/Linux/Windows)

1. Open your terminal or command prompt.
2. Navigate to this directory:
   ```bash
   cd modules-version
   ```
3. Start a simple HTTP server:

   ```bash
   # Python 3 (Most common)
   python3 -m http.server 8000

   # Python 2 (Legacy)
   python -m SimpleHTTPServer 8000
   ```

4. Open your browser and visit `http://localhost:8000`.

### Other Options

- **VS Code:** Install the "Live Server" extension, right-click `index.html`, and select "Open with Live Server".
- **Node.js:** `npx http-server .`

## Technical Details

- **Stack:** 100% Vanilla JavaScript, HTML5, and CSS3.
- **Architecture:** Restricted to the core 3 files (`index.html`, `style.css`, `script.js`), utilizing namespaced objects within `script.js` to enforce separation of concerns (`API`, `UI`, `App`) without triggering local CORS policies.
- **API Integration:** Implements the required two-step NWS API resolution with thorough error handling and fallback UI states.
- **Design:** Mission-critical dashboard aesthetic featuring responsive CSS Grid layouts.
