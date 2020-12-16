import React from "react";
import { Weather } from "./App";
import { kelvinToCelsius, kelvinToFahrenheit } from '../util/convert';
import "./app.css";

type Props = {
  result: Weather;
  inFahrenheit?: boolean;
  hottest?: boolean;
  coldest?: boolean;
};

export default function WeatherCard(props: Props) {
  const { result, inFahrenheit, hottest, coldest } = props;
  const { name, weather, main } = result;

  const temperature = inFahrenheit
    ? `${kelvinToFahrenheit(main.temp)}° F`
    : `${kelvinToCelsius(main.temp)}° C`;

  const weatherIcon = hottest ? 'hottest' : coldest ? 'coldest' : undefined;

  return (
    <div className="weatherCard">
      <div style={{ fontSize: 18 }}>{name}</div>

      <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="" />

      <div style={{ fontSize: 12 }}>{weather[0].main}</div>

      <div style={{ marginTop: 8, fontSize: 24 }}>{temperature}</div>

      {weatherIcon && (
        <img className="weather-icon" src={`./public/${weatherIcon}.png`} alt={weatherIcon} />
      )}
    </div>
  );
}
