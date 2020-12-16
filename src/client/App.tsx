import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import "./app.css";

export type Weather = {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  dt: number;
  name: string;
};

export default function App() {
  const [result, setResult] = useState<Weather>();
  const [isFahrenheit, setIsFahrenheit] = useState(false)

  const onSearch = (query: string) => {
    fetch("/api/weather?q=" + encodeURIComponent(query))
      .then((res) => res.json())
      .then((data) => setResult(data));
  };

  const onSwitchUnit = () => {
    setIsFahrenheit(!isFahrenheit);
  };

  useEffect(() => onSearch("San Francisco, CA, USA"), []);

  return (
    <div className="container">
      <h1>Assemble Weather App</h1>

      <SearchBar onSearch={onSearch} />

      <button onClick={onSwitchUnit} className="switch-unit-button">{`Switch to ${isFahrenheit ? 'Celsius' : 'Fahrenheit'}`}</button>

      {result && <WeatherCard result={result} inFahrenheit={isFahrenheit}/>}
    </div>
  );
}
