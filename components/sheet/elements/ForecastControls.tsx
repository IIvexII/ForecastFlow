import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ForecastControls() {
  return (
    <View style={styles.forecastControlsContainer}>
      <TouchableOpacity>
        <Text style={styles.forecastText}>Hourly Forecast</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.forecastText}>Weekly Forecast</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  forecastControlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  forecastText: {
    fontFamily: "SF-Semibold",
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.7)",
  },
});
