import { useState, useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UseStoredData = [string | null, (data: string) => void];

const useStoredData = (key: string, defaultValue: string): UseStoredData => {
  const [data, setData] = useState<string | null>(null);

  // fetch data from storage when the hook is initialized
  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(key);
        setData(storedData !== null ? storedData : defaultValue);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData("Error loading data");
      }
    };

    fetchData();
  }, [key, defaultValue]);

  /**
   * Save data to storage and update state
   *
   * @param newData
   */
  const saveData = async (data: string) => {
    try {
      await AsyncStorage.setItem(key, data);
      setData(data);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return [data, saveData];
};

export default useStoredData;
