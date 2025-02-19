import React from "react";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import Animated, { interpolateColor, useAnimatedStyle } from "react-native-reanimated";
import { Canvas, LinearGradient, Path, RoundedRect, vec } from "@shopify/react-native-skia";

import { useBottomSheetPosition } from "../../context/BottomSheetPosition";

type ForecastSheetBackgroundProps = {
  width: number;
  height: number;
  cornerRadius: number;
};

const ForecastSheetBackground: React.FC<ForecastSheetBackgroundProps> = ({ width, height, cornerRadius }) => {
  const bottomSheetPosition = useBottomSheetPosition();

  const borderPath = `M 0 ${cornerRadius} A ${cornerRadius} ${cornerRadius} 0 0 1 ${cornerRadius} 0 L ${width - cornerRadius} 0 A ${cornerRadius} ${cornerRadius} 0 0 1 ${width} ${cornerRadius}`;
  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

  const blurViewAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(bottomSheetPosition.value, [0, 0.1], ["transparent", "#2e335a"]),
  }));

  return (
    <AnimatedBlurView
      intensity={30}
      tint="dark"
      experimentalBlurMethod="dimezisBlurView"
      style={[styles.blurView, { borderRadius: cornerRadius }, blurViewAnimatedStyle]}
    >
      <Canvas style={styles.canvas}>
        <RoundedRect x={0} y={0} width={width} height={height} r={cornerRadius}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={["rgba(46, 51, 90, 0.26)", "rgba(28, 57, 51, 0.26)"]}
            positions={[-0.04, 0.95]}
          />
        </RoundedRect>
        <Path path={borderPath} strokeWidth={3} style={"stroke"} color={"white"}>
          <LinearGradient
            start={vec(width / 2, 0)}
            end={vec(width / 2, cornerRadius)}
            colors={["white", "transparent"]}
            positions={[-0.04, 0.95]}
          />
        </Path>
      </Canvas>
    </AnimatedBlurView>
  );
};

const styles = StyleSheet.create({
  blurView: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  canvas: {
    flex: 1,
  },
});

export default ForecastSheetBackground;
