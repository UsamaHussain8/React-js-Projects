import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

  const [city, setCity] = useState("")
  const [lat, setLat] = useState(null)
  const [long, setLong] = useState(null)

  useEffect(() => {
    if (city.trim() === "") return;

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      if (data.length > 0) {
        setLat(data[0].lat)
        setLong(data[0].lon)
        console.log({lat: lat, long: long})
        return ({lat: lat, long: long}) 
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

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,weathercode`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        console.log({temp: data.current.temp, feels_like_temp: data.current.feels_like, humidity: data.current.humidity, wind_speed:data.current.wind_speed})
        return ({lat: lat, long: long}) 
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

  // function getCityCoordinates() {
  //   fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)
  //   .then((response) => {
  //     return response.json()
  //   })
  //   .then((data) => {
  //     setLat(data.lat)
  //     setLong(data.long)
  //     return ({lat: data.lat, long: data.long}) 
  //   })
  // }

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
