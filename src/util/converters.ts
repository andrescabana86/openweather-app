/**
 * kelvinTo converts from Kelvin to Celsius
 * @param kelvin
 */
export const kelvinToCelsius = (kelvin: number) => {
  return (kelvin - 273.15).toFixed(1);
};

/**
 * kelvinToFahrenheit converts from Kelvin to Fahrenheit
 * @param kelvin
 */
export const kelvinToFahrenheit = (kelvin: number) => {
  const celsius = kelvinToCelsius(kelvin);
  return (celsius * 1.8 + 32).toFixed(1);
};
