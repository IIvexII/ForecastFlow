import { useCallback } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useWindowDimensions } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

import RootNavigator from "./navigators/RootNavigator";
import { WeatherProvider } from "./context/WeatherContext";

import asyncStoragePersister from "./utils/persister";
import { BottomSheetPositionProvider } from "./context/BottomSheetPosition";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (cache-time)
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});

const App: React.FC = () => {
  const { height } = useWindowDimensions();
  const [fontsLoaded] = useFonts({
    "SF-Thin": require("./assets/fonts/SF-Pro-Display-Thin.otf"),
    "SF-Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
    "SF-Semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && height > 0) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded || height <= 0) return null;

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: asyncStoragePersister }}>
      <WeatherProvider>
        <BottomSheetPositionProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider onLayout={onLayoutRootView}>
              <NavigationContainer>
                <RootNavigator />
              </NavigationContainer>
              <StatusBar style="light" />
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </BottomSheetPositionProvider>
      </WeatherProvider>
    </PersistQueryClientProvider>
  );
};

export default App;
