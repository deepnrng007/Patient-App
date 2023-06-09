import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    backgroundColor: themes.White,
    padding: scale(10),
  },
});

export default styles;
