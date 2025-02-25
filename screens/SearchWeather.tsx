import React, { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { Canvas, LinearGradient, RoundedRect, Shadow, vec } from "@shopify/react-native-skia";

import Header from "../components/Header";
import WeatherWidget from "../components/widgets/WeatherWidget";
import GradientBackground from "../components/GradientBackground";
import useDebounce from "../hooks/useDebounce";
import { fetchWeather, searchWeather } from "../services/weatherService";
import { Forecast } from "../models/Weather";

const SearchWeather = () => {
  const { width } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = React.useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const [forecasts, setForecasts] = React.useState<Forecast[]>();
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    const fetchAsync = async (query: string) => {
      setIsLoading(true);
      const forecasts = await searchWeather(query);
      setForecasts(forecasts);
      setIsLoading(false);
    };

    if (debouncedSearchQuery) {
      fetchAsync(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery]);

  return (
    <View style={styles.container}>
      {/* its an absolute background so, will not affect the styling of others */}
      <GradientBackground />

      <Header title="Weather" />

      {/* search bar */}
      <View style={[styles.searchBarContainer]}>
        {/* Backgound Gradient */}
        <Canvas style={[styles.container, styles.searchBarBackground]}>
          <RoundedRect x={0} y={0} width={width - 40} height={40} r={30}>
            <LinearGradient
              start={vec(0, 0)}
              end={vec(width, 40)}
              colors={["rgba(40, 51, 90, 0.26)", "rgba(28, 27,51, 0.26)"]}
            />
            <Shadow dx={6} dy={6} blur={2} color="rgba(0, 0, 0, 1)" inner />
          </RoundedRect>
        </Canvas>

        {/* Search Input */}
        <View style={[styles.searchInputContainer]}>
          <Ionicons name="search" size={24} color="white" style={[styles.searchIcon]} />
          <TextInput
            placeholder="Search for a city"
            placeholderTextColor="#BFBFBF"
            value={searchQuery}
            maxLength={168}
            onChange={(e) => setSearchQuery(e.nativeEvent.text)}
            style={[styles.searchInput]}
          />
        </View>
      </View>
      {isLoading && (
        <ActivityIndicator size={"large"} color="white" animating={isLoading} style={{ flex: 1 }} />
      )}
      {!isLoading && forecasts && forecasts.length > 0 && (
        <FlatList
          style={{ paddingTop: 22, paddingHorizontal: 20 }}
          contentContainerStyle={{ gap: 40, paddingBottom: 60 }}
          data={forecasts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <WeatherWidget width={width} forecast={item} />}
        />
      )}
      {!isLoading &&
        (forecasts === undefined || forecasts?.length === 0) &&
        debouncedSearchQuery.length === 0 && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ alignItems: "center", marginTop: -80 }}>
              <Ionicons name="search-outline" size={100} color="#C8C8C8" />
              <Text
                style={{
                  color: "#C8C8C8",
                  fontFamily: "SF-Regular",
                  fontSize: 18,
                  lineHeight: 30,
                  textAlign: "center",
                  width: 250,
                }}
              >
                Start by typing a city name to check the weather!
              </Text>
            </View>
          </View>
        )}

      {!isLoading && debouncedSearchQuery.length > 0 && forecasts?.length === 0 && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ alignItems: "center", marginTop: -80 }}>
            <Ionicons name="search-outline" size={100} color="#C8C8C8" />
            <Text
              style={{
                color: "#C8C8C8",
                fontFamily: "SF-Regular",
                fontSize: 18,
                lineHeight: 30,
                textAlign: "center",
                width: 250,
              }}
            >
              No results found for "{debouncedSearchQuery}"
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    position: "relative",
    marginTop: 20,
    paddingBottom: 20,
  },
  searchBarBackground: {
    ...StyleSheet.absoluteFillObject,
    marginHorizontal: 20,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 40,
    marginHorizontal: 20,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 45,
    paddingRight: 20,
    color: "white",
  },
  searchIcon: {
    position: "absolute",
    left: 10,
  },
});

export default React.memo(SearchWeather);
