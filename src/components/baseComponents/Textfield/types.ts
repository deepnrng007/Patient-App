import { KeyboardTypeOptions } from "react-native";

export type TextFieldProps = {
  onChange?: any;
  title: string;
  hintText: string;
  keyboardType?: KeyboardTypeOptions;
  value: string;
  isPassword?: boolean;
  showTooltip?: any;
  editable?: boolean;
  Icon?: any;
  style?: any;
};
