import React from "react";
import { Pressable, useWindowDimensions } from "react-native";
import {
  Canvas,
  Circle,
  LinearGradient,
  Path,
  Shadow,
  vec,
} from "@shopify/react-native-skia";

export default function CircleButton() {
  const { width } = useWindowDimensions();

  const TrapozoidLocation = 42;
  const TrapozoidHeight = 124;

  return (
    <Pressable
      className="absolute top-0"
      style={{ left: width / 2 - 30, top: 12 }}
      onPress={() => console.log("Pressed")}
    >
      <Canvas style={{ width: 85, height: 85 }}>
        <Circle cx={42} cy={42} r={40} style={"fill"}>
          <LinearGradient
            start={vec(width / 2, 0)}
            end={vec(width / 2, TrapozoidHeight)}
            colors={["#F5F5F9", "#DADFE7"]}
          />
          <Shadow blur={2} color={"#FFFF"} dx={0} dy={0} />
        </Circle>
        <Path
          path={`M${TrapozoidLocation} 30 L${TrapozoidLocation} 60 `}
          strokeWidth={6}
          style={"stroke"}
          color={"#3E3F78"}
          strokeCap={"round"}
        />
        <Path
          path={`M${TrapozoidLocation - 15} 45 L${TrapozoidLocation + 15} 45 `}
          strokeWidth={6}
          style={"stroke"}
          color={"#3E3F78"}
          strokeCap={"round"}
        />
      </Canvas>
    </Pressable>
  );
}
