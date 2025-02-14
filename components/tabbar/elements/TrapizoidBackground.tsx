import React from "react";
import { useWindowDimensions, View } from "react-native";
import {
  Canvas,
  Circle,
  FitBox,
  LinearGradient,
  Path,
  rect,
  Shadow,
  vec,
} from "@shopify/react-native-skia";

export default function TrapizoidBackground() {
  const { width } = useWindowDimensions();

  const TrapozoidWidth = width * 0.68;
  const TrapozoidHeight = 124;

  const TrapozoidLocation = width / 2 - 76;

  return (
    <Canvas style={{ width: 320, height: 124, marginRight: 5 }}>
      <FitBox
        src={rect(0, 0, 320, 124)}
        dst={rect(0, 0, TrapozoidWidth, TrapozoidHeight)}
      >
        <Path
          style={"fill"}
          path={
            "M133.678 0L185.663 0C262.404 1.47552e-06 235.173 123.776 319.341 123.776H0C84.1673 123.776 56.9367 1.60783e-05 133.678 0Z"
          }
        >
          <LinearGradient
            start={vec(width / 2, 0)}
            end={vec(width / 2, 100)}
            colors={["#262C51", "#3E3F78"]}
          />
        </Path>
      </FitBox>
      <Circle cx={width / 2 - 76} cy={60} r={40} style={"fill"}>
        <LinearGradient
          start={vec(width / 2, 0)}
          end={vec(width / 2, TrapozoidHeight)}
          colors={["#F5F5F9", "#DADFE7"]}
        />
        <Shadow blur={1.5} color={"#FFFF"} dx={0} dy={0} />
        <Path
          path={`M${TrapozoidLocation} 45 L${TrapozoidLocation} 75 `}
          strokeWidth={6}
          style={"stroke"}
          color={"#3E3F78"}
          strokeCap={"round"}
        />
        <Path
          path={`M${TrapozoidLocation - 15} 60 L${TrapozoidLocation + 15} 60 `}
          strokeWidth={6}
          style={"stroke"}
          color={"#3E3F78"}
          strokeCap={"round"}
        />
      </Circle>
    </Canvas>
  );
}
