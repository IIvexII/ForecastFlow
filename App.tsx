import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";

import HomeBackground from "./components/HomeBackground";
import WeatherTabBar from "./components/tabbar/WeatherTabBar";

import "./styles/global.css";
import { useCallback } from "react";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "SF-Thin": require("./assets/fonts/SF-Pro-Display-Thin.otf"),
    "SF-Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
    "SF-Semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <HomeBackground />
      <WeatherTabBar />
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
