import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {format} from 'date-fns'
 
function WeatherComponent({ location }) {
  const [forecastData, setForecastData] = useState([]);
  //You can use your API key here.
  const apiKey = '24a17e628895411fa22144401241301';

  useEffect(() => {
    
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4`);

        //API response has a 'forecast' property with an array of daily forecasts
        const { forecast } = response.data;
        setForecastData(forecast.forecastday);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    
    fetchWeatherData();
  }, [location]);

  return (
    <div>
      <h2 className='text-xl mt-10 font-bold text-center'>4 Day Forecast</h2>
      <div className='flex flex-row gap-5 justify-center w-full'>
        {forecastData.map((day, index) => (

            <div key={index} className='mx-5 my-10 h-40 w-40 bg-green-200 rounded-[20px] border-2 border-black'>
                <h1 className='text-lg mt-2 font-bold text-center'>{format(day.date,'EEEE')}</h1>
                <p className='text-sm m-1 font-normal text-center'>{index===0?'Today':<br/>}</p>
                <p className='text-sm font-normal text-center'>{format(day.date, "MMMM do yyyy")}</p>
                <h1 className='text-lg m-1 font-bold text-center'>{day.day.avgtemp_c}° C</h1>
                <p className='text-sm font-normal text-center'>{day.day.condition.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherComponent;
