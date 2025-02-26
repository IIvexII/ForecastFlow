import React, { useEffect } from "react";
import HomeBackground from "../components/HomeBackground";
import ForecastSheet from "../components/sheet/ForecastSheet";
import WeatherTabBar from "../components/tabbar/WeatherTabBar";

import { BottomSheetPositionProvider } from "../context/BottomSheetPosition";
import { useWeatherQuery } from "../hooks/useWeatherQuery";
import { useWeather } from "../context/WeatherContext";

const Home: React.FC = () => {
  const { setWeatherData } = useWeather();
  const { data: weatherData } = useWeatherQuery("Lahore");

  useEffect(() => {
    // only set global state when weather is not null
    if (weatherData) setWeatherData(weatherData);
  }, [weatherData]);

  return (
    <BottomSheetPositionProvider>
      <HomeBackground />
      <ForecastSheet />
      <WeatherTabBar />
    </BottomSheetPositionProvider>
  );
};

export default React.memo(Home);
