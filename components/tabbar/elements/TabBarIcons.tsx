import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import MapIcon from "../icons/MapIcon";
import ListIcon from "../icons/ListIcon";
import TrapizoidBackground from "./TrapizoidBackground";
import { getCurrentLocation } from "../../../services/locationService";
import { useWeather } from "../../../context/WeatherContext";
import { fetchWeather } from "../../../services/weatherService";

type TabBarIconsProps = {
  style?: StyleProp<ViewStyle>;
  height: number;
};

const TabBarIcons = React.memo((props: TabBarIconsProps) => {
  const navigation = useNavigation<NativeStackScreenProps<RootStackParamList>["navigation"]>();
  const { setWeatherData } = useWeather();

  const handleLocationPress = async () => {
    try {
      const location = await getCurrentLocation();
      const weather = await fetchWeather(`${location.latitude},${location.longitude}`);
      setWeatherData(weather);
    } catch (error) {
      console.error("Error getting current location:", error);
    }
  };

  return (
    <View style={[styles.container, props.style]}>
      <Pressable onPress={handleLocationPress} hitSlop={10}>
        <MapIcon style={styles.icon} />
      </Pressable>
      <TrapizoidBackground />
      <Pressable onPress={() => navigation.navigate("Search")} hitSlop={20}>
        <ListIcon style={styles.icon} />
      </Pressable>
    </View>
  );
});

TabBarIcons.displayName = "TabBarIcons";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24, // px-6 converts to 24 in React Native
  },
  icon: {
    marginTop: 26,
  },
});

export default TabBarIcons;
