import sunny from './assets/sunny.jpg';
import snow from './assets/snow2.jpg';
import Descriptions from './components/Descriptions';
import { useEffect, useState } from 'react';
import {getWeatherData} from './WeatherService';

function App() {
  const [city, setCity] = useState('paris');
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('metric');
  const [bg, setBg] = useState(sunny)

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getWeatherData(city, units);
      setWeather(data);
      const thresholdUnits = units === 'metric' ? 20 : 60;
      if(data.temp <= thresholdUnits)
      setBg(snow);
      else setBg(sunny);
    };
    fetchWeatherData();
  }, [units, city]);

  const getCurrentUnitSymbol = () => units === "metric" ? "C" : "F" 

  const handleUnitsClick = (e) => {
    const isCelsius = getCurrentUnitSymbol() === 'C';
    setUnits(isCelsius ? 'imperial' : 'metric');
  };

  const enterKeyPressed = (e) => {
    if(e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  }

  return (
    <div className="app" 
    style={{backgroundImage:`url(${bg})`}}>
      <div className='overlay'>
        {
          weather && (
            <div className='container'>
            <div className='section section__inputs'>
              <input onKeyDown={enterKeyPressed} type='text' name='city' 
              placeholder='Enter City...' />
              <button id="test" onClick={(e) => handleUnitsClick(e)}>
                <span>&deg;</span> { units === "metric" ? "F" : "C" }
              </button>
            </div>
  
            <div className='section section__temperature'>
              <div className='icon'>
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} 
                alt='weatherIcon' />
                <h3>{weather.description}</h3>
              </div>
              <div className='temperature'>
                <h1>{`${weather.temp.toFixed()} `} &deg;<span>{`${units === 'metric' ? 'C' : 'F'}`}</span></h1>
              </div>
            </div>
  
            <Descriptions weather={weather} units={units}/>
          </div>
          )
        }
       
      </div>
    </div>
  );
}

export default App;
