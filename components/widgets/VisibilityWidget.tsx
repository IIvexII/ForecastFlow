import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { View, Text } from "react-native";

import Widget from "./base/Widget";

type VisibilityWidgetProps = {
  visibility: number;
};

const VisibilityWidget: React.FC<VisibilityWidgetProps> = ({ visibility }) => {
  const getVisibilityMessage = (vis: number): string => {
    if (vis >= 10) return "Excellent Visibility";
    if (vis >= 5) return "Good Visibility";
    if (vis >= 2) return "Moderate Visibility";
    return "Poor Visibility";
  };

  return (
    <View style={{ position: "relative", width: "50%" }}>
      <Widget>
        <Widget.Header icon={<Feather name="eye" />} title="Visibility" />
        <Widget.Body>
          <View style={{ justifyContent: "space-between", height: 85 }}>
            <Text style={{ color: "white", fontFamily: "SF-Semibold", fontSize: 40, lineHeight: 40 }}>
              {visibility}km
            </Text>
            <Text style={{ color: "#B2D3FF", fontFamily: "SF-Regular", fontSize: 16, lineHeight: 16 }}>
              {getVisibilityMessage(visibility)}
            </Text>
          </View>
        </Widget.Body>
      </Widget>
    </View>
  );
};

export default React.memo(VisibilityWidget);
