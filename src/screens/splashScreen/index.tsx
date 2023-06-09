import { View } from "react-native";
import React from "react";
import styles from "./style";
import { SplashTitleIcon } from "../../utils/imagePaths";
import LottieView from "lottie-react-native";

const SplashSreen = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/animations/splashScreen.json")}
        autoPlay
        loop={false}
        resizeMode="cover"
      />
    </View>
  );
};

export default SplashSreen;
