const locations = {
  'Falls Church (VA)': { latitude: 38.8823, longitude: -77.1711 },
  'Healdsburg (CA)': { latitude: 38.6136, longitude: -122.8747 },
  'Huntsville (AL)': { latitude: 34.7304, longitude: -86.5861 },
  'Niceville (FL)': { latitude: 30.531, longitude: -86.4941 },
  'Niwot (CO)': { latitude: 40.103, longitude: -105.1714 },
  'Northridge (CA)': { latitude: 34.2381, longitude: -118.5301 },
  'Tucson (AZ)': { latitude: 32.2226, longitude: -110.9747 },
}

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

    // Use the locations latitude/longitude and the "points" API endpoint
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

    // With the retrieved forecast information, pull out the date, temperature,
    // and probability of precipitation for the next 3 days
    const nextThreeDays = forecast
      .filter((period) => period.isDaytime)
      .slice(0, 3)

    const forecastHTML = nextThreeDays
      .map((day) => {
        const precipitation = day.probabilityOfPrecipitation?.value ?? 0
        return `
          <div class="day-forecast">
            <h3>${day.name}</h3>
            <p><strong>Date:</strong> ${new Date(day.startTime).toLocaleDateString()}</p>
            <p><strong>Temp:</strong> ${day.temperature}°${day.temperatureUnit}</p>
            <p><strong>Precipitation:</strong> ${precipitation}%</p>
            <p>${day.shortForecast}</p>
          </div>
        `
      })
      .join('')

    forecastElement.innerHTML = forecastHTML
    //console.log(points)
  })

async function getPoints(latitude, longitude) {
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
    return data.properties
  } catch (error) {
    console.error('Failed to get points:', error)
    return null
  }
}

async function getForecast(gridId, gridX, gridY) {
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
    return data.properties.periods
  } catch (error) {
    console.error('Failed to get forecast:', error)
    return null
  }
}
