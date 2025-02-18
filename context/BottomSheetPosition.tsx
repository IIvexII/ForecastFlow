import React, { createContext, useContext, ReactNode } from "react";
import { SharedValue, useSharedValue } from "react-native-reanimated";

// Create the context
const BottomSheetPositionContext = createContext<SharedValue<number> | undefined>(undefined);

// Create the provider component
export const BottomSheetPositionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const animationPostion = useSharedValue(0);

  return (
    <BottomSheetPositionContext.Provider value={animationPostion}>
      {children}
    </BottomSheetPositionContext.Provider>
  );
};

// Create a hook to use the BottomSheetPositionContext
export const useBottomSheetPosition = () => {
  const context = useContext(BottomSheetPositionContext);
  if (context === undefined) {
    throw new Error("useBottomSheetPosition must be used within a BottomSheetPositionProvider");
  }
  return context;
};
