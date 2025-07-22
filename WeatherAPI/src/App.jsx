import { useEffect, useState } from 'react'
import './App.css'
import Weather from './components/Weather.jsx'

const GEOLOCATION_API_KEY = import.meta.env.VITE_GEOLOCATION_API_KEY

function App() {
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
        Enter your City
      </label>
      <input
            id="city"
            name="city"
            type="text"
            placeholder="City"
            className="block min-w-0 grow my-2 py-4 pr-3 pl-1 text-base text-white-900 placeholder:text-gray-400 focus:outline-2 rounded-xl"
            onKeyDown={handleCityKeyDown}
        />

      <Weather city={city}
               lat={lat}
               long={long}
      />
    </>
  )
}

export default App
