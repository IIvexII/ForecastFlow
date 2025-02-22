import React, { useCallback, useState } from "react";
import { TouchableWithoutFeedback } from "@gorhom/bottom-sheet";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { SpringConfig } from "react-native-reanimated/lib/typescript/animation/springUtils";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import Seperator from "./Seperator";
import { ForecastType } from "../../../models/Weather";
import ForecastCapsuleList from "./ForecastCapsuleList";

import { useWeather } from "../../../context/WeatherContext";

export default function ForecastControls() {
  const { width } = useWindowDimensions();
  const [forecastType, setForecastType] = useState<ForecastType>(ForecastType.Hourly);
  const {
    weatherData: { hourly, weekly },
  } = useWeather();

  // show the hourly forecast from 2 hour ago to next 6 hours
  const now = new Date();
  const previous2Hour = new Date(now.getTime() - 2 * 60 * 60 * 1000);
  const next6Hours = new Date(now.getTime() + 6 * 60 * 60 * 1000);

  const hourlyForecast = hourly?.filter((forecast) => {
    const forecastDate = new Date(forecast.date);
    return forecastDate >= previous2Hour && forecastDate <= next6Hours;
  });

  // handle on press
  const handleOnPress = useCallback((forecastType: ForecastType) => {
    animate(forecastType);
    setForecastType(forecastType);
  }, []);

  //////////////////////
  //   Animations    //
  /////////////////////
  const weeklyOptTextColor = useSharedValue("#FFFFFF");
  const hourlyOptTextColor = useSharedValue("#FFFFFFB3");

  // animate the position of the selected forecast type
  const hourlyTranslateX = useSharedValue(0);
  const weeklyTranslateX = useSharedValue(width);

  const hourlyForecastStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: hourlyTranslateX.value }],
    };
  });
  const weeklyForecastStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: weeklyTranslateX.value }],
    };
  });

  // text color animation function
  const animate = useCallback((selectedType: ForecastType) => {
    const animationConfig: SpringConfig = {
      damping: 14,
    };

    if (selectedType === ForecastType.Hourly) {
      hourlyOptTextColor.value = withSpring("#FFFFFF");
      weeklyOptTextColor.value = withSpring("#FFFFFFB3");

      hourlyTranslateX.value = withSpring(0, animationConfig);
      weeklyTranslateX.value = withSpring(width, animationConfig);
    } else {
      hourlyOptTextColor.value = withSpring("#FFFFFFB3");
      weeklyOptTextColor.value = withSpring("#FFFFFF");

      hourlyTranslateX.value = withSpring(-width, animationConfig);
      weeklyTranslateX.value = withSpring(-width, animationConfig);
    }
  }, []);

  return (
    <View>
      <View style={styles.forecastControlsContainer}>
        <TouchableWithoutFeedback onPress={handleOnPress.bind(null, ForecastType.Hourly)}>
          <Animated.Text style={[styles.selectedForecastText, { color: hourlyOptTextColor }]}>
            Hourly Forecast
          </Animated.Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleOnPress.bind(null, ForecastType.Weekly)}>
          <Animated.Text style={[styles.selectedForecastText, { color: weeklyOptTextColor }]}>
            Weekly Forecast
          </Animated.Text>
        </TouchableWithoutFeedback>
      </View>

      <Seperator style={{ marginTop: 10 }} height={5} width={width} />

      <View style={{ flexDirection: "row" }}>
        <Animated.View style={hourlyForecastStyles}>
          <ForecastCapsuleList type={forecastType} forecasts={hourlyForecast || []} />
        </Animated.View>
        <Animated.View style={weeklyForecastStyles}>
          <ForecastCapsuleList type={forecastType} forecasts={weekly || []} />
        </Animated.View>
      </View>
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
  },
});
