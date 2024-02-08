import './index.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';

const Weather = () => {
  const [welcome, setWelcome] = useState(false);
  const [inputDetails, setInputDetails] = useState({
    name: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [nameError, setNameError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    const welcomeTimeout = setTimeout(() => {
      setWelcome(true);
    }, 1000);

  }, []);

  const onClickClose = () => {
    setWelcome(false);
  };

  const handleInputChange = (e) => {
    setInputDetails({
      ...inputDetails,
      [e.target.name]: e.target.value,
    });
  };

  const validateInputs = () => {
    let isValid = true;

    if (!inputDetails.name) {
      setNameError('Name cannot be empty');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!inputDetails.location) {
      setLocationError('Location cannot be empty');
      isValid = false;
    } else {
      setLocationError('');
    }

    return isValid;
  };

  const onClickClear = (e) =>{
    setInputDetails({
      name:'',
      location:''
    })
  }

  const fetchWeatherData = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=7e28689534c24ce3b32172221240702&q=${inputDetails.location}&aqi=yes`
      );
      const data = response.data;
      const updatedData = {
        airQuality: {
          co: data.current.air_quality.co,
          no2: data.current.air_quality.no2,
          o3: data.current.air_quality.o3,
          pm25: data.current.air_quality.pm2_5,
          pm10: data.current.air_quality.pm10,
          so2: data.current.air_quality.so2,
          usEpaIndex: data.current.air_quality.us_epa_index
        },
        conditionText: data.current.condition.text,
        conditionImage: data.current.condition.icon,
        feelsLikeC: data.current.feelslike_c,
        feelsLikeF: data.current.feelslike_f,
        gustKph: data.current.gust_kph,
        gustMph: data.current.gust_mph,
        humidity: data.current.humidity,
        isDay: data.current.is_day,
        lastUpdated: data.current.last_updated,
        precipIn: data.current.precip_in,
        precipMm: data.current.precip_mm,
        pressureIn: data.current.pressure_in,
        pressureMb: data.current.pressure_mb,
        tempC: data.current.temp_c,
        tempF: data.current.temp_f,
        uv: data.current.uv,
        visKm: data.current.vis_km,
        visMiles: data.current.vis_miles,
        windDegree: data.current.wind_degree,
        windDirection: data.current.wind_dir,
        windKph: data.current.wind_kph,
        windMph: data.current.wind_mph,
        location: {
          country: data.location.country,
          latitude: data.location.lat,
          longitude: data.location.lon,
          localTime: data.location.localtime,
          locationName: data.location.name,
          region: data.location.region,
          timeZone: data.location.tz_id,
        }
      };
      // setIsDay(data.current.is_day === 0)
      setIsDay(true)
      console.log(updatedData)

      setWeatherData(updatedData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <div className='home-img'>
        <img src="/cloudy.png" alt="weather" />
      </div>
      <form onSubmit={fetchWeatherData}>
        <h1>Weather Dashboard</h1>
        <p>Know your locations weather</p>
        <div className='input-label'>
          <label htmlFor="name">Your Name:</label>
          <input className='input' type="text" id='name' placeholder='Enter your name' name='name' value={inputDetails.name} onChange={handleInputChange}/>
          {nameError && <p className="error">{nameError}</p>}
        </div>
        <div className='input-label'>
          <label htmlFor="location">Your Location:</label>
          <input className='input' type="text" id='location' placeholder='Enter location' name='location' value={inputDetails.location} onChange={handleInputChange}/>
          {locationError && <p className="error">{locationError}</p>}
        </div>
        <div className='notifcations'>
          <label htmlFor="notification"><strong>Recieve notifications:</strong></label>
          <input type="checkbox" htmlFor='notification'/>
        </div>
        <button type='submit'>Get Weather</button>
        <button type='button' onClick={onClickClear}>Clear</button>
      </form>

      {loading && (
        <div className="loading-spinner">
          <TailSpin color="#00BFFF" height={80} width={80} />
        </div>
      )}

      {weatherData && (
      <div className='result-container'>
          <div className="weather-container">
            <div className="location-container-main">
              <div className="location-container">
                  <img src="/rain.png" alt="location"/>
                <div className="location">
              <h2>Hi, {inputDetails.name}!</h2>
              <p>Location: {weatherData.location.locationName}, {weatherData.location.region}, {weatherData.location.country}</p>
              <p>Local Time: {weatherData.location.localTime}</p>
              </div>
              
            </div>
            <div className="condition">
                <img src={weatherData.conditionImage} alt="Weather condition icon" />
                <p className='stron'><strong>{weatherData.conditionText}</strong></p>
              </div>
            </div>
            
            
            <div className="weather-details">
              <div className="temperature-container">
                <img src="/hot.png" alt="temperature" />
                <div className="temperature">
                <h3>Temperature</h3>
                <p>{weatherData.tempC}°C / {weatherData.tempF}°F</p>
                <p>Feels like: {weatherData.feelsLikeC}°C / {weatherData.feelsLikeF}°F</p>
              </div>
              </div>
              
              <div className="air-quality-container">
                <img src="/air-quality.png" alt="air quality" />
                <div className="air-quality">
                <h3>Air Quality</h3>
                <p>CO: {weatherData.airQuality.co}</p>
                <p>NO2: {weatherData.airQuality.no2}</p>
                <p>O3: {weatherData.airQuality.o3}</p>
                <p>PM2.5: {weatherData.airQuality.pm25}</p>
                <p>PM10: {weatherData.airQuality.pm10}</p>
                <p>SO2: {weatherData.airQuality.so2}</p>
                <p>US EPA Index: {weatherData.airQuality.usEpaIndex}</p>
              </div>
              </div>
              <div className="other-container">
                <img src="/humidity.png" alt="humidity" />
<div className="other-details">
                <h3>Other Details</h3>
                <p>Humidity: {weatherData.humidity}%</p>
                <p>Pressure: {weatherData.pressureMb} mb / {weatherData.pressureIn} in</p>
                <p>Precipitation: {weatherData.precipMm} mm / {weatherData.precipIn} in</p>
                <p>Visibility: {weatherData.visKm} km / {weatherData.visMiles} miles</p>
                <p>UV Index: {weatherData.uv}</p>
              </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {welcome && (
        <div className="welcome">
          <h2>Weather Dashboard</h2>
          <p>Thank you for using our Weather Dashboard.</p>
          <button className="close-btn" onClick={onClickClose}>x</button>
        </div>
      )}
    </div>
  );
};

export default Weather;
