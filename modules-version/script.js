import { getForecast, getPoints } from './api.js'
import { locations } from './data.js'

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
