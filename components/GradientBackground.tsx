import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";

const GradientBackground: React.FC = () => {
  const { width, height } = useWindowDimensions();

  return (
    <Canvas style={styles.absolute}>
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient start={vec(0, 0)} end={vec(width, height)} colors={["#2e335a", "#1c1b33"]} />
      </Rect>
    </Canvas>
  );
};

const styles = StyleSheet.create({
  absolute: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
});

export default React.memo(GradientBackground);
