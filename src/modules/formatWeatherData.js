export default function formatWeatherData(data) {
  const current = data.currentConditions;
  return {
    address: data.address,
    updatedAt: current.datetime,
    sunrise: current.sunrise,
    sunset: current.sunset,
    temp: current.temp,
    timezone: data.timezone,
    icon: current.icon,
    conditions: current.conditions,
  };
}
