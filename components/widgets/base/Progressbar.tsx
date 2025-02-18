import React from "react";
import { Canvas, Circle, LinearGradient, Path, vec } from "@shopify/react-native-skia";

type ProgressbarProps = {
  width: number;
  progress: number;
  total: number;
};

export default function Progressbar(props: ProgressbarProps) {
  const radiusOfHandle = 6;
  const lineWidth = props.width - 35;
  const progress = props.progress > props.total ? props.total : props.progress;

  let lineHandlePosition = lineWidth * (progress / props.total);
  if (lineHandlePosition < radiusOfHandle) lineHandlePosition = radiusOfHandle;

  return (
    <Canvas style={{ height: 20 }}>
      <Path path={`M 5 6 L ${lineWidth} 6`} strokeWidth={6} style={"stroke"} strokeCap={"round"}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(props.width, 0)}
          colors={["#0080FF", "#FF379B"]}
          positions={[-0.4, 0.8]}
        />
      </Path>
      {/* Handle */}
      <Circle cx={lineHandlePosition} cy={6} r={radiusOfHandle} color={"#FFFF"} />
    </Canvas>
  );
}
