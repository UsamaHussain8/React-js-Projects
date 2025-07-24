import { useState, useEffect } from "react";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY

function Weather({ city, lat, long }) {
    const [weatherData, setWeatherData] = useState({
    current: null,
    daily: []
  });

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
                const day_index = new Date(data.current.dt * 1000).getDay();
                const day = getDayName(day_index);

                const processedCurrentWeather = {
                    sunrise: sunriseTime.toLocaleTimeString(),
                    day: day, 
                    temp: temp_celsius, 
                    feels_like_temp: feels_like_temp_celsius, 
                    humidity: data.current.humidity, 
                    wind_speed:data.current.wind_speed, 
                    description: data.current.weather[0].description,
                    icon: data.current.weather[0].icon,
                };
                
                const processedWeatherForecast = data.daily.slice(0, 4).map(day => ({
                    date: new Date(day.dt * 1000).toLocaleDateString(),
                    sunrise: new Date(day.sunrise * 1000).toLocaleTimeString(),
                    forecast_day: getDayName(new Date((day.dt * 1000)).getDay()),
                    temp: Math.round( (day.temp.max - 273.15) * 100.0) / 100.0,
                    feels_like_temp: Math.round((day.feels_like.day - 273.15) * 100.0) / 100.0,
                    humidity: day.humidity,
                    wind_speed: day.wind_speed,
                    description: day.weather[0].description,
                    icon: day.weather[0].icon,
                }));
                console.log(processedWeatherForecast)

                setWeatherData({
                    current: processedCurrentWeather,
                    daily: processedWeatherForecast,
                })
            }
            else {
                console.log(`Sorry...Weather details could not be fetched for ${city}...`)
            }
        })
        .catch((error) => {
            console.log(error) 
        })
    }, [lat, long, city])

    if (!city) return <div> Please enter the name of the city</div>
    if (!weatherData.current) return <div>No weather data available</div>;

    return (
    <>
        <div className="current-weather">
            <h2>Current Weather in {city}</h2>
            <p>Day: {weatherData.current.day}</p>
            <p>Temperature: {weatherData.current.temp}°C</p>
            <p>Feels like: {weatherData.current.feels_like_temp}°C</p>
            <p>Description: {weatherData.current.description}</p>
            <p>Humidity: {weatherData.current.humidity}%</p>
            <p>Wind Speed: {weatherData.current.wind_speed} m/s</p>
            <img 
                src={`https://openweathermap.org/img/wn/${weatherData.current.icon}@2x.png`}
                alt={weatherData.current.description}
            />
        </div>
    </>
  )
}

function getDayName(day_index) {
    let day = '';
    switch(day_index) {
        case 1:
            day = "Monday"; break;
        case 2:
            day = "Tuesday"; break;
        case 3:
            day = "Wednesday"; break;
        case 4:
            day = "Thursday"; break;
        case 5:
            day = "Friday"; break;
        case 6:
            day = "Saturday"; break;
        case 7:
            day = "Sunday"; break;
        default:
            day = "NA"
    }

    return day;
}

export default Weather