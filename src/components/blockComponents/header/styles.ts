import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";
import { MontserratBold } from "../../../utils/font";

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  back: {
    height: scale(50),
    justifyContent: "center",
    backgroundColor: themes.White,
    borderWidth: scale(1),
    borderColor: "#ebebeb",
  },
  profile: {
    // width: "20%",
    // marginRight: scale(14),
  },
  iconButton: {
    marginRight: scale(15),
  },
  dotStyle: {
    position: "absolute",
    top: scale(-8),
    right: scale(0),
    zIndex: scale(9),
    backgroundColor: themes.Red,
  },
  itemContainer: {
    height: scale(34),
    width: scale(34),
    borderColor: "#CBE5E3",
    borderWidth: scale(1),
    borderRadius: scale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: scale(12),
    color: themes.Black,
    fontFamily: MontserratBold,
  },
});

export default styles;
