import React from "react";
import { View, Text, useWindowDimensions, StyleSheet, Image } from "react-native";
import { Canvas, RoundedRect, Shadow } from "@shopify/react-native-skia";

import { Forecast, ForecastType } from "../../../models/Weather";
import { DEGREE_SYMBOL } from "../../../utils/constants";
import { convertDateTo12HourFormat, convertDateToDay } from "../../../utils/date-time";

type ForecastCapsuleProps = {
  forecast: Forecast;
  type: ForecastType;
};

export default function ForecastCapsule(props: ForecastCapsuleProps) {
  const { width, height } = useWindowDimensions();
  const { date, icon, temperature, probability } = props.forecast;

  let dateOrTime = "";
  if (props.type === ForecastType.Hourly) {
    dateOrTime = convertDateTo12HourFormat(date);
  } else {
    dateOrTime = convertDateToDay(date).name;
  }

  // configure opacity based on forecast data
  const probabilityOpacity = probability ? 1 : 0;
  const isCurrentTime =
    props.type === ForecastType.Hourly
      ? convertDateTo12HourFormat(date) === "Now"
      : convertDateToDay(date).today;

  const capsuleBgOpacity = isCurrentTime ? 1 : 0.3;

  // capsule configs
  const capsuleHeight = 180;
  const capsuleWidth = 80;
  const borderRadius = 40;
  const spaceY = 30;

  return (
    <View style={{ width: capsuleWidth, height: capsuleHeight }}>
      <Canvas style={{ ...StyleSheet.absoluteFillObject, width: capsuleWidth, height: capsuleHeight }}>
        <RoundedRect
          width={capsuleWidth}
          height={capsuleHeight}
          r={borderRadius}
          color={"rgb(72, 49, 157)"}
          opacity={capsuleBgOpacity}
        >
          <Shadow dx={1} dy={1} blur={1} color={"rgba(255, 255, 255, 0.3)"} inner />
        </RoundedRect>
      </Canvas>

      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          paddingVertical: spaceY,
          gap: 6,
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontFamily: "SF-Semibold", lineHeight: 20 }}>
          {dateOrTime}
        </Text>
        <View>
          <Image source={icon} style={{ width: 40, height: 40 }} />
          <Text
            style={{
              color: "#7edaff",
              fontSize: 14,
              fontFamily: "SF-Regular",
              lineHeight: 20,
              textAlign: "center",
              opacity: probabilityOpacity,
            }}
          >
            {probability}%
          </Text>
        </View>
        <Text style={{ color: "white", fontSize: 20, fontFamily: "SF-Regular", lineHeight: 26 }}>
          {Math.round(temperature)}
          {DEGREE_SYMBOL}
        </Text>
      </View>
    </View>
  );
}
