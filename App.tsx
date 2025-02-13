import { SafeAreaView } from "react-native";
import HomeBackground from "./components/HomeBackground";
import { StatusBar } from "expo-status-bar";
import WeatherTabBar from "./components/tabbar/WeatherTabBar";
export default function App() {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <HomeBackground />
        <WeatherTabBar />
        <StatusBar style='light' />
      </SafeAreaView>
    </>
  );
}
