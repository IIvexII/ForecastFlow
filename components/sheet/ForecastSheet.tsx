import React, { useMemo, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useWindowDimensions, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useAnimatedReaction, useSharedValue } from "react-native-reanimated";

// components
import Seperator from "./elements/Seperator";
import ForecastControls from "./elements/ForecastControls";
import ForecastSheetBackground from "./ForecastSheetBackground";
import ForecastCapsuleList from "./elements/ForecastCapsuleList";

// Widgets
import UVIndexWidget from "../widgets/UVIndexWidget";
import RainfallWidget from "../widgets/RainfallWidget";
import HumidityWidget from "../widgets/HumidityWidget";
import PressureWidget from "../widgets/PressureWidget";
import FeelsLikeWidget from "../widgets/FeelsLikeWidget";
import AirQualityWidget from "../widgets/AirQualityWidget";
import VisibilityWidget from "../widgets/VisibilityWidget";

// miscs
import { ForecastType } from "../../models/Weather";
import { hourly, weekly } from "../../data/ForecastData";
import { normalizePostion } from "../../utils/helpers";
import { useBottomSheetPosition } from "../../context/BottomSheetPosition";

export default function ForecastSheet() {
  const { width, height } = useWindowDimensions();
  const [forecastType, setForecastType] = useState<ForecastType>(ForecastType.Hourly);

  // Bottom Sheet Configs
  const snapPoints = ["40%", "80%"];
  const firstSnapPoint = height * (parseFloat(snapPoints[0]) / 100);
  const secondSnapPoint = height * (parseFloat(snapPoints[1]) / 100);
  const cornerRadius = 44;

  // forecast data
  const forecasts = forecastType === ForecastType.Hourly ? hourly : weekly;

  // animation
  const currentPosition = useSharedValue(0);
  const animatedPosition = useBottomSheetPosition(); // change value in context
  const minValue = useMemo(() => (height - firstSnapPoint) * 0.978, [height]);
  const maxValue = useMemo(() => (height - secondSnapPoint) * 0.978, [height]);

  useAnimatedReaction(
    () => currentPosition.value,
    (value) => {
      const position = normalizePostion(minValue, maxValue, value);

      // update value in context
      animatedPosition.value = position;
    },
  );

  return (
    <BottomSheet
      snapPoints={snapPoints}
      animatedPosition={currentPosition}
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
