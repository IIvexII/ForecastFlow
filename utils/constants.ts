import { ImageSourcePropType } from "react-native";

export const DEGREE_SYMBOL = "°";

export const MAX_AIR_QUALITY_INDEX = 5;
export const MIN_AIR_QUALITY_INDEX = 0;

export const AIR_QUALITY_BRIEFS: Readonly<Record<number, string>> = {
  1: "Good",
  2: "Moderate",
  3: "Unhealthy for Sensitive Groups",
  4: "Unhealthy",
  5: "Very Unhealthy",
  6: "Hazardous",
} as const;

export const DEFAULT_BRIEF = "Unknown Health Risk";

export const CONDITION_ICON_MAP: { [key: number]: ImageSourcePropType } = {
  1000: require("../assets/forecast/sunny.png"), // Sunny/Clear
  1003: require("../assets/forecast/cloudy_large.png"), // Partly cloudy
  1006: require("../assets/forecast/cloudy_large.png"), // Cloudy
  1009: require("../assets/forecast/cloudy_large.png"), // Overcast
  1030: require("../assets/forecast/cloudy_large.png"), // Mist (using cloudy as default)
  1063: require("../assets/forecast/rain.png"), // Patchy rain possible
  1066: require("../assets/forecast/rain.png"), // Patchy snow possible (using rain as default)
  1069: require("../assets/forecast/rain.png"), // Patchy sleet possible (using rain as default)
  1072: require("../assets/forecast/rain.png"), // Patchy freezing drizzle possible
  1087: require("../assets/forecast/tornado_large.png"), // Thundery outbreaks possible
  1114: require("../assets/forecast/wind_large.png"), // Blowing snow (using wind large as default)
  1117: require("../assets/forecast/wind_large.png"), // Blizzard (using wind large as default)
  1135: require("../assets/forecast/cloudy_large.png"), // Fog (using cloudy as default)
  1147: require("../assets/forecast/cloudy_large.png"), // Freezing fog (using cloudy as default)
  1150: require("../assets/forecast/rain.png"), // Patchy light drizzle
  1153: require("../assets/forecast/rain.png"), // Light drizzle
  1168: require("../assets/forecast/rain.png"), // Freezing drizzle
  1171: require("../assets/forecast/rain.png"), // Heavy freezing drizzle
  1180: require("../assets/forecast/rain.png"), // Patchy light rain
  1183: require("../assets/forecast/rain.png"), // Light rain
  1186: require("../assets/forecast/rain_large.png"), // Moderate rain at times
  1189: require("../assets/forecast/rain_large.png"), // Moderate rain
  1192: require("../assets/forecast/rain_large.png"), // Heavy rain at times
  1195: require("../assets/forecast/rain_large.png"), // Heavy rain
  1198: require("../assets/forecast/rain.png"), // Light freezing rain
  1201: require("../assets/forecast/rain.png"), // Moderate or heavy freezing rain
  1204: require("../assets/forecast/rain.png"), // Light sleet
  1207: require("../assets/forecast/rain.png"), // Moderate or heavy sleet
  1210: require("../assets/forecast/rain.png"), // Patchy light snow
  1213: require("../assets/forecast/rain.png"), // Light snow
  1216: require("../assets/forecast/rain.png"), // Patchy moderate snow
  1219: require("../assets/forecast/rain.png"), // Moderate snow
  1222: require("../assets/forecast/rain.png"), // Patchy heavy snow
  1225: require("../assets/forecast/rain.png"), // Heavy snow
  1237: require("../assets/forecast/rain.png"), // Ice pellets
  1240: require("../assets/forecast/rain.png"), // Light rain shower
  1243: require("../assets/forecast/rain_large.png"), // Moderate or heavy rain shower
  1246: require("../assets/forecast/rain_large.png"), // Torrential rain shower
  1249: require("../assets/forecast/rain.png"), // Light sleet showers
  1252: require("../assets/forecast/rain.png"), // Moderate or heavy sleet showers
  1255: require("../assets/forecast/rain.png"), // Light snow showers
  1258: require("../assets/forecast/rain.png"), // Moderate or heavy snow showers
  1261: require("../assets/forecast/rain.png"), // Light showers of ice pellets
  1264: require("../assets/forecast/rain.png"), // Moderate or heavy showers of ice pellets
  1273: require("../assets/forecast/sun_rain.png"), // Patchy light rain with thunder
  1276: require("../assets/forecast/tornado_large.png"), // Moderate or heavy rain with thunder
  1279: require("../assets/forecast/sun_rain.png"), // Patchy light snow with thunder
  1282: require("../assets/forecast/tornado_large.png"), // Moderate or heavy snow with thunder
};
