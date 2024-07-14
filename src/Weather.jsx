import React, { useState, useEffect } from 'react';
import './Weather.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [inputLocation, setInputLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = "65b163b2ac57b1e1458c621ce87a70ca";

  const fetchWeatherData = async (loc) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}&units=metric`);
      if (!response.ok) {
        throw new Error('Location not found');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchWeatherData(location);
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocation(inputLocation);
  };

  return (
    <div className="weather-container">
      <form onSubmit={handleSubmit} className="weather-form">
        <input
          type="text"
          value={inputLocation}
          onChange={(e) => setInputLocation(e.target.value)}
          placeholder="Enter location"
          className="weather-input"
        />
        <button type="submit" className="weather-button">Get Weather</button>
      </form>
      {loading && <div className="loader"></div>}
      {error && <p className="error">Error: {error}</p>}
      {weatherData && !loading && !error && (
        <div className="weather-data">
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
            className="weather-icon"
          />
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};


export default Weather;