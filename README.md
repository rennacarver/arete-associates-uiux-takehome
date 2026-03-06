# Areté Associates UI/UX Take-Home: Weather Dashboard

A **staff-level weather application** that demonstrates systems thinking, robust error handling, and high-caliber UI/UX design. This project fetches real-time weather data from the National Weather Service (NWS) API and presents it in a scientific, accessible dashboard format.

## 🎯 Project Goals

This implementation prioritizes:

- **Technical Excellence**: Proper API integration, caching, error handling
- **UI/UX Quality**: Professional design, accessibility (WCAG AA), responsive layouts
- **Scalability**: Modular architecture that anticipates growth
- **First Principles Thinking**: Understanding of meteorological data and performance optimization

## ✨ Features

- **Real-time Weather Data**: 7-day forecast from the National Weather Service API
- **Smart Caching**: localStorage-based caching (15-30 min) to reduce API calls
- **Intelligent Error Handling**: Graceful degradation with user-friendly error messages and retry mechanisms
- **Responsive Design**: Beautiful layout on mobile, tablet, and desktop
- **Accessibility**: WCAG AA compliant with semantic HTML and keyboard navigation
- **Micro-interactions**: Loading spinners and smooth fade-in animations
- **Data Transformation**: Proper handling of Celsius temperatures, ISO 8601 timestamps, and edge cases

## 📋 Project Structure

```
.
├── index.html          # Semantic HTML with accessible markup
├── style.css           # CSS Grid/Flexbox, variables, animations
├── js/
│   ├── main.js         # UI orchestration and event handlers
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

1. **Enter a Location**: Type a US city name or coordinates in the input field
2. **View Forecast**: The app automatically fetches and displays the 7-day forecast
3. **Cached Data**: Subsequent searches use cached data if within 15-30 minutes
4. **Handle Errors**: If the API is unavailable, you'll see a retry button

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
- Invalid locations → "Location not found" message
- Network errors → Connection error with retry button
- Missing data fields → Proper null checks and default values

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

- **main.js**: DOM manipulation, event listeners, state updates
- **api.js**: All NWS API calls, caching, error handling
- **utils.js**: Date formatting, temperature conversion, timezone handling

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

- [ ] Location search works with city names
- [ ] Caching prevents duplicate API calls
- [ ] Error state displays with retry button
- [ ] Forecast cards display correctly on mobile/tablet/desktop
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] Screen reader reads all content properly
- [ ] Null precipitation values handled (displays "—" or "Unknown")
- [ ] Timezone displays correctly for user's location

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
