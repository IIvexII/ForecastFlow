import React, { useCallback } from "react";
import { LayoutChangeEvent } from "react-native";

/**
 * Hook to get the layout dimensions of a component
 *
 * @returns  width, height, handleLayout
 *
 * @example
 * const MyComponent = () => {
 *   const { width, height, handleLayout } = useLayoutDimensions();
 *
 *   return (
 *     <View onLayout={handleLayout}>
 *       <Text>Width: {width}</Text>
 *       <Text>Height: {height}</Text>
 *     </View>
 *   );
 * };
 */
export const useLayoutDimensions = () => {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
    setHeight(event.nativeEvent.layout.height);
  }, []);

  return { width, height, handleLayout };
};
