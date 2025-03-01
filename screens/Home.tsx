import { View } from "react-native";
import React, { useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import HomeBackground from "../components/HomeBackground";
import ForecastSheet from "../components/sheet/ForecastSheet";
import WeatherCityModal from "../components/WeatherCityModel";
import WeatherTabBar from "../components/tabbar/WeatherTabBar";

import useStoredData from "../hooks/useStoredCity";
import { useWeatherQuery } from "../hooks/useWeatherQuery";

import { useWeather } from "../context/WeatherContext";

import { getCurrentLocation } from "../services/locationService";

const Home: React.FC = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const { setWeatherData, setIsLoading } = useWeather();
  const [location, setLocation] = useStoredData("location", "Lahore"); // local storage data
  const { data } = useWeatherQuery(location);
  const navigation = useNavigation<NativeStackScreenProps<RootStackParamList>["navigation"]>();

  useEffect(() => {
    // only set global state when weather is not null
    if (data) setWeatherData(data);
  }, [data]);

  const handleCurrentLocation = useCallback(async () => {
    try {
      setIsLoading(true);
      const location = await getCurrentLocation();
      const currentLocation = `${location.latitude},${location.longitude}`;
      setLocation(currentLocation);
    } catch (error) {
      console.error("Error getting current location:", error);
    }

    setIsLoading(false);
  }, []);

  const handleAddLocation = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleWeatherList = useCallback(() => {
    navigation.navigate("Search");
  }, []);

  const onSelectedCity = useCallback(async (city: string) => {
    try {
      setIsLoading(true);
      setLocation(city);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error("Error getting current location:", error);
    }
    setIsLoading(false);
  }, []);

  return (
    <>
      <View>
        <WeatherCityModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onSelected={onSelectedCity}
        />
      </View>
      <HomeBackground />
      <ForecastSheet />
      <WeatherTabBar
        onCurrentLocationPress={handleCurrentLocation}
        onAddLocationPress={handleAddLocation}
        onWeatherListPress={handleWeatherList}
      />
    </>
  );
};

export default React.memo(Home);
