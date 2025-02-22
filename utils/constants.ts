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
  1000: require("../assets/forecast/cloudy_large.png"),
  1003: require("../assets/forecast/cloudy_large.png"),
  1006: require("../assets/forecast/cloudy_large.png"),
  1009: require("../assets/forecast/cloudy_large.png"),
  1030: require("../assets/forecast/cloudy_large.png"),
  1063: require("../assets/forecast/rain.png"),
  1066: require("../assets/forecast/rain.png"),
  1069: require("../assets/forecast/rain.png"),
  1072: require("../assets/forecast/rain.png"),
  1087: require("../assets/forecast/tornado_large.png"),
  1114: require("../assets/forecast/wind_large.png"),
  1117: require("../assets/forecast/wind_large.png"),
  1135: require("../assets/forecast/cloudy_large.png"),
  1147: require("../assets/forecast/cloudy_large.png"),
  1150: require("../assets/forecast/rain.png"),
  1153: require("../assets/forecast/rain.png"),
  1168: require("../assets/forecast/rain.png"),
  1171: require("../assets/forecast/rain.png"),
  1180: require("../assets/forecast/rain.png"),
  1183: require("../assets/forecast/rain.png"),
  1186: require("../assets/forecast/rain_large.png"),
  1189: require("../assets/forecast/rain_large.png"),
  1192: require("../assets/forecast/rain_large.png"),
  1195: require("../assets/forecast/rain_large.png"),
  1198: require("../assets/forecast/rain.png"),
  1201: require("../assets/forecast/rain.png"),
  1204: require("../assets/forecast/rain.png"),
  1207: require("../assets/forecast/rain.png"),
  1210: require("../assets/forecast/rain.png"),
  1213: require("../assets/forecast/rain.png"),
  1216: require("../assets/forecast/rain.png"),
  1219: require("../assets/forecast/rain.png"),
  1222: require("../assets/forecast/rain.png"),
  1225: require("../assets/forecast/rain.png"),
  1237: require("../assets/forecast/rain.png"),
  1240: require("../assets/forecast/rain.png"),
  1243: require("../assets/forecast/rain_large.png"),
  1246: require("../assets/forecast/rain_large.png"),
  1249: require("../assets/forecast/rain.png"),
  1252: require("../assets/forecast/rain.png"),
  1255: require("../assets/forecast/rain.png"),
  1258: require("../assets/forecast/rain.png"),
  1261: require("../assets/forecast/rain.png"),
  1264: require("../assets/forecast/rain.png"),
  1273: require("../assets/forecast/sun_rain.png"),
  1276: require("../assets/forecast/tornado_large.png"),
  1279: require("../assets/forecast/sun_rain.png"),
  1282: require("../assets/forecast/tornado_large.png"),
};
