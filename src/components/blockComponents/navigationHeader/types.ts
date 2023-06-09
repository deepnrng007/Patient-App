import { ViewStyle } from "react-native";

export type props = {
  navigationTitle: string | undefined;
  isFilterRequired?: boolean;
  onPressFilterIcon?: () => void;
  isFilterApplied?: boolean;
  RightIcon?: any;
  style?: ViewStyle;
  isBackToAllConvoScreen?: boolean;
  isBackRequired?: boolean;
  customGoBack?: string | null;
};
