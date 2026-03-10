// Initialize caches from localStorage or initialize empty
const pointsCache = JSON.parse(localStorage.getItem('pointsCache') || '{}')
const forecastCache = JSON.parse(localStorage.getItem('forecastCache') || '{}')

// --- API Functions ---
async function getPoints(latitude, longitude) {
  const cacheKey = `${latitude},${longitude}`
  if (pointsCache[cacheKey]) {
    console.log('Using cached points data')
    return pointsCache[cacheKey]
  }

  const url = `https://api.weather.gov/points/${latitude},${longitude}`
  const options = {
    headers: {
      'User-Agent': 'AreteWeatherApp/1.0',
      Accept: 'application/geo+json',
    },
  }

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`Error fetching points data: ${response.statusText}`)
    }
    const data = await response.json()
    // Cache the successful response
    // API Stability Assumption: We assume the gridId and gridX/Y for a location never change
    // (since we cache them indefinitely). While rare, NWS grid definitions can change.
    pointsCache[cacheKey] = data.properties
    localStorage.setItem('pointsCache', JSON.stringify(pointsCache))
    return data.properties
  } catch (error) {
    console.error('Failed to get points:', error)
    return null
  }
}

async function getForecast(gridId, gridX, gridY) {
  const cacheKey = `${gridId},${gridX},${gridY}`
  const now = Date.now()

  if (
    forecastCache[cacheKey] &&
    now - forecastCache[cacheKey].timestamp < 3600000
  ) {
    console.log('Using cached forecast data')
    return forecastCache[cacheKey].data
  }

  const url = `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast`
  const options = {
    headers: {
      'User-Agent': 'AreteWeatherApp/1.0',
      Accept: 'application/geo+json',
    },
  }

  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`Error fetching forecast: ${response.statusText}`)
    }
    const data = await response.json()
    forecastCache[cacheKey] = { timestamp: now, data: data.properties.periods }
    localStorage.setItem('forecastCache', JSON.stringify(forecastCache))
    return data.properties.periods
  } catch (error) {
    console.error('Failed to get forecast:', error)
    return null
  }
}

// --- Data ---
const locations = {
  'Falls Church (VA)': { latitude: 38.8823, longitude: -77.1711 },
  'Healdsburg (CA)': { latitude: 38.6136, longitude: -122.8747 },
  'Huntsville (AL)': { latitude: 34.7304, longitude: -86.5861 },
  'Niceville (FL)': { latitude: 30.531, longitude: -86.4941 },
  'Niwot (CO)': { latitude: 40.103, longitude: -105.1714 },
  'Northridge (CA)': { latitude: 34.2381, longitude: -118.5301 },
  'Tucson (AZ)': { latitude: 32.2226, longitude: -110.9747 },
}

// --- App Logic ---
document
  .getElementById('retrieveForecast')
  .addEventListener('click', async () => {
    const forecastElement = document.getElementById('forecastInfo')
    forecastElement.innerHTML = '<p>Loading forecast...</p>'

    const selectedOffice = document.getElementById('officeSelect').value
    const locationKey = Object.keys(locations).find((key) =>
      key.includes(selectedOffice),
    )

    if (!locationKey) {
      console.error(`Location not found for office: ${selectedOffice}`)
      forecastElement.textContent = 'Error: Location not found.'
      return
    }

    const location = locations[locationKey]

    // Use NOAA API (https://api.weather.gov/) to retrieve forecast information
    // from the National Weather Service

    // Use the location's latitude/longitude and the "points" API endpoint
    // to find the gridId, gridX, and gridY values
    // https://api.weather.gov/points/38.8823,-77.1711
    const points = await getPoints(location.latitude, location.longitude)

    if (!points) {
      console.error('Failed to retrieve points data')
      forecastElement.textContent = 'Error: Could not retrieve location data.'
      return
    }

    // Next, use the grid points/{gridId}/{gridX},{gridY}/forecast endpoint
    // to retrieve the 7-day forecast for the specified location
    // https://api.weather.gov/gridpoints/LWX/92,70/forecast
    const forecast = await getForecast(
      points.gridId,
      points.gridX,
      points.gridY,
    )

    if (!forecast) {
      console.error('Failed to retrieve forecast')
      forecastElement.textContent = 'Error: Could not retrieve forecast.'
      return
    }

    console.log(forecast)

    // With the retrieved forecast information, pull out the date, temperature,
    // and probability of precipitation for the next 3 days
    // Weather Structure Assumption: We assume the NWS periods array is always chronological
    // and starts with the current/upcoming period.
    // 3-Day Forecast Assumption: We assume the "3-day view" should include the current day if available.
    // If run at night, NWS returns "Tonight" first (isDaytime=false), so the view effectively starts tomorrow.
    const nextThreeDays = forecast
      .filter((period) => period.isDaytime)
      .slice(0, 3)

    const forecastHTML = nextThreeDays
      .map((day) => {
        const precipitation = day.probabilityOfPrecipitation?.value ?? 0

        // Calculate both F and C
        let tempF, tempC
        // Units Assumption: We assume the NWS always returns Fahrenheit (F).
        // If they ever returned Celsius natively, this logic would flip (treating C as F).
        if (day.temperatureUnit === 'F') {
          tempF = day.temperature
          tempC = Math.round(((tempF - 32) * 5) / 9)
        } else {
          tempC = day.temperature
          tempF = Math.round((tempC * 9) / 5 + 32)
        }

        // Time Zone Assumption: Using toLocaleDateString() uses the user's computer time zone,
        // not the location's time zone. This may show the wrong day for far-away locations.
        const dateString = new Date(day.startTime).toLocaleDateString()

        // Data Completeness Assumption: We assume every forecast period has a temperature and shortForecast.
        // If these are missing, the UI might show undefined.

        return `
          <div class="day-forecast">
            <h3>${day.name}</h3>
            <p><strong>Date:</strong> ${dateString}</p>
            <p><strong>Temp:</strong> ${tempF}°F / ${tempC}°C</p>
            <p><strong>Precipitation:</strong> ${precipitation}%</p>
            <p>${day.shortForecast}</p>
          </div>
        `
      })
      .join('')

    forecastElement.innerHTML = forecastHTML
  })
