import { api, constant } from "./enums.js";
import formatWeatherData from "./formatWeatherData.js";

const url =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

export default function getWeather(city, metric = constant.celsius) {
  const f = async () => {
    const res = await fetch(
      url +
        city +
        `?key=${api}&unitGroup=${metric === constant.celsius ? "metric" : "us"}`,
    );
    const data = await res.json();
    console.log(data);
    return formatWeatherData(data);
  };

  return f();
}
