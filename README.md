# Areté Office 3-Day Forecast

A single-page web application displaying a 3-day weather forecast for Areté office locations using the National Weather Service (NWS) API.

## How to Run
Simply open `index.html` in any web browser. No build steps, dependencies, or local servers are required.

## Technical Details
- **Stack:** 100% Vanilla JavaScript, HTML5, and SS3.
- **Architecture:** Restricted to the core 3 files (`index.html`, `style.css`, `script.js`), utilizing namespaced objects within `script.js` to enforce separation of concerns (`API`, `UI`, `App`) without triggering local CORS policies.
- **API Integration:** Implements the required two-step NWS API resolution with thorough error handling and fallback UI states.
- **Design:** Mission-critical dashboard aesthetic featuring responsive CSS Grid layouts.
