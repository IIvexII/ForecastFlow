import React from "react";
import { Canvas, Line, vec } from "@shopify/react-native-skia";
import { StyleProp, ViewStyle } from "react-native";

type SeperatorProps = {
  width: number;
  height: number;
  color?: string;
  style: StyleProp<ViewStyle>;
};

export default function Seperator(props: SeperatorProps) {
  return (
    <Canvas style={[{ width: props.width, height: props.height }, props.style]}>
      <Line
        p1={vec(0, 0)}
        p2={vec(props.width, 0)}
        strokeWidth={props.height}
        color={props.color || "rgba(255, 255, 255, 0.2)"}
      />
    </Canvas>
  );
}
