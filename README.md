# Areté Associates: Office Weather Dashboard

This project is a clean, dependency-free web application that displays a precise 3-day weather forecast for Areté Associates' office locations. It is built entirely with modern, raw JavaScript, HTML, and CSS.

## 🎯 Design Philosophy & Approach

Based on Areté's focus on national security, data visualization, and mission management, this dashboard is designed to be:

- **Precise & Analytical:** Clean, high-contrast UI that displays data clearly, fitting a mission-critical tool aesthetic.
- **Robust:** Graceful error handling for network failures or National Weather Service (NWS) API rate limits.
- **Maintainable:** Uses ES6 modules to separate the API layer, the UI rendering, and the main application logic, demonstrating Staff-Level architectural thinking without over-engineering.

## 🚀 Key Features

- **Two-Step API Resolution:** Correctly queries the NWS `/points` endpoint to resolve grid coordinates before requesting localized forecast data.
- **Intelligent Data Parsing:** Filters the NWS 7-day (14-period) response down to a clean, readable 3-day projection showing high temperatures, dates, and precipitation probabilities.
- **Accessible UI:** Built with semantic HTML, CSS Grid for responsive card layouts, and clear loading/error state feedback for the user.

## 🛠 Project Structure

- **`index.html`**: The static, semantic layout.
- **`style.css`**: Vanilla CSS using custom variables and a modern, technical aesthetic.
- **`script.js`**: Application entry point; handles DOM bindings and coordinates data flow.
- **`api.js`**: Encapsulates all `fetch` logic, NWS header requirements, and error throwing.
- **`ui.js`**: Contains functions to dynamically generate and inject HTML nodes based on the API data.

## 💻 How to Run

Because this project utilizes native ES6 JavaScript modules (`type="module"`), it must be served over `http://` or `https://` (not via the `file://` protocol) to avoid CORS/Module security policies in modern browsers.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rennacarver/arete-associates-uiux-takehome.git
   cd arete-associates-uiux-takehome
   ```

2. **Serve the directory:**
   Using Python 3 (comes with macOS/Linux):

   ```bash
   python3 -m http.server 8000
   ```

   _Alternatively, if you use VS Code, you can use the "Live Server" extension._

3. **View the app:**
   Open your browser and navigate to `http://localhost:8000`
