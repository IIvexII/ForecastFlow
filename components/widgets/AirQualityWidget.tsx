import React from "react";
import Entypo from "@expo/vector-icons/Entypo";

import Widget from "./base/Widget";
import { Canvas, Circle, LinearGradient, Path, vec } from "@shopify/react-native-skia";
import { LayoutChangeEvent, View } from "react-native";

type AirQualityWidgetProps = {
  airQualityIndex: number;
  width: number;
};

export default function AirQualityWidget(props: AirQualityWidgetProps) {
  const [width, setWidth] = React.useState(150);

  const lineWidth = width - 50;
  const maxAirQualityIndex = 500;

  const clampedAirQualityIndex = Math.max(8, Math.min(props.airQualityIndex, maxAirQualityIndex));
  const lineHandlePosition = lineWidth * (clampedAirQualityIndex / maxAirQualityIndex);

  const airQualityBriefs: { [key: number]: string } = {
    0: "Low Health Risk",
    1: "Moderate Health Risk",
    2: "High Health Risk",
    3: "Very High Health Risk",
  };
  const airQualityIndex = Math.floor(clampedAirQualityIndex / 100);

  let airQualityBrief = "Unknown Health Risk";
  if (airQualityIndex >= 3) {
    airQualityBrief = airQualityBriefs[3];
  } else if (airQualityBriefs.hasOwnProperty(airQualityIndex)) {
    airQualityBrief = airQualityBriefs[airQualityIndex];
  }

  function handleLayout(event: LayoutChangeEvent) {
    setWidth(event.nativeEvent.layout.width);
  }

  return (
    <View onLayout={handleLayout}>
      <Widget>
        <Widget.Header icon={<Entypo name="air" />} title="Air Quality Index" />
        <Widget.Body contentText={`${props.airQualityIndex}-${airQualityBrief}`}>
          <Canvas style={{ width: props.width, height: 50 }}>
            <Path path={`M 5 8 L ${lineWidth} 8`} strokeWidth={6} style={"stroke"} strokeCap={"round"}>
              <LinearGradient
                start={vec(0, 0)}
                end={vec(width, 0)}
                colors={["#0080FF", "#FF379B"]}
                positions={[-0.4, 0.8]}
              />
            </Path>
            <Circle cx={lineHandlePosition} cy={8} r={6} color={"#FFFF"} />
          </Canvas>
        </Widget.Body>
      </Widget>
    </View>
  );
}
