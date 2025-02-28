import React, { useEffect } from "react";

import Loading from "../components/Loading";
import HomeBackground from "../components/HomeBackground";
import ForecastSheet from "../components/sheet/ForecastSheet";
import WeatherTabBar from "../components/tabbar/WeatherTabBar";

import { useWeatherQuery } from "../hooks/useWeatherQuery";
import { useWeather } from "../context/WeatherContext";
import { BottomSheetPositionProvider } from "../context/BottomSheetPosition";

const Home: React.FC = () => {
  const { setWeatherData } = useWeather();
  const { data: weatherData, isLoading } = useWeatherQuery("Lahore");

  useEffect(() => {
    // only set global state when weather is not null
    if (weatherData) setWeatherData(weatherData);
  }, [weatherData]);

  // show loading screen if data is loading or not available
  if (isLoading || !weatherData) {
    return <Loading />;
  }

  return (
    <BottomSheetPositionProvider>
      <HomeBackground />
      <ForecastSheet />
      <WeatherTabBar />
    </BottomSheetPositionProvider>
  );
};

export default React.memo(Home);
