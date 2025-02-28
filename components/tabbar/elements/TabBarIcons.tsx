import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import MapIcon from "../icons/MapIcon";
import ListIcon from "../icons/ListIcon";
import TrapizoidBackground from "./TrapizoidBackground";

import { useWeather } from "../../../context/WeatherContext";
import { useWeatherQuery } from "../../../hooks/useWeatherQuery";
import { getCurrentLocation } from "../../../services/locationService";

type TabBarIconsProps = {
  style?: StyleProp<ViewStyle>;
  height: number;
};

const TabBarIcons = React.memo((props: TabBarIconsProps) => {
  const { setWeatherData, setIsLoading } = useWeather();
  const [coordinates, setCoordinates] = React.useState<string>("");
  const navigation = useNavigation<NativeStackScreenProps<RootStackParamList>["navigation"]>();

  // this custom hook uses react query to fetch and cache
  // the api responses
  const { data } = useWeatherQuery(coordinates);

  useEffect(() => {
    if (data) setWeatherData(data);
  }, [data]);

  const handleLocationPress = async () => {
    try {
      setIsLoading(true);
      const location = await getCurrentLocation();
      setCoordinates(`${location.latitude},${location.longitude}`);
    } catch (error) {
      console.error("Error getting current location:", error);
    }

    setIsLoading(false);
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
    paddingHorizontal: 24,
  },
  icon: {
    marginTop: 26,
  },
});

export default TabBarIcons;
