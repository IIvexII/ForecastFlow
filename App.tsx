import { useCallback } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

import RootNavigator from "./src/navigators/RootNavigator";
import { WeatherProvider } from "./src/context/WeatherContext";

import asyncStoragePersister from "./src/utils/persister";

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
  const [fontsLoaded] = useFonts({
    "SF-Thin": require("./src/assets/fonts/SF-Pro-Display-Thin.otf"),
    "SF-Regular": require("./src/assets/fonts/SF-Pro-Display-Regular.otf"),
    "SF-Semibold": require("./src/assets/fonts/SF-Pro-Display-Semibold.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: asyncStoragePersister }}>
        <WeatherProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
            <StatusBar style="light" />
          </GestureHandlerRootView>
        </WeatherProvider>
      </PersistQueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
