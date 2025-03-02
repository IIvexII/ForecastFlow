import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { View, Text, LayoutChangeEvent } from "react-native";

import Widget from "./base/Widget";
import Progressbar from "./base/Progressbar";

type UVIndexWidgetProps = {
  uvIndex: number;
};

const UVIndexWidget: React.FC<UVIndexWidgetProps> = ({ uvIndex }) => {
  const [widgetWidth, setWidgetWidth] = React.useState(150);

  // handle layout measurement for progress bar
  const handleLayout = (event: LayoutChangeEvent) => {
    setWidgetWidth(event.nativeEvent.layout.width);
  };

  const getUVLevel = (index: number) => {
    if (index < 0) return "Unknown";
    if (index <= 2) return "Low";
    if (index <= 5) return "Moderate";
    if (index <= 7) return "High";
    if (index <= 10) return "Very High";
    return "Extreme";
  };

  return (
    <View onLayout={handleLayout} style={{ position: "relative", width: "50%" }}>
      <Widget>
        <Widget.Header icon={<Feather name="sun" />} title="UV Index" />
        <Widget.Body>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ color: "white", fontFamily: "SF-Semibold", fontSize: 22, lineHeight: 26 }}>
              {uvIndex < 0 ? "-" : uvIndex}
            </Text>
            <Text style={{ color: "#ECECEC", fontFamily: "SF-Semibold", fontSize: 22, lineHeight: 30 }}>
              {getUVLevel(uvIndex)}
            </Text>
          </View>
          <Progressbar width={widgetWidth} progress={uvIndex} total={10} />
        </Widget.Body>
      </Widget>
    </View>
  );
};

export default React.memo(UVIndexWidget);
