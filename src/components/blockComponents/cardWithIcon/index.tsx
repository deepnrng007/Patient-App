import React from "react";
import { Image, View, ViewStyle } from "react-native";
import { scale } from "react-native-size-matters";
import { SvgAst, SvgFromUri } from "react-native-svg";
import {
  MontserratBold,
  MontserratMedium,
  MontserratSemiBold,
} from "../../../utils/font";
import { CallWithDot } from "../../../utils/imagePaths";
import logger from "../../../utils/logger";
import AppButton from "../../baseComponents/appButton";
import AppText from "../../baseComponents/appText";
import styles from "./styles";
import { CardProps } from "./types";

const CardWithIcon = ({
  title,
  subtitle,
  Icon,
  onPress,
  isImage,
  isClickable = false,
}: CardProps) => {
  const imagesStyle = {
    width: scale(35),
    height: scale(35),
    borderRadius: scale(35) / 2,
  };

  return (
    <AppButton
      style={styles.itemContainer as ViewStyle}
      onPress={() => {
        logger.log(isClickable);
        if (isClickable) onPress();
      }}
    >
      {isImage ? (
        <Image style={[imagesStyle]} source={{ uri: Icon }} />
      ) : (
        <View style={styles.iconContainer}>{Icon && <Icon />}</View>
      )}
      <View style={styles.headerContainer}>
        <AppText
          style={[
            styles.title,
            {
              fontSize: subtitle === null ? scale(16) : scale(12),
              fontFamily:
                subtitle === null ? MontserratSemiBold : MontserratMedium,
            },
          ]}
        >
          {title}
        </AppText>
        {subtitle !== null && (
          <AppText
            style={
              title.includes("Phone") ? styles.subtitleGreen : styles.subtitle
            }
          >
            {subtitle}
          </AppText>
        )}
      </View>
    </AppButton>
  );
};

export default CardWithIcon;
