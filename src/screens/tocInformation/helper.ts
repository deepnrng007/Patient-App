import moment from "moment";
import { constants } from "../../enums/constants";
import {
  CallWithDot,
  Cutter,
  EmailwithDot,
  Shield,
} from "../../utils/imagePaths";
import { getDateFormatForDay } from "../../utils/utils";

export const getCarePlanList = (carePlanData: any) => {
  const {
    TransitionOfCareItems = [{}],
    Intake = {},
    Surgeon = {},
    Practice = {},
  } = carePlanData;
  const { PACTypeName = "" } = TransitionOfCareItems[0];
  const {
    PrimaryCareManagerName = "",
    Episode = {},
    SurgeryDate = "",
  } = Intake;
  const { FirstName = "", LastName = "" } = Surgeon;

  const { LongName = "" } = Episode;

  const checkForNull = (key: any) => {
    if (key) {
      return key;
    } else {
      return "-";
    }
  };
  return [
    {
      title: constants.NAVIGATOR,
      subtitle: checkForNull(PrimaryCareManagerName),
      icon: "https://i.picsum.photos/id/1005/5760/3840.jpg?hmac=2acSJCOwz9q_dKtDZdSB-OIK1HUcwBeXco_RMMTUgfY",
      isImage: true,
    },
    {
      title: constants.SURGEON,
      subtitle: checkForNull(`${FirstName} ${LastName}`),
      icon: "https://i.picsum.photos/id/1011/5472/3648.jpg?hmac=Koo9845x2akkVzVFX3xxAc9BCkeGYA9VRVfLE4f0Zzk",
      isImage: true,
    },
    {
      title: constants.PROCEDURENAME,
      subtitle: checkForNull(LongName),
      icon: Cutter,
      isImage: false,
    },
    {
      title: constants.SURGERYDATE,
      subtitle: getDateFormatForDay(checkForNull(SurgeryDate)),
      icon: EmailwithDot,
      isImage: false,
    },
    {
      title: constants.PRACTICE,
      subtitle: checkForNull(Practice?.LongName),
      icon: Shield,
      isImage: false,
    },
    {
      title: constants.PRACTICEPHONE,
      subtitle: checkForNull(Practice?.PracticePhone),
      icon: CallWithDot,
      isImage: false,
      isClickable: true,
    },
  ];
};
