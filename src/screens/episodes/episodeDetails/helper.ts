import { constants } from "../../../enums/constants";
import {
  CallWithDot,
  Cutter,
  EmailwithDot,
  Shield,
} from "../../../utils/imagePaths";
import { checkForNull, getDateFormatForDay } from "../../../utils/utils";

export const getEpisodeList = (episodeData: any) => {
  const {
    CareManagerFirstName = "-",
    CareManagerLastName = "",
    Surgeon = "-",
    ProcedureDate = "-",
    EpisodeLongName = "-",
    PracticeName = "-",
    PracticePhone = "-",
  } = episodeData;

  return [
    {
      title: constants.NAVIGATOR,
      subtitle: `${CareManagerFirstName} ${CareManagerLastName}`,
      icon: "https://i.picsum.photos/id/1005/5760/3840.jpg?hmac=2acSJCOwz9q_dKtDZdSB-OIK1HUcwBeXco_RMMTUgfY",
      isImage: true,
    },
    {
      title: constants.SURGEON,
      subtitle: checkForNull(Surgeon),
      icon: "https://i.picsum.photos/id/1011/5472/3648.jpg?hmac=Koo9845x2akkVzVFX3xxAc9BCkeGYA9VRVfLE4f0Zzk",
      isImage: true,
    },
    {
      title: constants.PROCEDURENAME,
      subtitle: checkForNull(EpisodeLongName),
      icon: Cutter,
      isImage: false,
    },
    {
      title: constants.SURGERYDATE,
      subtitle: checkForNull(getDateFormatForDay(ProcedureDate)),
      icon: EmailwithDot,
      isImage: false,
    },
    {
      title: constants.PRACTICE,
      subtitle: checkForNull(PracticeName),
      icon: Shield,
      isImage: false,
    },
    {
      title: constants.PRACTICEPHONE,
      subtitle: checkForNull(PracticePhone),
      icon: CallWithDot,
      isImage: false,
      isClickable: true,
    },
  ];
};
