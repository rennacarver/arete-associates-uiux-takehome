// Initialize caches from localStorage or initialize empty
const pointsCache = JSON.parse(localStorage.getItem('pointsCache') || '{}')
const forecastCache = JSON.parse(localStorage.getItem('forecastCache') || '{}')

export async function getPoints(latitude, longitude) {
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

export async function getForecast(gridId, gridX, gridY) {
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
