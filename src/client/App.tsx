import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import "./app.css";

export type Weather = {
  id: number
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
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const [recent, setRecent] = useState<Weather[]>([])
  const [hottest, setHottest] = useState<Weather>()
  const [coldest, setColdest] = useState<Weather>()

  const onSearch = (query: string) => {
    fetch("/api/weather?q=" + encodeURIComponent(query))
      .then((res) => res.json())
      .then((data) => {
        setResult(data)
        addRecent(data)
      });
  };

  const onSwitchUnit = () => {
    setIsFahrenheit(!isFahrenheit);
  };

  const addRecent = (item: Weather) => {
    recent.unshift(item);
    setRecent(recent.slice(0,3));
  };

  useEffect(() => onSearch("San Francisco, CA, USA"), []);

  useEffect(() => {
    if (recent.length > 1) {
      let max = recent[0].main.temp, min = recent[0].main.temp;
      let maxId = 0, minId = 0;
      recent.forEach((item, idx) => {
        const temp = item.main.temp;
        if (temp > max) {
          max = temp;
          maxId = idx;
        }

        if (temp < min) {
          min = temp;
          minId = idx;
        }
      })

      setHottest(recent[maxId]);
      setColdest(recent[minId]);
    }
  }, [recent])

  return (
    <div className="container">
      <h1>Assemble Weather App</h1>

      <SearchBar onSearch={onSearch} />

      <button
        className="switch-unit-button"
        onClick={onSwitchUnit}
      >
        {`Switch to ${isFahrenheit ? 'Celsius' : 'Fahrenheit'}`}
      </button>

      {result && <WeatherCard result={result} inFahrenheit={isFahrenheit}/>}

      {!!recent.length && (
        <>
          <h3 className="recent-visited__title">Recent:</h3>
          <section className="recent-visited">
            {recent.map((item) => (
              <WeatherCard
                coldest={coldest?.id === item.id}
                hottest={hottest?.id === item.id}
                inFahrenheit={isFahrenheit}
                key={item.id}
                result={item}
              />
            ))}
          </section>
        </>
      )}
    </div>
  );
}
