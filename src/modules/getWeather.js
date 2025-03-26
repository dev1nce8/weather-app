import formatWeatherData from "./formatWeatherData.js";

const url =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

export default function getWeather(city) {
  const f = async () => {
    const res = await fetch(url + city + `?key=${process.env.API_KEY}`);
    const data = await res.json();
    console.log(formatWeatherData(data));
  };

  f();
}
