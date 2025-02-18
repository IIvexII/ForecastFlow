import React from "react";
import HomeBackground from "../components/HomeBackground";
import ForecastSheet from "../components/sheet/ForecastSheet";
import WeatherTabBar from "../components/tabbar/WeatherTabBar";

export default function Home() {
  return (
    <>
      <HomeBackground />
      <ForecastSheet />
      <WeatherTabBar />
    </>
  );
}
