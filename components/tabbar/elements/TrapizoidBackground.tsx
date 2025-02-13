import React from "react";
import { useWindowDimensions } from "react-native";
import {
  Canvas,
  FitBox,
  LinearGradient,
  Path,
  rect,
  vec,
} from "@shopify/react-native-skia";

export default function TrapizoidBackground() {
  const { width } = useWindowDimensions();

  return (
    <Canvas
      style={{
        flex: 1,
        height: 130,
        marginBottom: -6,
      }}
    >
      <FitBox src={rect(0, 0, 410, 124)} dst={rect(0, 0, width, 130)}>
        <Path
          path={
            "M133.678 0L185.663 0C262.404 1.47552e-06 235.173 123.776 319.341 123.776H0C84.1673 123.776 56.9367 1.60783e-05 133.678 0Z"
          }
        >
          <LinearGradient
            start={vec(width / 2.5, 0)}
            end={vec(width / 2.5, 100)}
            colors={["#262C51", "#3E3F78"]}
          />
        </Path>
      </FitBox>
    </Canvas>
  );
}
