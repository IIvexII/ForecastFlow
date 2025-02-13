import React from "react";
import { Canvas, LinearGradient, Path, vec } from "@shopify/react-native-skia";

type ArchComponentProps = {
  width: number;
  height: number;
};

export default function ArcComponent({ width, height }: ArchComponentProps) {
  const archPath = `M 0 0 Q ${width / 2} ${height / 2} ${width} 0 L ${width} ${height} L 0 ${height} Z`;
  const archBorder = `M 0 0 Q ${width / 2} ${height / 2} ${width} 0`;

  return (
    <Canvas style={{ width: width, height: height }}>
      <Path path={archPath}>
        <LinearGradient
          start={vec(width / 2, 0)}
          end={vec(width / 2, height)}
          colors={["rgba(58, 58, 103, 1)", "rgba(37, 36, 76, 0.4)"]}
        />
      </Path>
      <Path
        path={archBorder}
        style={"stroke"}
        strokeWidth={0.5}
        color={"rgba(117, 130, 244, 0.5)"}
      />
    </Canvas>
  );
}
