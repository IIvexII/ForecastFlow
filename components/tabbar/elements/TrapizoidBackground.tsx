import React from "react";
import { useWindowDimensions } from "react-native";
import { Canvas, FitBox, LinearGradient, Path, rect, vec } from "@shopify/react-native-skia";
import CircleButton from "./CircleButton";

export default function TrapizoidBackground() {
  const { width } = useWindowDimensions();

  const TrapozoidWidth = width * 0.68;
  const TrapozoidHeight = 124;

  return (
    <>
      <Canvas style={{ width: TrapozoidWidth, height: TrapozoidHeight, marginRight: 5 }}>
        <FitBox fit="fill" src={rect(0, 0, 320, 124)} dst={rect(0, 0, TrapozoidWidth, TrapozoidHeight)}>
          <Path
            style={"fill"}
            path={
              "M133.678 0L185.663 0C262.404 1.47552e-06 235.173 123.776 319.341 123.776H0C84.1673 123.776 56.9367 1.60783e-05 133.678 0Z"
            }
          >
            <LinearGradient
              start={vec(width / 2, 0)}
              end={vec(width / 2, 100)}
              colors={["#3E3F78", "#262C51"]}
            />
          </Path>
        </FitBox>
      </Canvas>
      <CircleButton />
    </>
  );
}
