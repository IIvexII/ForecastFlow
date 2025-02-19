import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { LayoutChangeEvent, View } from "react-native";

import Widget from "./base/Widget";
import Progressbar from "./base/Progressbar";

import { getAQIBrief } from "../../utils/weather";
import { MAX_AIR_QUALITY_INDEX } from "../../utils/constants";

type AirQualityWidgetProps = {
  airQualityIndex: number;
};

const AirQualityWidget: React.FC<AirQualityWidgetProps> = ({ airQualityIndex }) => {
  const [widgetWidth, setWidgetWidth] = React.useState(150);

  const qualityBrief = getAQIBrief(airQualityIndex);

  // handle layout measurement for progress bar
  const handleLayout = (event: LayoutChangeEvent) => {
    setWidgetWidth(event.nativeEvent.layout.width);
  };

  return (
    <View onLayout={handleLayout} style={{ position: "relative" }}>
      <Widget>
        <Widget.Header icon={<Entypo name="air" />} title="Air Quality Index" />
        <Widget.Body contentText={`${airQualityIndex} - ${qualityBrief}`}>
          <Progressbar width={widgetWidth} progress={airQualityIndex} total={MAX_AIR_QUALITY_INDEX} />
        </Widget.Body>
      </Widget>
    </View>
  );
};

export default React.memo(AirQualityWidget);
