import React, { useMemo, useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useAnimatedReaction, useSharedValue } from "react-native-reanimated";
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";

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

const ForecastSheet: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const [forecastType, setForecastType] = useState<ForecastType>(ForecastType.Hourly);

  // bottom Sheet Configs
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
      handleIndicatorStyle={styles.handleIndicator}
      containerStyle={styles.container}
      backgroundComponent={() => (
        <ForecastSheetBackground width={width} height={firstSnapPoint} cornerRadius={cornerRadius} />
      )}
    >
      <BottomSheetView style={styles.bottomSheetView}>
        <View>
          <ForecastControls selected={forecastType} onChange={setForecastType} />
          <Seperator height={5} width={width} />
          <ForecastCapsuleList type={ForecastType.Hourly} forecasts={hourly} />
          {/* <ForecastCapsuleList type={ForecastType.Weekly} forecasts={weekly} /> */}
        </View>

        <ScrollView scrollEnabled contentContainerStyle={styles.scrollViewContent}>
          <AirQualityWidget airQualityIndex={100} />
          <View style={styles.row}>
            <UVIndexWidget uvIndex={2} />
            <RainfallWidget currentRainfall={1.6} forecastRainfall={1.8} />
          </View>
          <View style={styles.row}>
            <FeelsLikeWidget feelsLikeTemp={19} />
            <HumidityWidget humidity={90} dewPoint={17} />
          </View>
          <View style={styles.row}>
            <PressureWidget />
            <VisibilityWidget visibility={10} />
          </View>
        </ScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  handleIndicator: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  container: {
    zIndex: 1,
  },
  bottomSheetView: {
    flex: 1,
  },
  scrollViewContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  row: {
    // flex: 1,
    flexDirection: "row",
    gap: 5,
  },
});

export default ForecastSheet;
