import React from "react";
import { View, LayoutChangeEvent } from "react-native";
import { Canvas, FitBox, Path, rect } from "@shopify/react-native-skia";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Widget from "./base/Widget";

const PressureWidget: React.FC = () => {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  const handleLayout = React.useCallback((event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
    setHeight(event.nativeEvent.layout.height);
  }, []);

  return (
    <View onLayout={handleLayout} style={{ position: "relative", width: "50%" }}>
      <Widget>
        <Widget.Header icon={<FontAwesome name="snowflake-o" size={24} color="black" />} title="Pressure" />
        <Widget.Body>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Canvas
              style={{
                marginTop: height / 2,
                height: height / 2,
                width: width,
              }}
            >
              <FitBox src={rect(0, 0, 100, 100)} dst={rect(0, 0, width, height / 2)}>
                <Path
                  color={"white"}
                  path={
                    "M44 8.375a1 1 0 0 0 1-1V1.333a1 1 0 0 0-2 0v6.042a1 1 0 0 0 1 1zM24.822 12.781a1 1 0 1 0 1.732-1l-3.021-5.232a1 1 0 1 0-1.732 1l3.021 5.232zM6.552 23.53l5.232 3.021a.997.997 0 0 0 1.366-.366 1 1 0 0 0-.366-1.366l-5.232-3.021a1 1 0 1 0-1 1.732zM7.378 44.995a1 1 0 0 0 0-2l-6.043.001a1 1 0 0 0 0 2l6.043-.001zM13.149 61.805a.998.998 0 0 0-1.366-.366l-5.234 3.022a1 1 0 1 0 1 1.732l5.234-3.022a1 1 0 0 0 .366-1.366zM26.187 74.843a1 1 0 0 0-1.366.366l-3.022 5.235a1 1 0 0 0 1.732 1l3.022-5.235a1 1 0 0 0-.366-1.366zM43.996 79.617a1 1 0 0 0-1 1l.001 6.045a1 1 0 1 0 2 0l-.001-6.045a1 1 0 0 0-1-1zM63.172 75.211a.999.999 0 1 0-1.732 1l3.025 5.235a1 1 0 1 0 1.732-1l-3.025-5.235zM81.448 64.463l-5.238-3.021a1 1 0 1 0-1 1.732l5.238 3.021a1 1 0 0 0 1-1.732zM86.664 42.997L80.616 43a1 1 0 0 0 .001 1.999h.001l6.047-.003a1 1 0 0 0-.001-1.999zM74.849 26.191a1 1 0 0 0 1.366.366l5.234-3.026a.998.998 0 0 0 .364-1.366.998.998 0 0 0-1.366-.365l-5.234 3.026a.997.997 0 0 0-.364 1.365zM61.812 13.152a.998.998 0 0 0 1.366-.366l3.021-5.238a1 1 0 1 0-1.732-.999l-3.021 5.238a.997.997 0 0 0 .366 1.365z"
                  }
                />
              </FitBox>
            </Canvas>
          </View>
        </Widget.Body>
      </Widget>
    </View>
  );
};

export default React.memo(PressureWidget);
