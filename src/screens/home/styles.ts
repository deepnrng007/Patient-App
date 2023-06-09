import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../enums";

const styles = ScaledSheet.create({
  container: {
    paddingTop: scale(16),
  },
  paddingAround: {
    padding: scale(themes.PaddingArroundValue),
  },
  horizontalLisStyle: {
    marginTop: scale(20),
  },
  nameDate: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: scale(20),
    paddingHorizontal: scale(20),
  },
  titleCount: {
    marginLeft: 0,
  },
});

export default styles;
