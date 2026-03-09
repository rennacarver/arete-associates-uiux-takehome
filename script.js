const locations = {
  'Falls Church (VA)': { latitude: 38.8823, longitude: -77.1711 },
  'Healdsburg (CA)': { latitude: 38.6136, longitude: -122.8747 },
  'Huntsville (AL)': { latitude: 34.7304, longitude: -86.5861 },
  'Niceville (FL)': { latitude: 30.531, longitude: -86.4941 },
  'Niwot (CO)': { latitude: 40.103, longitude: -105.1714 },
  'Northridge (CA)': { latitude: 34.2381, longitude: -118.5301 },
  'Tucson (AZ)': { latitude: 32.2226, longitude: -110.9747 },
}

document.getElementById('retrieveForecast').addEventListener('click', () => {
  // Use NOAA API (https://api.weather.gov/) to retrieve forecast information
  // from the National Weather Service

  // Use the locations latitude/longitude and the "points" API endpoint
  // to find the gridId, gridX, and gridY values
  // https://api.weather.gov/points/38.8823,-77.1711

  // Next, use the grid points/{gridId}/{gridX},{gridY}/forecast endpoint
  // to retrieve the 7-day forecast for the specified location
  // https://api.weather.gov/gridpoints/LWX/92,70/forecast

  // With the retrieved forecast information, pull out the date, temperature,
  // and probability of precipitation for the next 3 days

  // Return a formatted 3 Day Forecast

  document.getElementById('forecastInfo').textContent = '3 Day Forecast'
})

async function getPoints(latitude, longitude) {
  const url = `https://api.weather.gov/points/${latitude},${longitude}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Error fetching points data: ${response.statusText}`)
    }
    const data = await response.json()
    return data.properties
  } catch (error) {
    console.error('Failed to get points:', error)
    return null
  }
}

async function getForecast(gridId, gridX, gridY) {
  const url = `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Error fetching forecast: ${response.statusText}`)
    }
    const data = await response.json()
    return data.properties.periods
  } catch (error) {
    console.error('Failed to get forecast:', error)
    return []
  }
}
