import { ViewStyle } from "react-native";
import React from "react";
import {
  ContactSearchEmpty,
  MessageInboxEmpty,
} from "../../../utils/imagePaths";
import NoResultFound from "../noResultFound";
import AvoidKeyboardComponent from "../avoidKeyboardComponent";
import { scale } from "react-native-size-matters";
import NewNavConversation from "../../blockComponents/newNavConversation";

type props = {
  style?: ViewStyle;
  type:
    | "oops"
    | "error"
    | "emptyInbox"
    | "noEpisodesFound"
    | "noToCsFound"
    | "noContactsFound"
    | "noContactsAvailable"
    | "noNotifications"
    | "tocOopsNotFound"
    | "noDashboardData";
  enableIcon: boolean;
  verticalOffset: number;
  onPress?: any;
  isHorizontal?: boolean;
  showNewConvoCard?: boolean;
};
const NotFoundOrError = ({
  style,
  type,
  enableIcon,
  verticalOffset,
  onPress,
  isHorizontal,
  showNewConvoCard,
}: props) => {
  const imageType = () => {
    switch (type) {
      case "emptyInbox": {
        return (
          <NoResultFound
            Icon={MessageInboxEmpty}
            line1='No Messages!'
            line2='You do not have any messages'
            isHorizontal={isHorizontal}
          />
        );
      }
      case "noContactsFound": {
        return (
          <NoResultFound
            Icon={ContactSearchEmpty}
            line1='Oops! No contacts found'
            line2='Make sure you have episodes to see related contacts here'
          />
        );
      }
      case "noDashboardData": {
        return (
          <NoResultFound
            Icon={ContactSearchEmpty}
            line1='Your care plan is being created.'
          />
        );
      }
    }
  };

  return (
    <AvoidKeyboardComponent
      verticalOffset={verticalOffset}
      style={
        [
          enableIcon
            ? {
                flex: 1,
              }
            : { flex: 0 },
          style,
        ] as ViewStyle
      }
    >
      {enableIcon ? imageType() : null}
      {showNewConvoCard && <NewNavConversation onPress={onPress} />}
    </AvoidKeyboardComponent>
  );
};

export default NotFoundOrError;

NotFoundOrError.defaultProps = {
  isError: false,
  verticalOffset: scale(100),
};
