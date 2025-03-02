import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const GradientBackground: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  // add height of top safe area to the height becuase
  // it is excluded and we need to cover the whole screen
  const heightWithTop = React.useMemo(() => height + top, [height, top]);

  return (
    <View style={[styles.absolute, { width, height: heightWithTop }]}>
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={heightWithTop}>
          <LinearGradient start={vec(0, 0)} end={vec(width, heightWithTop)} colors={["#2e335a", "#1c1b33"]} />
        </Rect>
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default React.memo(GradientBackground);
