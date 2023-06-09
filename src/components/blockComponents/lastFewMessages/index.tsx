import { View, FlatList, ViewStyle } from "react-native";
import React from "react";
import styles from "./styles";
import { screenNames } from "../../../enums";
import { LastFewMessagesProps } from "./types";
import AppText from "../../baseComponents/appText";
import AppButton from "../../baseComponents/appButton";
import moment from "moment";
import AntDesign from "react-native-vector-icons/AntDesign";
import EmptyStates from "../emptyStates";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../screenNavigators/rootNavigator";

type navigationProps = NativeStackNavigationProp<
  RootStackParams,
  screenNames.DRAWERNAVIGATION
>;

const LastFewMessages = ({
  style,
  list,
  emptyStateTitle,
  emptyStateMssage,
  emptyIcon,
  accessibilityLabel,
  testID,
}: LastFewMessagesProps) => {
  const navigation = useNavigation<navigationProps>();
  const navigateToChat = (
    conversionName: string,
    conversationID: number,
    twilioConversationId: string
  ) => {
    navigation.navigate(screenNames.CHAT, {
      conversionName,
      conversationID,
      twilioConversationId,
    });
  };

  const renderItems = ({ item }: any) => {
    const {
      name,
      lastMessageContent,
      lastMessageDateTime,
      conversationID,
      twilioConversationId,
    } = item;
    return (
      <AppButton
        onPress={() => {
          navigateToChat(name, conversationID, twilioConversationId);
        }}
        style={styles.messageContainer as ViewStyle}
      >
        <View
          testID={testID}
          accessibilityLabel={accessibilityLabel}
          style={styles.messageDetails}
        >
          <View style={styles.nameDate}>
            <AppText numberOfLines={1} style={styles.name}>
              {name}
            </AppText>
            <AppText style={styles.date}>
              {moment(lastMessageDateTime).fromNow()}
            </AppText>
          </View>
          <AppText style={styles.message} numberOfLines={1}>
            {lastMessageContent}
          </AppText>
        </View>
        <View style={styles.iconContainer}>
          <AntDesign name={"arrowright"} style={styles.icon} />
        </View>
      </AppButton>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <>
        {list.length > 0 ? (
          <View style={styles.messageListContainer}>
            <FlatList
              data={list}
              renderItem={renderItems}
              keyExtractor={(item) => item.conversationID}
            />
          </View>
        ) : (
          <EmptyStates
            Icon={emptyIcon}
            title={emptyStateTitle}
            message={emptyStateMssage}
          />
        )}
      </>
    </View>
  );
};

export default LastFewMessages;
