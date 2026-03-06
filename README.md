# Areté Associates UI/UX Take-Home: Office 3-Day Forecast

This exercise is intended to evaluate the candidate's ability to create a basic web application. The task is to create a basic application that displays the **3-day forecast** at various Areté offices using the National Weather Service API (https://api.weather.gov/).

The user selects the office location from a dropdown, then clicks a button to see a 3-day forecast with the date, temperature, and probability of precipitation.

## 🎯 Evaluation Criteria

This implementation is evaluated on:

- **Correctness** – The application functions as-intended and implements a reliable solution.
- **Code Quality** – The application is reliable and maintainable. The solution should be easy to understand using best practices.
- **Aesthetics** – The UI includes basic design elements to improve the user experience.

_Additionally designed to demonstrate staff-level thinking via error handling, caching, modularity, and accessibility._

## ✨ Features

- **Office Selection**: Dropdown menu containing Areté office locations
- **3-Day Forecast**: Precise viewing of date, temperature, and probability of precipitation
- **Smart Caching**: localStorage-based caching (15-30 min) to reduce API calls
- **Intelligent Error Handling**: Graceful degradation with user-friendly error messages and retry mechanisms
- **Responsive Design**: Beautiful layout on mobile, tablet, and desktop
- **Accessibility**: WCAG AA compliant with semantic HTML and keyboard navigation
- **Micro-interactions**: Loading spinners and smooth fade-in animations

## 📋 Project Structure

```
.
├── index.html          # Semantic HTML and accessible dropdown UI
├── style.css           # CSS Grid/Flexbox, variables, animations
├── js/
│   ├── script.js       # Base orchestration, office locations, and API endpoints
│   ├── api.js          # NWS API integration (2-step process)
│   └── utils.js        # Date formatting, unit conversions
├── .copilot            # Project guidelines and architectural notes
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required—this is vanilla JavaScript

### Installation

1. Clone the repository:

```bash
git clone https://github.com/rennacarver/arete-associates-uiux-takehome.git
cd arete-associates-uiux-takehome
```

2. Open in a local development server (required for ES6 modules):

```bash
# Using Python 3
python3 -m http.server 8000

# Or using Node.js/npm
npx http-server

# Or using VS Code
# Right-click index.html → Open with Live Server
```

3. Navigate to `http://localhost:8000` in your browser

## 📖 Usage

1. **Select an Office**: Choose an Areté office location from the dropdown menu.
2. **Fetch Weather**: Click the submit button to request the weather.
3. **View Forecast**: The app processes and displays a precise 3-day forecast highlighting date, temperature, and precipitation.
4. **Cached Data**: Subsequent searches for the same office use cached data if within 15-30 minutes.
5. **Handle Errors**: If the API is unavailable, you'll see a retry button.

## 🔑 Key Technical Decisions

### NWS API: 2-Step Process

The application uses the National Weather Service API correctly:

**Step 1**: Fetch location metadata

```
GET https://api.weather.gov/points/{latitude},{longitude}
```

**Step 2**: Fetch forecast using the provided URL

```
GET {forecast_url_from_step_1}
```

**Important**: The User-Agent header is required:

```javascript
headers: {
  'User-Agent': '(MyWeatherApp, contact@email.com)'
}
```

### State Management

A centralized state object tracks:

- Current location selection
- Loading, error, and success states
- Cached forecast data with timestamps
- Active forecast display

### Caching Strategy

- **localStorage** stores forecast data with timestamps
- **15-30 minute TTL** balances freshness and API rate limits
- Reduces unnecessary API calls for repeated locations

### Error Handling

The app gracefully handles:

- NWS API downtime → "Service Temporarily Unavailable" with retry
- Network errors → Connection error with retry button
- Missing data fields → Proper null checks and default values for properties like `probabilityOfPrecipitation`

## ♿ Accessibility

- **Semantic HTML**: `<main>`, `<section>`, `<label>` elements
- **WCAG AA Compliance**: 4.5:1 color contrast for normal text
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **ARIA Labels**: Proper labels for screen readers
- **Responsive Text**: Font sizes scale appropriately on mobile

## 📱 Responsive Design

| Breakpoint        | Layout                                |
| ----------------- | ------------------------------------- |
| Mobile (320px)    | Single column, cards stack vertically |
| Tablet (768px)    | 2 columns for forecast cards          |
| Desktop (1024px+) | 3 columns for forecast cards          |

## 🛠️ Development

### Code Organization

- **script.js**: Main file handling event listeners, location configurations, and DOM manipulation
- **api.js**: All NWS API calls, caching, error handling
- **utils.js**: Date formatting, temperature conversion, data manipulation

### Linting & Code Style

This project follows modern JavaScript standards:

- ES6 modules
- Consistent naming conventions
- Clear, documented functions
- Error handling in all async operations

### Building for Production

No build step required. The project is ready to deploy:

- Minify CSS/JS for production (optional)
- Ensure User-Agent header is configured
- Test caching behavior on target environments

## 🧪 Testing Checklist

- [ ] Dropdown menu correctly displays all Areté locations
- [ ] Clicking the fetch button requests the correct endpoint
- [ ] Displays parsed 3-day forecast with Date, Temp, and Probability of Precipitation
- [ ] Caching prevents duplicate API calls for recent identical requests
- [ ] Error state displays with retry button
- [ ] Forecast cards display correctly on mobile/tablet/desktop
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] Screen reader reads all content properly
- [ ] Null precipitation values handled (displays "—" or "0%")

## 📚 API Documentation

- [NWS API Docs](https://www.weather.gov/documentation/services-web-api)
- [NWS Points API](https://www.weather.gov/documentation/services-web-api#/default/get_points__point_)
- [NWS Forecast API](https://www.weather.gov/documentation/services-web-api#/default/get_gridpoints_forecast)

## ⚠️ Known Limitations

- **US Only**: NWS API only provides data for the United States
- **Rate Limiting**: NWS API has rate limits; caching helps mitigate this
- **Null Values**: Probability of Precipitation returns `null` when 0% (handled in code)
- **Data Availability**: Some forecast properties may be unavailable for specific times

## 🎓 Learning Resources

### Understanding the NWS API

- Study the `/points` endpoint response structure
- Learn how forecast URLs are constructed
- Understand ISO 8601 timestamp format
- Read about meteorological terms (POI, wind vectors, etc.)

### UI/UX Insights

- Why scientific dashboards prioritize data clarity
- How to design for accessibility from the start
- Responsive design patterns with CSS Grid/Flexbox
- Micro-interactions that guide user attention

## 📝 License

This is a take-home project for Areté Associates. All code is provided as-is for evaluation purposes.

## 🤝 Contributing

This is a submission-based project. For feedback or improvements, please create an issue or pull request.

---

**Built with attention to detail and first principles thinking** ✨
