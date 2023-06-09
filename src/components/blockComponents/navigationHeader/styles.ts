import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";
import { MontserratRegular } from "../../../utils/font";

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: scale(70),
  },
  back: {
    height: scale(50),
    justifyContent: "center",
    backgroundColor: themes.transparent,
    padding: scale(8),
  },
  profile: {
    width: "20%",
  },
  navigationTitle: {
    fontFamily: MontserratRegular,
    color: themes.gray20,
    fontSize: scale(themes.FontSize22),
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: scale(27),
  },
  navigationTitleView: {
    alignItems: "center",
    width: "70%",
  },
});

export default styles;
