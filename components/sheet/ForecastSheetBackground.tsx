import { StyleSheet } from "react-native";
import React from "react";
import { Canvas, LinearGradient, RoundedRect, vec } from "@shopify/react-native-skia";
import { BlurView } from "expo-blur";

type ForecastSheetBackgroundProps = {
  width: number;
  height: number;
  cornerRadius: number;
};

export default function ForecastSheetBackground(props: ForecastSheetBackgroundProps) {
  return (
    <BlurView
      intensity={50}
      tint="dark"
      experimentalBlurMethod="dimezisBlurView"
      style={{
        ...StyleSheet.absoluteFillObject,
        borderRadius: props.cornerRadius,
        overflow: "hidden",
      }}
    >
      <Canvas style={{ flex: 1 }}>
        <RoundedRect x={0} y={0} width={props.width} height={props.height} r={props.cornerRadius}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(props.width, props.height)}
            colors={["rgba(46, 51, 90, 0.26)", "rgba(28, 57, 51, 0.26)"]}
            positions={[-4, 95]}
          />
        </RoundedRect>
      </Canvas>
    </BlurView>
  );
}
