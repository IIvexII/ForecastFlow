import { useCallback } from "react";
import React, { useMemo, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { useAnimatedReaction, useSharedValue } from "react-native-reanimated";

// components
import ForecastControls from "./elements/ForecastControls";
import ForecastSheetBackground from "./ForecastSheetBackground";

// Widgets
import UVIndexWidget from "../widgets/UVIndexWidget";
import RainfallWidget from "../widgets/RainfallWidget";
import HumidityWidget from "../widgets/HumidityWidget";
import PressureWidget from "../widgets/PressureWidget";
import FeelsLikeWidget from "../widgets/FeelsLikeWidget";
import AirQualityWidget from "../widgets/AirQualityWidget";
import VisibilityWidget from "../widgets/VisibilityWidget";

// miscs
import { normalizePostion } from "../../utils/helpers";
import { useWeather } from "../../context/WeatherContext";
import { useBottomSheetPosition } from "../../context/BottomSheetPosition";

const ForecastSheet: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const {
    weatherData: { current, hourly },
  } = useWeather();

  // bottom Sheet Configs
  const snapPoints = useMemo(() => [height * 0.4, height * 0.8], [height]);
  const cornerRadius = 44;

  // animation
  const currentPosition = useSharedValue(0);
  const animatedPosition = useBottomSheetPosition();
  const minValue = useMemo(() => (height - snapPoints[0]) * 0.978, [height, snapPoints]);
  const maxValue = useMemo(() => (height - snapPoints[1]) * 0.978, [height, snapPoints]);

  useEffect(() => {
    if (height > 0) {
      currentPosition.value = height - snapPoints[0];
    }
  }, [height, snapPoints]);

  const handleSheetChange = useCallback(
    (index: number) => {
      "worklet";
      if (index === -1) {
        currentPosition.value = height;
      }
    },
    [height]
  );

  useAnimatedReaction(
    () => currentPosition.value,
    (value) => {
      const position = normalizePostion(minValue, maxValue, value);
      animatedPosition.value = position;
    },
    [minValue, maxValue]
  );

  if (!current || !hourly) return null;

  return (
    <BottomSheet
      snapPoints={snapPoints}
      animatedPosition={currentPosition}
      index={0}
      onChange={handleSheetChange}
      enablePanDownToClose={false}
      handleIndicatorStyle={styles.handleIndicator}
      containerStyle={[styles.container]}
      backgroundComponent={() => (
        <ForecastSheetBackground width={width} height={snapPoints[0]} cornerRadius={cornerRadius} />
      )}
    >
      <BottomSheetView style={[styles.flex1, { maxHeight: snapPoints[1] - 20 }]}>
        <View>
          <ForecastControls />
        </View>

        <ScrollView scrollEnabled style={styles.flex1} contentContainerStyle={styles.scrollViewContent}>
          <AirQualityWidget airQualityIndex={current?.airQualiy || 0} />
          <View style={styles.row}>
            <UVIndexWidget uvIndex={current?.uv || 0} />
            <RainfallWidget
              currentRainfall={current?.rainfall || 0}
              forecastRainfall={hourly?.[23].rainfall || 0}
            />
          </View>
          <View style={styles.row}>
            <FeelsLikeWidget feelsLikeTemp={current?.feelsLike || 0} />
            <HumidityWidget humidity={current?.humidity || 0} dewPoint={current?.dewpoint || 0} />
          </View>
          <View style={styles.row}>
            <PressureWidget />
            <VisibilityWidget visibility={current?.visibility || 0} />
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
  flex1: {
    flex: 1,
  },

  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  row: {
    flexDirection: "row",
    gap: 5,
  },
});

export default ForecastSheet;
