import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../services/weatherService";

export function useWeatherQuery(city: string) {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeather(city),
    enabled: Boolean(city),
  });
}
