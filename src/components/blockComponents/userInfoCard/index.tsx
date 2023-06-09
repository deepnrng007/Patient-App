import React from "react";
import { View } from "react-native";
import { AppButton } from "../..";
import AppText from "../../baseComponents/appText";
import Card from "../../baseComponents/card";
import { styles } from "./styles";
import { UserInfoProps } from "./types";

const UserInfoCard = ({ userName, onClickSignout }: UserInfoProps) => {
  return (
    <Card style={styles.userInfoView}>
      <View style={styles.userDirection}>
        <View>
          <AppText style={styles.loggedInText}>Logged in as</AppText>
          <AppText style={styles.userName}>{userName}</AppText>
        </View>
        <View style={styles.signOutView}>
          <AppButton
            textStyle={styles.signoutText}
            text="Sign Out"
            onPress={onClickSignout}
          />
        </View>
      </View>
    </Card>
  );
};

export default UserInfoCard;
