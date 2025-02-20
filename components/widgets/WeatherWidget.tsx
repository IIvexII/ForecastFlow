import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Canvas, FitBox, LinearGradient, Path, rect, Shadow, vec } from "@shopify/react-native-skia";
import { Forecast } from "../../models/Weather";
import { DEGREE_SYMBOL } from "../../utils/constants";

type WeatherWidgetProps = {
  width: number;
  forecast: Forecast;
};

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ width, forecast }) => {
  return (
    <View style={styles.container}>
      {/* Widget Background Shape */}
      <View style={styles.absoluteView}>
        <Canvas style={[styles.canvas, { width: width + 26 }]}>
          <FitBox src={rect(0, 0, 445, 246)} dst={rect(0, 0, width + 26, 246)}>
            <Path path="M0 82.8946C0 39.6139 0 17.9735 14.0973 6.82339C28.1945 -4.32673 49.2531 0.657543 91.3703 10.6261L376.444 78.0991C396.558 82.8599 406.615 85.2402 412.488 92.6656C418.361 100.091 418.361 110.426 418.361 131.096V163.523C418.361 189.197 418.361 202.033 410.385 210.009C402.41 217.985 389.573 217.985 363.9 217.985H54.4612C28.7879 217.985 15.9513 217.985 7.97566 210.009C0 202.033 0 189.197 0 163.523V82.8946Z">
              <LinearGradient
                start={vec(width / 2.5, 10)}
                end={vec(width / 2, 220)}
                colors={["#5936B4", "#6546BA", "#5234AB", "#3E2D8F", "#261A63", "#362A84"]}
              />
              <Shadow dx={0} dy={0} blur={8} color="rgba(0, 0, 0, 0.5)" inner />
            </Path>
          </FitBox>
        </Canvas>
        <Canvas style={[styles.secondCanvas, { width }]}>
          <FitBox src={rect(0, 0, 419, 228)} dst={rect(0, 0, width, 228)}>
            <Path path="M0 82.8946C0 39.6139 0 17.9735 14.0973 6.82339C28.1945 -4.32673 49.2531 0.657543 91.3703 10.6261L376.444 78.0991C396.558 82.8599 406.615 85.2402 412.488 92.6656C418.361 100.091 418.361 110.426 418.361 131.096V163.523C418.361 189.197 418.361 202.033 410.385 210.009C402.41 217.985 389.573 217.985 363.9 217.985H54.4612C28.7879 217.985 15.9513 217.985 7.97566 210.009C0 202.033 0 189.197 0 163.523V82.8946Z">
              <LinearGradient start={vec(0, 109)} end={vec(419, 109)} colors={["#5936B4", "#362A84"]} />
              <Shadow dx={0} dy={0} blur={2} color="rgba(0, 0, 0, 0.5)" inner />
            </Path>
          </FitBox>
        </Canvas>
      </View>

      {/* Weather Information */}
      <View style={styles.contentContainer}>
        <Text style={[styles.text, styles.temperatureText]}>
          {forecast.temperature}
          {DEGREE_SYMBOL}
        </Text>
        <View style={styles.highLowContainer}>
          <Text style={styles.text}>
            H:{forecast.high}
            {DEGREE_SYMBOL}
          </Text>
          <Text style={styles.text}>
            L:{forecast.low}
            {DEGREE_SYMBOL}
          </Text>
        </View>
        <View style={[styles.locationWeatherContainer, { width: width - 140 }]}>
          <Text style={[styles.text, styles.locationWeatherText]}>{forecast.location}</Text>
          <Text style={[styles.text, styles.locationWeatherText]}>{forecast.weather}</Text>
        </View>
      </View>
      {/* Weather Icon */}
      <Image source={forecast.icon} style={styles.weatherIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 228,
  },
  absoluteView: {
    position: "absolute",
  },
  canvas: {
    position: "absolute",
    height: 228,
  },
  secondCanvas: {
    marginLeft: 8,
    marginTop: 8,
    height: 228,
  },
  contentContainer: {
    marginLeft: 80,
    marginTop: 60,
  },
  text: {
    fontFamily: "SF-Regular",
    color: "white",
  },
  temperatureText: {
    fontSize: 60,
    lineHeight: 60,
  },
  highLowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: 100,
  },
  locationWeatherContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  locationWeatherText: {
    fontSize: 20,
    marginTop: 10,
  },
  weatherIcon: {
    position: "absolute",
    top: -50,
    right: 0,
    width: 250,
    height: 250,
  },
});

export default React.memo(WeatherWidget);
