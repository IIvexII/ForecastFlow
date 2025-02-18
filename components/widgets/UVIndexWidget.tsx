import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { View, Text, LayoutChangeEvent } from "react-native";

import Widget from "./base/Widget";
import Progressbar from "./base/Progressbar";

export default function UVIndexWidget() {
  const [widgetWidth, setWidgetWidth] = React.useState(150);

  // handle layout measurement for progress bar
  const handleLayout = (event: LayoutChangeEvent) => {
    setWidgetWidth(event.nativeEvent.layout.width);
  };

  return (
    <View onLayout={handleLayout} style={{ position: "relative", width: "50%" }}>
      <Widget>
        <Widget.Header icon={<Feather name="sun" />} title="UV Index" />
        <Widget.Body>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ color: "white", fontFamily: "SF-Semibold", fontSize: 22, lineHeight: 26 }}>4</Text>
            <Text style={{ color: "#ECECEC", fontFamily: "SF-Semibold", fontSize: 22, lineHeight: 30 }}>
              Moderate
            </Text>
          </View>
          <Progressbar width={widgetWidth} progress={4} total={10} />
        </Widget.Body>
      </Widget>
    </View>
  );
}
