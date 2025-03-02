import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistedClient, Persister } from "@tanstack/react-query-persist-client";

// key for AsyncStorage
const CACHE_KEY = "react-query-cache";

const asyncStoragePersister: Persister = {
  // save the client state to AsyncStorage
  persistClient: async (client: PersistedClient) => {
    try {
      // ensure dates are properly serialized
      const serialized = JSON.stringify(client, (key, value) => {
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      });
      await AsyncStorage.setItem(CACHE_KEY, serialized);
    } catch (error) {
      console.error("Error persisting client:", error);
    }
  },

  // retrieve the client state from AsyncStorage
  restoreClient: async () => {
    try {
      const serialized = await AsyncStorage.getItem(CACHE_KEY);
      if (serialized) {
        // parse dates back to Date objects
        return JSON.parse(serialized, (key, value) => {
          if (typeof value === "string" && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
            return new Date(value);
          }
          return value;
        });
      }
    } catch (error) {
      console.error("Error restoring client:", error);
    }
    return undefined;
  },

  // remove the client state from AsyncStorage
  removeClient: async () => {
    try {
      await AsyncStorage.removeItem(CACHE_KEY);
    } catch (error) {
      console.error("Error removing client:", error);
    }
  },
};

export default asyncStoragePersister;
