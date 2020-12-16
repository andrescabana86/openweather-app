import axios from "axios";

const API_KEY = "28c425295bc65119b0ae1505a9d11573";

export async function weather(query: string): Promise<any> {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedQuery}&appid=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
}
