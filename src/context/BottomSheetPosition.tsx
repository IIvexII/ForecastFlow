import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { SharedValue, useSharedValue } from "react-native-reanimated";

const BottomSheetPositionContext = createContext<SharedValue<number> | undefined>(undefined);

export const BottomSheetPositionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const animationPosition = useSharedValue(0);

  useEffect(() => {
    // ensure initial value is set
    animationPosition.value = 0;
  }, []);

  return (
    <BottomSheetPositionContext.Provider value={animationPosition}>
      {children}
    </BottomSheetPositionContext.Provider>
  );
};

export const useBottomSheetPosition = () => {
  const context = useContext(BottomSheetPositionContext);
  if (context === undefined) {
    throw new Error("useBottomSheetPosition must be used within a BottomSheetPositionProvider");
  }
  return context;
};
