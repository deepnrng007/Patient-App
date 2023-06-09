import moment from "moment";
import { constants } from "../../enums/constants";
import {
  CallWithDot,
  Cutter,
  EmailwithDot,
  LocationIcon,
  Shield,
} from "../../utils/imagePaths";
import { getDateFormatForDay } from "../../utils/utils";

export const getPreSurgeryList = () => {
  const checkForNull = (key: any) => {
    if (key) {
      return key;
    } else {
      return "-";
    }
  };

  return [
    {
      title: constants.DATE,
      subtitle: "March 12, 2022",
      icon: EmailwithDot,
    },
    {
      title: constants.LOCATION,
      subtitle: "Episode Solutions",
      icon: LocationIcon,
    },
  ];
};
