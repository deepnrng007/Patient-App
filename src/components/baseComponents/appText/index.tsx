import { Text, ViewStyle } from "react-native";
import React from "react";
import { AppTextProps } from "./types";
import styles from "./styles";
import HighlightText from "@sanar/react-native-highlight-text";
import { themes } from "../../../enums";

const AppText = ({
  style,
  children,
  adjustsFontSizeToFit,
  numberOfLines,
  allowFontScaling,
  searchKeywords,
  highlightStyle,
  testID,
  onPress,
  ...otherProps
}: AppTextProps) => {
  return searchKeywords ? (
    <HighlightText
      onPress={onPress}
      accessibilityLabel={testID}
      testID={testID}
      style={[styles.defaultStyle, style] as ViewStyle}
      numberOfLines={numberOfLines}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      allowFontScaling={allowFontScaling}
      highlightStyle={
        [
          { color: themes.green, fontWeight: "bold" },
          highlightStyle,
        ] as ViewStyle
      }
      {...otherProps}
    />
  ) : (
    <Text
      onPress={onPress}
      accessibilityLabel={testID}
      testID={testID}
      numberOfLines={numberOfLines}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      allowFontScaling={allowFontScaling}
      style={[styles.defaultStyle, style]}
      {...otherProps}
    >
      {children}
    </Text>
  );
};

export default AppText;

AppText.defaultProps = {
  adjustsFontSizeToFit: false,
  allowFontScaling: false,
  style: {},
};
