import { Forecast, Weather } from "../models/Weather";
import React, { createContext, useContext, ReactNode, useState } from "react";

type WeatherData = {
  current?: Weather;
  hourly?: Forecast[];
  weekly?: Forecast[];
};

// Define the context type
type WeatherContextType = {
  weatherData: WeatherData;
  setWeatherData: (data: WeatherData) => void;
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

// Create the provider component
type WeatherProviderProps = {
  children: ReactNode;
};

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<WeatherData>({});
  const [isLoading, setIsLoading] = useState(false);

  return (
    <WeatherContext.Provider value={{ weatherData, setWeatherData, isLoading, setIsLoading }}>
      {children}
    </WeatherContext.Provider>
  );
};

// Create the custom hook
export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
