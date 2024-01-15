import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherComponent from './WeatherComponent';

function App() {
  // State variables
  const [locations, setLocations] = useState([]);
  const [forecastCity, setForecastCity] = useState(null);
  const [isForecastActive, setForecastActive] = useState(false);
  const [cityButtons, setCityButtons] = useState([]);

  // Event handler for city buttons
  const handleCityButtons = (event) => {
    const updatedCityButtons = [...cityButtons, event.target.value];
    setCityButtons(updatedCityButtons);
    sessionStorage.setItem('myItems', JSON.stringify(updatedCityButtons));
  };

  // Event handler for selecting a city for forecast
  const handleForecast = (location) => {
    setForecastActive(true);
    setForecastCity(location);
  };

  // Fetch locations from the backend on component mount
  useEffect(() => {
    //Check if user have session records.
    const storedCityButtons = sessionStorage.getItem('myItems');
    setCityButtons(storedCityButtons ? JSON.parse(storedCityButtons) : []);

    // Fetch all locations from the backend.
    axios.get('http://localhost:4000/locations')
      .then(response => setLocations(response.data))
      .catch(error => console.error('Error fetching locations:', error));
  }, []);

  return (
    <div className='w-full text-center'>
      <h1 className='text-xl text-black font-bold flex justify-center items-center h-20 w-full mb-10 bg-slate-200 border-b-2 border-t-2 border-black'>Weather Forecast</h1>

      {cityButtons.map((iterator, index) => (
        <button key={index} onClick={() => handleForecast(iterator)} className={`h-10 w-40 ${forecastCity === iterator ? 'bg-emerald-600' : 'bg-slate-200'} border-2 border-black mx-5 my-2 rounded-lg`}>{iterator}</button>
      ))}

      <div className="relative inline-block">
        <button
          className='h-10 w-40 bg-slate-200 text-center border-2 border-black mx-5 my-2 rounded-lg outline-none appearance-none cursor-pointer'
        >
          Add More +
        </button>
        <select
          className='absolute top-5 left-5 h-10 w-40 opacity-0 cursor-pointer'
          onChange={handleCityButtons}
        >
          <option value='Add More +' disabled hidden>Add More +</option>
          {locations.map(location => (
            <option key={location.name} value={location.name}>{location.name}</option>
          ))}
        </select>
      </div>
      
      {/* Render weather cards when a city is selected */}
      {isForecastActive && (
        <WeatherComponent location={forecastCity} />
      )}
    </div>
  );
}

export default App;
