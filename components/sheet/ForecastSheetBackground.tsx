import { StyleSheet } from "react-native";
import React from "react";
import { Canvas, LinearGradient, Path, RoundedRect, vec } from "@shopify/react-native-skia";
import { BlurView } from "expo-blur";
import Animated, { interpolateColor, useAnimatedStyle } from "react-native-reanimated";
import { useBottomSheetPosition } from "../../context/BottomSheetPosition";

type ForecastSheetBackgroundProps = {
  width: number;
  height: number;
  cornerRadius: number;
};

export default function ForecastSheetBackground(props: ForecastSheetBackgroundProps) {
  const bottomSheetPosition = useBottomSheetPosition();

  const borderPath = `M 0 ${props.cornerRadius} A ${props.cornerRadius} ${props.cornerRadius} 0 0 1 ${props.cornerRadius} 0 L ${props.width - props.cornerRadius} 0 A ${props.cornerRadius} ${props.cornerRadius} 0 0 1 ${props.width} ${props.cornerRadius}`;
  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
  const blurViewAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(bottomSheetPosition.value, [0, 0.1], ["transparent", "#2e335a"]),
    };
  });
  return (
    <AnimatedBlurView
      intensity={30}
      tint="dark"
      experimentalBlurMethod="dimezisBlurView"
      style={[
        {
          ...StyleSheet.absoluteFillObject,
          borderRadius: props.cornerRadius,
          overflow: "hidden",
        },
        blurViewAnimatedStyle,
      ]}
    >
      <Canvas style={{ flex: 1 }}>
        <RoundedRect x={0} y={0} width={props.width} height={props.height} r={props.cornerRadius}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(props.width, props.height)}
            colors={["rgba(46, 51, 90, 0.26)", "rgba(28, 57, 51, 0.26)"]}
            positions={[-0.04, 0.95]}
          />
        </RoundedRect>
        <Path path={borderPath} strokeWidth={3} style={"stroke"} color={"white"}>
          <LinearGradient
            start={vec(props.width / 2, 0)}
            end={vec(props.width / 2, props.cornerRadius)}
            colors={["white", "transparent"]}
            positions={[-0.04, 0.95]}
          />
        </Path>
      </Canvas>
    </AnimatedBlurView>
  );
}
