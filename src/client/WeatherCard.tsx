import React from "react";
import { Weather } from "./App";
import { kelvinToCelsius, kelvinToFahrenheit } from '../util/converters'
import "./app.css";

type Props = {
  result: Weather;
  inFahrenheit?: boolean;
};

export default function WeatherCard(props: Props) {
  const { result, inFahrenheit } = props;
  const { name, weather, main } = result;

  const temperature = inFahrenheit
    ? `${kelvinToFahrenheit(main.temp)}° F`
    : `${kelvinToCelsius(main.temp)}° C`;

  return (
    <div className="weatherCard">
      <div style={{ fontSize: 18 }}>{name}</div>

      <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="" />

      <div style={{ fontSize: 12 }}>{weather[0].main}</div>

      <div style={{ marginTop: 8, fontSize: 24 }}>{temperature}</div>
    </div>
  );
}
