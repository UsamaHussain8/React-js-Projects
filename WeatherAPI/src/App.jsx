import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const GEOLOCATION_API_KEY = import.meta.env.VITE_GEOLOCATION_API_KEY
  const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY

  const [city, setCity] = useState("")
  const [lat, setLat] = useState(null)
  const [long, setLong] = useState(null)

  useEffect(() => {
    if (city.trim() === "") return;
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${GEOLOCATION_API_KEY}`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      if (data.length > 0) {
        const latitude = data[0].lat
        const longitude = data[0].lon
        setLat(latitude)
        setLong(longitude)
        return ({lat: latitude, long: longitude}) 
      }
      else {
        console.log("No results found for the city you entered...")
        setLat(null)
        setLong(null)
      }
    })
    .catch((err) => {
      console.log(err) 
      setLat(null)
      setLong(null)
    })
  }, [city, setCity])

  useEffect(() => {
    if(city.trim() === '')  return;

    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&appid=${WEATHER_API_KEY}`)
    .then((response) =>  {
      console.log(response)
      return response.json()
  })
    .then((data) => {
      if (data) {
        console.log(data)
        const sunriseTime = new Date(data.current.sunrise * 1000)
        const temp_celsius = Math.round((data.current.temp - 273.15) * 100.0) / 100;
        const feels_like_temp_celsius = Math.round((data.current.feels_like - 273.15) * 100.0) / 100;
        console.log({sunrise: sunriseTime.toLocaleTimeString(), temp: temp_celsius, feels_like_temp: feels_like_temp_celsius, 
                    humidity: data.current.humidity, wind_speed:data.current.wind_speed, description: data.current.weather[0].description})
      }
      else {
        console.log(`Sorry...Weather details could not be fetched for ${city}...`)
      }
    })
    .catch((error) => {
      console.log(error) 
    })
    }, [lat, long])

  const handleCityKeyDown = (event) => {
    if(event.key === "Enter") {
      const cityName = event.target.value.trim();
      console.log(cityName)
      setCity(cityName)
    }
  }

  return (
    <>
      <h2 className="text-3xl">Weather Forecast</h2>
      <label htmlFor="city" className="block my-4 text-lg/6 font-medium text-white-900">
        Enter City Name
      </label>
      <input
            id="city"
            name="city"
            type="text"
            placeholder="City"
            className="block min-w-0 grow my-2 py-4 pr-3 pl-1 text-base text-white-900 placeholder:text-gray-400 focus:outline-2 rounded-xl"
            onKeyDown={handleCityKeyDown}
      />

      {/* Debug info - remove this later */}
      <div className="mt-4 text-sm text-red-600">
        <p>Current city: {city}</p>
        <p>Latitude: {lat}</p>
        <p>Longitude: {long}</p>
      </div>
    </>
  )
}

export default App
