import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

import HomeBackground from "./components/HomeBackground";
import WeatherTabBar from "./components/tabbar/WeatherTabBar";

import "./styles/global.css";

export default function App() {
  return (
    <>
      <HomeBackground />
      <WeatherTabBar />
      <StatusBar style="light" />
    </>
  );
}
