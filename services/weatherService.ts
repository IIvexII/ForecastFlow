import { CONDITION_ICON_MAP } from "../utils/constants";
import { Forecast, ForecastType, Weather, WeatherType } from "../models/Weather";

const BASE_URL = "http://api.weatherapi.com/v1/forecast.json";
const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API;

export const fetchWeather = async (city: string) => {
  const weatherData = await (await fetch(`${BASE_URL}?key=${API_KEY}&q=${city}&days=7&aqi=yes`)).json();

  if (
    !weatherData.location ||
    !weatherData.current ||
    !weatherData.forecast ||
    !weatherData.forecast.forecastday
  ) {
    throw new Error("Invalid weather data received from API"); // Handle API errors
  }

  const current: Weather = {
    city: weatherData.location.name,
    temperature: Math.round(weatherData.current.temp_c),
    condition: weatherData.current.condition.text,
    high: Math.round(weatherData.forecast.forecastday[0].day.maxtemp_c), // Today's high
    low: Math.round(weatherData.forecast.forecastday[0].day.mintemp_c), // Today's low
    airQualiy: weatherData.current.air_quality?.["us-epa-index"], // Optional chaining
    uv: weatherData.current.uv,
    rainfall: weatherData.current.precip_mm,
    feelsLike: Math.round(weatherData.current.feelslike_c),
    humidity: weatherData.current.humidity,
    dewpoint: weatherData.current.dewpoint_c,
    visibility: weatherData.current.vis_km,
  };

  const weekly: Forecast[] = weatherData.forecast.forecastday.map((day: any, index: number) => ({
    id: index.toString(), // Use index or generate a unique ID
    date: new Date(day.date),
    weather: day.day.condition.text as WeatherType, // Type assertion
    probability: day.day.daily_chance_of_rain || 0, // Provide a default value
    temperature: day.day.avgtemp_c,
    high: day.day.maxtemp_c,
    low: day.day.mintemp_c,
    location: weatherData.location.name,
    icon: CONDITION_ICON_MAP[day.day.condition.code] || require("../assets/forecast/cloudy_large.png"), // Default icon
    type: ForecastType.Weekly, // Type assertion
    rainfall: day.day.totalprecip_mm,
    humidity: day.day.avghumidity,
  }));

  const hourly: Forecast[] = weatherData.forecast.forecastday[0].hour.map((hour: any, index: number) => ({
    id: index.toString(), // Or generate a unique id
    date: new Date(hour.time),
    weather: hour.condition.text as WeatherType,
    probability: hour.chance_of_rain || 0, // Default value
    temperature: hour.temp_c,
    high: weatherData.forecast.forecastday[0].day.maxtemp_c, // You might need to adjust this for hourly high/low
    low: weatherData.forecast.forecastday[0].day.mintemp_c, // You might need to adjust this for hourly high/low
    location: weatherData.location.name,
    icon: CONDITION_ICON_MAP[hour.condition.code] || require("../assets/forecast/cloudy_large.png"), // Correct icon URL
    type: ForecastType.Hourly, // Type assertion
    rainfall: hour.precip_mm,
  }));

  return { current, weekly, hourly };
};
