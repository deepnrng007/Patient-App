import React from "react";

export type AppTextProps = {
  style: any;
  children: string | React.ReactNode;
  adjustsFontSizeToFit: boolean;
  numberOfLines?: number;
  allowFontScaling?: boolean;
  otherProps?: any;
  searchKeywords?: any[];
  highlightStyle?: any;
  testID?: string;
  onPress?: any;
};
