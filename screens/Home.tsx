import React from "react";
import HomeBackground from "../components/HomeBackground";
import ForecastSheet from "../components/sheet/ForecastSheet";
import WeatherTabBar from "../components/tabbar/WeatherTabBar";

import { BottomSheetPositionProvider } from "../context/BottomSheetPosition";
import { useWeather } from "../context/WeatherContext";
import { fetchWeather } from "../services/weatherService";

const Home: React.FC = () => {
  const { setWeatherData } = useWeather();

  React.useEffect(() => {
    const fetchWeatherData = async () => {
      const weatherData = await fetchWeather("Lahore");

      setWeatherData(weatherData);
    };

    fetchWeatherData();
  }, [setWeatherData]);

  return (
    <BottomSheetPositionProvider>
      <HomeBackground />
      <ForecastSheet />
      <WeatherTabBar />
    </BottomSheetPositionProvider>
  );
};

export default React.memo(Home);
