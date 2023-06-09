import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  label: {
    color: themes.Black1,
    fontSize: scale(themes.MediumFontSize),
    marginTop: scale(8),
    fontWeight: "bold",
  },
});

export default styles;
