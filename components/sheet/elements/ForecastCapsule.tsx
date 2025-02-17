import React from "react";
import { View, Text, useWindowDimensions, StyleSheet, Image } from "react-native";
import { Canvas, RoundedRect, Shadow } from "@shopify/react-native-skia";
import { Forecast } from "../../../models/Weather";
import { DEGREE_SYMBOL } from "../../../utils/constants";
import { convertDateTo12HourFormat } from "../../../utils/date-time";

type ForecastCapsuleProps = {
  forecast: Forecast;
};

export default function ForecastCapsule(props: ForecastCapsuleProps) {
  const { width, height } = useWindowDimensions();
  const { date, icon, temperature, probability } = props.forecast;

  // opacity configs
  const probabilityOpacity = probability ? 1 : 0;
  const capsuleBgOpacity = convertDateTo12HourFormat(date) === "Now" ? 1 : 0.3;

  // capsule configs
  const capsuleHeight = height * 0.18;
  const capsuleWidth = width * 0.16;
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
          {convertDateTo12HourFormat(date)}
        </Text>
        <View>
          <Image source={icon} width={10} height={10} />
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
          {temperature}
          {DEGREE_SYMBOL}
        </Text>
      </View>
    </View>
  );
}
