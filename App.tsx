import { useCallback } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Home from "./screens/Home";

import "./styles/global.css";
import RootNavigator from "./navigators/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

const App: React.FC = () => {
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
    <GestureHandlerRootView>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        <StatusBar style="light" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
