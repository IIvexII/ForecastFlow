import React, { useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useWindowDimensions, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ForecastSheetBackground from "./ForecastSheetBackground";

import Seperator from "./elements/Seperator";
import ForecastControls from "./elements/ForecastControls";
import { hourly, weekly } from "../../data/ForecastData";
import ForecastCapsuleList from "./elements/ForecastCapsuleList";
import { ForecastType } from "../../models/Weather";
import AirQualityWidget from "../widgets/AirQualityWidget";
import UVIndexWidget from "../widgets/UVIndexWidget";
import FeelsLikeWidget from "../widgets/FeelsLikeWidget";
import RainfallWidget from "../widgets/RainfallWidget";
import HumidityWidget from "../widgets/HumidityWidget";
import PressureWidget from "../widgets/PressureWidget";
import VisibilityWidget from "../widgets/VisibilityWidget";

export default function ForecastSheet() {
  const { width, height } = useWindowDimensions();
  const [forecastType, setForecastType] = useState<ForecastType>(ForecastType.Hourly);

  // Bottom Sheet Configs
  const snapPoints = ["40%", "90%"];
  const firstSnapPoint = height * (parseFloat(snapPoints[0]) / 100);
  const cornerRadius = 44;

  // forecast data
  const forecasts = forecastType === ForecastType.Hourly ? hourly : weekly;
  return (
    <BottomSheet
      snapPoints={snapPoints}
      index={0}
      handleIndicatorStyle={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      containerStyle={{ zIndex: 1 }}
      backgroundComponent={() => (
        <ForecastSheetBackground width={width} height={firstSnapPoint} cornerRadius={cornerRadius} />
      )}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <View>
          <ForecastControls selected={forecastType} onChange={setForecastType} />
          <Seperator height={5} width={width} />
          <ForecastCapsuleList type={forecastType} forecasts={forecasts} />
        </View>

        <ScrollView
          scrollEnabled
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingBottom: 140 }}
        >
          <AirQualityWidget airQualityIndex={400} />
          <View style={{ flex: 1, flexDirection: "row", gap: 5 }}>
            <UVIndexWidget />
            <RainfallWidget />
          </View>
          <View style={{ flex: 1, flexDirection: "row", gap: 5 }}>
            <FeelsLikeWidget />
            <HumidityWidget />
          </View>
          <View style={{ flex: 1, flexDirection: "row", gap: 5 }}>
            <PressureWidget />
            <VisibilityWidget />
          </View>
        </ScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
}
