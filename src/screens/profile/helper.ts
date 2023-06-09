import { constants } from "../../enums/constants";
import { Call, CallWithDot, LocationIcon } from "../../utils/imagePaths";
import logger from "../../utils/logger";
import { checkForNull, getDateFormatForDay } from "../../utils/utils";

export const getProfileList = (profileData: any) => {
  const {
    PreferredPhone = "",
    PhoneCell = "",
    PhoneHome = "",
    DOB = "",
  } = profileData;

  const getPhoneNumber = () => {
    if (PreferredPhone === "Home" && PhoneHome) {
      return PhoneHome;
    } else {
      return PhoneCell;
    }
  };

  return [
    {
      title: constants.PHONE,
      subtitle: checkForNull(getPhoneNumber()),
      icon: CallWithDot,
    },
    {
      title: constants.DOB,
      subtitle: getDateFormatForDay(DOB),
      icon: LocationIcon,
    },
  ];
};
