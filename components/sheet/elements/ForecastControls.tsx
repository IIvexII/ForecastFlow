import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { ForecastType } from "../../../models/Weather";

type ForecastControlsProps = {
  selected: ForecastType;
  onChange: (forecastType: ForecastType) => void;
};

export default function ForecastControls(props: ForecastControlsProps) {
  return (
    <View style={styles.forecastControlsContainer}>
      <TouchableOpacity onPress={() => props.onChange(ForecastType.Hourly)}>
        <Text
          style={[styles.forecastText, props.selected === ForecastType.Hourly && styles.selectedForecastText]}
        >
          Hourly Forecast
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.onChange(ForecastType.Weekly)}>
        <Text
          style={[styles.forecastText, props.selected === ForecastType.Weekly && styles.selectedForecastText]}
        >
          Weekly Forecast
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  forecastControlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
  },
  forecastText: {
    fontFamily: "SF-Semibold",
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.7)",
    paddingBottom: 20,
  },
  selectedForecastText: {
    fontFamily: "SF-Semibold",
    fontSize: 15,
    color: "white",
  },
});
