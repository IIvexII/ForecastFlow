import React from "react";
import HomeBackground from "../components/HomeBackground";
import ForecastSheet from "../components/sheet/ForecastSheet";
import WeatherTabBar from "../components/tabbar/WeatherTabBar";
import { BottomSheetPositionProvider } from "../context/BottomSheetPosition";

const Home: React.FC = () => {
  return (
    <BottomSheetPositionProvider>
      <HomeBackground />
      <ForecastSheet />
      <WeatherTabBar />
    </BottomSheetPositionProvider>
  );
};

export default React.memo(Home);
