import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  keyIcon: {
    paddingLeft: scale(13),
  },
  label: {
    color: themes.LightGray6,
    fontSize: scale(14),
  },
  inputStyle: {
    fontSize: scale(themes.NormalFontSize),
    width: "80%",
    height: scale(50),
    borderRadius: scale(8),
    paddingLeft: scale(8),
    paddingRight: scale(8),
    color: themes.gray20,
  },
  textField: {
    marginTop: scale(5),
    backgroundColor: themes.White,
    opacity: 0.8,
    borderRadius: scale(8),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  showPassword: {
    marginRight: scale(10),
  },
});

export default styles;
