import React from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Weather } from "../../models/Weather";
import { DEGREE_SYMBOL } from "../../utils/constants";
import { StyleSheet } from "react-native";

interface WeatherInfoProps {
  weather: Weather;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weather }) => {
  const { top } = useSafeAreaInsets();
  const { city, condition, temperature, high, low } = weather;

  return (
    <View style={[styles.container, { top: top + 40 }]}>
      <View>
        <Text style={styles.cityText}>{city}</Text>

        <Text style={styles.temperatureText}>
          {temperature}
          {DEGREE_SYMBOL}
        </Text>

        <Text style={styles.conditionText}>{condition}</Text>

        <View style={styles.highLowContainer}>
          <Text style={styles.highLowText}>
            H:{high}
            {DEGREE_SYMBOL}
          </Text>
          <Text style={styles.highLowText}>
            L:{low}
            {DEGREE_SYMBOL}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  cityText: {
    marginBottom: 16,
    fontFamily: "SF-Regular",
    fontSize: 36,
    lineHeight: 36,
    color: "white",
  },
  temperatureText: {
    alignSelf: "center",
    fontFamily: "SF-Thin",
    fontSize: 96,
    lineHeight: 96,
    color: "white",
  },
  conditionText: {
    marginBottom: 8,
    alignSelf: "center",
    fontFamily: "SF-Semibold",
    fontSize: 36,
    lineHeight: 36,
    color: "rgba(255, 255, 255, 0.7)",
  },
  highLowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  highLowText: {
    fontFamily: "SF-Regular",
    fontSize: 24,
    lineHeight: 24,
    color: "white",
  },
});

export default WeatherInfo;
