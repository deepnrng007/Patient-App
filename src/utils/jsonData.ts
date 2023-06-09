import { langVar, translate } from "../enums";

export const list = [
  {
    name: "Surgery Day",
    problem: "Cervical Spinal Fusion",
    date: "Feb 18, 2022",
  },
  {
    name: "Discharge",
    problem: "Cervical Spinal Fusion",
    date: "Feb 18, 2022",
  },
];

export const messages = [
  {
    name: "Shah, Navigator",
    date: new Date(),
    message: "Ryan having trouble breathing.",
  },
  {
    name: "Dr Ryan Frost",
    date: new Date(),
    message: "Ryan having trouble breathing.",
  },
];

export const EpisodeoffTrack = [
  {
    name: "Jhon Doe",
    problem: "Cervical Spinal Fusion",
    date: "Procedure Date: Feb 18, 2022",
    trackStatus: "Off-Track",
    navigatorName: "Actovius, Ottoma",
  },
  {
    name: "Jhon Doe",
    problem: "Cervical Spinal Fusion",
    date: "Procedure Date :Feb 18, 2022",
    trackStatus: "Off-Track",
    navigatorName: "Actovius, Ottoma",
  },
  {
    name: "Jhon Doe",
    problem: "Cervical Spinal Fusion",
    date: "Procedure Date: Feb 18, 2022",
    trackStatus: "Off-Track",
    navigatorName: "Actovius, Ottoma",
  },
  {
    name: "Mukthahar Shaik",
    problem: "Cervical Spinal Fusion",
    date: "Procedure Date: Feb 18, 2022",
    trackStatus: "Off-Track",
    navigatorName: "Actovius, Ottoma",
  },
];
export const episodeonTrack = [
  {
    name: "mukthahar",
    problem: "Cervical Spinal Fusion",
    date: "Procedure Date: Feb 18, 2022",
    status: "Disacharged",
    trackStatus: "On-Track",
    navigatorName: "Actovius, Ottoma",
  },
  {
    name: "Shaik",
    problem: "Cervical Spinal Fusion",
    date: "Procedure Date: Feb 18, 2022",
    status: "New",
    trackStatus: "On-Track",
    navigatorName: "Actovius, Ottoma",
  },
  {
    name: "Prince",
    problem: "Cervical Spinal Fusion",
    date: "Procedure Date: Feb 18, 2022",
    status: "On-Hold",
    trackStatus: "On-Track",
    navigatorName: "Actovius, Ottoma",
  },
  {
    name: "Shah",
    problem: "Cervical Spinal Fusion",
    date: "Procedure Date: Feb 18, 2022",
    status: "Processing",
    trackStatus: "On-Track",
    navigatorName: "Actovius, Ottoma",
  },
];

export const transitionofDays = [
  { label: "Acute Days", value: 7 },
  { label: "OSC Days", value: 0 },
  { label: "IRF Days", value: 0 },
  { label: "SNF Days", value: 4 },
  { label: "HHA Days", value: 0 },
];

export const callList = [
  {
    recordID: 1,
    name: "ScH. Rose, Navigator",
    phoneNumber: "1234567890",
    description: "Navigator",
    contactType: "Navigator",

    message: "Patient fell on the floor, bleeding from…",
  },
  {
    recordID: 2,
    name: "Dr. Smith William",
    phoneNumber: "1234567890",
    description: "Practice",
    contactType: "Practice",

    message: "Patient fell on the floor, bleeding from…",
  },
  {
    recordID: 2,
    name: "ScH. Rose, Dr. William",
    phoneNumber: "1234567890",
    description: "Practice",
    contactType: "Practice",
    message: "Patient fell on the floor, bleeding from…",
  },
];

export const initialContactList: any[] = [
  {
    recordID: 1,
    givenName: "John",
    familyName: "Doe",
    phoneNumbers: "1234567890",
    description: "Navigator",
    contactType: "Navigator",
  },
  {
    recordID: 2,
    givenName: "John",
    familyName: "Smith",
    thumbnailPath:
      "https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg",
    hasThumbnail: true,
    phoneNumbers: "1234567890",
    description: "Navigator",
    contactType: "Navigator",
  },
  {
    recordID: 3,
    givenName: "Brann",
    familyName: "Stark",
    thumbnailPath:
      "https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg",
    hasThumbnail: false,
    phoneNumbers: "1234567890",
    description: "Cervical Spinal Fusion",
    contactType: "Patients",
  },
  {
    recordID: 4,
    givenName: "Twilla",
    familyName: "Price",
    thumbnailPath:
      "https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg",
    hasThumbnail: false,
    phoneNumbers: "1234567890",
    description: "Navigator",
    contactType: "Navigator",
  },
  {
    recordID: 5,
    givenName: "Ned",
    familyName: "Stark",
    thumbnailPath:
      "https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg",
    hasThumbnail: true,
    phoneNumbers: "1234567890",
    description: "Spine C4 to L2 Replacement",
    contactType: "Patients",
  },
  {
    recordID: 6,
    givenName: "Monika",
    familyName: "Doe",
    thumbnailPath:
      "https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg",
    hasThumbnail: false,
    phoneNumbers: "1234567890",
    description: "Navigator",
    contactType: "Navigator",
  },
  {
    recordID: 7,
    givenName: "John",
    familyName: "Doe",
    thumbnailPath:
      "https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg",
    hasThumbnail: true,
    phoneNumbers: "1234567890",
    description: "Navigator",
    contactType: "Navigator",
  },
  {
    recordID: 8,
    givenName: "John",
    familyName: "Smith",
    thumbnailPath:
      "https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg",
    hasThumbnail: true,
    phoneNumbers: "1234567890",
    description: "Navigator",
    contactType: "Navigator",
  },
  {
    recordID: 9,
    givenName: "Brann",
    familyName: "Stark",
    thumbnailPath:
      "https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg",
    hasThumbnail: false,
    phoneNumbers: "1234567890",
    description: "Cervical Spinal Fusion",
    contactType: "Patients",
  },
  {
    recordID: 10,
    givenName: "Twilla",
    familyName: "Price",
    thumbnailPath:
      "https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg",
    hasThumbnail: false,
    phoneNumbers: "1234567890",
    description: "Navigator",
    contactType: "Navigator",
  },
  {
    recordID: 11,
    givenName: "Ned",
    familyName: "Stark",
    thumbnailPath:
      "https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg",
    hasThumbnail: true,
    phoneNumbers: "1234567890",
    description: "Spine C4 to L2 Replacement",
    contactType: "Patients",
  },
  {
    recordID: 12,
    givenName: "Monika",
    familyName: "Doe",
    thumbnailPath:
      "https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg",
    hasThumbnail: false,
    phoneNumbers: "1234567890",
    description: "Navigator",
    contactType: "Navigator",
  },
  {
    recordID: 13,
    givenName: "Ned",
    familyName: "Stark",
    thumbnailPath:
      "https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg",
    hasThumbnail: true,
    phoneNumbers: "1234567890",
    description: "Navigator",
    contactType: "Navigator",
  },
  {
    recordID: 14,
    givenName: "Monika",
    familyName: "Doe",
    thumbnailPath:
      "https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg",
    hasThumbnail: false,
    phoneNumbers: "1234567890",
    description: "Navigator",
    contactType: "Navigator",
  },
  {
    recordID: 15,
    givenName: "zzzzzzzzz",
    familyName: "Doe",
    thumbnailPath:
      "https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg",
    hasThumbnail: false,
    phoneNumbers: "1234567890",
    description: "Navigator",
    contactType: "Navigator",
  },
  {
    recordID: 16,
    givenName: "zzzzzzzzz",
    familyName: "Doe",
    thumbnailPath:
      "https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg",
    hasThumbnail: false,
    phoneNumbers: "1234567890",
    description: "Navigator",
    contactType: "Navigator",
  },
  {
    recordID: 17,
    givenName: "zzzzzzzzz",
    familyName: "Doe",
    thumbnailPath:
      "https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg",
    hasThumbnail: false,
    phoneNumbers: "1234567890",
    description: "Navigator",
    contactType: "Navigator",
  },
  {
    recordID: 18,
    givenName: "zzzzzzzzz",
    familyName: "Doe",
    thumbnailPath:
      "https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg",
    hasThumbnail: false,
    phoneNumbers: "1234567890",
    description: "Navigator",
    contactType: "Navigator",
  },
  {
    recordID: 19,
    givenName: "zzzzzzzzz",
    familyName: "Doe",
    thumbnailPath:
      "https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg",
    hasThumbnail: false,
    phoneNumbers: "1234567890",
    description: "Navigator",
    contactType: "Navigator",
  },
  {
    recordID: 20,
    givenName: "zzzzzzzzz",
    familyName: "Doe",
    thumbnailPath:
      "https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg",
    hasThumbnail: false,
    phoneNumbers: "1234567890",
    description: "Navigator",
    contactType: "Navigator",
  },
  {
    recordID: 21,
    givenName: "zzzzzzzzz",
    familyName: "Doe",
    thumbnailPath:
      "https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg",
    hasThumbnail: false,
    phoneNumbers: "1234567890",
    description: "Navigator",
    contactType: "Navigator",
  },
  {
    recordID: 22,
    givenName: "zzzzzzzzz",
    familyName: "Doe",
    thumbnailPath:
      "https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg",
    hasThumbnail: false,
    phoneNumbers: "1234567890",
    description: "Navigator",
    contactType: "Navigator",
  },
  {
    recordID: 23,
    givenName: "zzzzzzzzz",
    familyName: "Doe",
    thumbnailPath:
      "https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg",
    hasThumbnail: false,
    phoneNumbers: "1234567890",
    description: "Navigator",
    contactType: "Navigator",
  },
  {
    recordID: 24,
    givenName: "zzzzzzzzz",
    familyName: "Doe",
    thumbnailPath:
      "https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg",
    hasThumbnail: false,
    phoneNumbers: "1234567890",
    description: "Navigator",
    contactType: "Navigator",
  },
  {
    recordID: 25,
    givenName: "zzzzzzzzz",
    familyName: "Doe",
    thumbnailPath:
      "https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg",
    hasThumbnail: false,
    phoneNumbers: "1234567890",
    description: "Navigator",
    contactType: "Navigator",
  },
  {
    recordID: 26,
    givenName: "zzzzzzzzz 1111",
    familyName: "Doe",
    thumbnailPath:
      "https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg",
    hasThumbnail: false,
    phoneNumbers: "1234567890",
    description: "Navigator",
    contactType: "Navigator",
  },
];

export const pendingTocs = [
  {
    name: "Jhon Doe",
    problem: "Cervical Spinal Fusion",
    date: "01/01/2022",
    navigatorName: "Actovius, Ottoma",
    trackStatus: "Pending",
  },
  {
    name: "Jhon Doe",
    problem: "Cervical Spinal Fusion",
    date: "01/01/2022",
    navigatorName: "Actovius, Ottoma",
    trackStatus: "Pending",
  },
  {
    name: "Jhon Doe",
    problem: "Cervical Spinal Fusion",
    date: "01/01/2022",
    navigatorName: "Actovius, Ottoma",
    trackStatus: "Pending",
  },
  {
    name: "Mukthahar Shaik",
    problem: "Cervical Spinal Fusion",
    date: "01/01/2022",
    navigatorName: "Actovius, Ottoma",
    trackStatus: "Pending",
  },
];
export const approved = [
  {
    name: "Tiontay Carroll",
    details: "F, 21, Procedure Date 1/14/22",
    problem: "Anterior/posterior spinal",
    isReviced: true,
    trackStatus: "Approved",
    navigatorName: "Actovius, Ottoma",
    revisedDetails: {
      revised: [
        {
          date: new Date(),
          snfValue: "GRDH Hospital",
          snfLos: "4 Days",
          irfValue: "Silver and Sand center",
          irfLos: "4 Days",
          hhValue: "Silver and Sand center",
          hhVisits: "2",
          moptValue: "GRDH Hospital",
          moptvisits: "2",
          optValue: "Forties multispeciality hospital",
          optVisits: "4",
        },
        {
          date: new Date(),
          list: ["Home without services"],
        },
      ],
    },
  },
  {
    name: "Tiontay Carroll",
    details: "F, 21, Procedure Date 1/14/22",
    problem: "Anterior/posterior spinal",
    isReviced: false,
    navigatorName: "Actovius, Ottoma",
    trackStatus: "Approved",
  },
  {
    name: "Tiontay Carroll",
    details: "F, 21, Procedure Date 1/14/22",
    problem: "Anterior/posterior spinal",
    isReviced: false,
    navigatorName: "Actovius, Ottoma",
    trackStatus: "Approved",
  },
  {
    name: "Tiontay Carroll",
    details: "F, 21, Procedure Date 1/14/22",
    problem: "Anterior/posterior spinal",
    isReviced: true,
    navigatorName: "Actovius, Ottoma",
    trackStatus: "Approved",
  },
];

export const allMessages = [
  {
    id: 1,
    positionIndex: 20,
    isUnread: true,
    images: [
      "https://rukminim1.flixcart.com/image/416/416/jq8dgnk0/poster/z/z/b/medium-baby-poster-the-boos-baby-cartoon-12x18-paper-print-be-original-imafc8harrywqghc.jpeg?q=70",
      "https://m.media-amazon.com/images/I/71hMEM1a9EL._SX425_.jpg",
    ],
    conversionName: "Mukthahar, Priyanka",
    message:
      "Patient1 fell on the floor, bleeding from the day one Patient fell on the floor, bleeding from the day one Patient fell on the floor, bleeding from the day onePatient fell on the floor, bleeding from the day one Patient fell on the floor, bleeding from the day one Patient fell on the floor, bleeding from the day one Patient fell on the floor, bleeding from the day one ",
    date: "Today 2:45 pm",
    conversionType: "ToC - John Doe",
  },
  {
    images: [
      "https://i.pinimg.com/originals/f4/ed/18/f4ed18e4f8c07a1688153de9daa5bd6c.jpg",
      "https://www.unigreet.com/wp-content/uploads/2020/09/whatsApp%EF%BB%BF-cartoon-dp-pic-822x1024.jpg",
      "https://st.depositphotos.com/1787196/1330/i/600/depositphotos_13301967-stock-photo-furry-blue-monster.jpg",
    ],
    isUnread: true,
    conversionName: "Mukthahar, Priyanka",
    message: "Patient fell on the floor, bleeding from the day one",
    date: "Today 2:45 pm",
    conversionType: "ToC - John Doe",
  },
  {
    images: [
      "https://st.depositphotos.com/1787196/1330/i/600/depositphotos_13301967-stock-photo-furry-blue-monster.jpg",
    ],
    conversionName: "Mukthahar, Priyanka",
    message: "Patient2 fell on the floor, bleeding from the day one",
    date: "Today 2:45 pm",
    conversionType: "ToC - John Doe",
  },
  {
    images: [],
    isUnread: true,
    conversionName: "Mukthahar, Priyanka",
    message: "Patient fell on the floor, bleeding from the day one",
    date: "Today 2:45 pm",
    conversionType: "ToC - John Doe",
  },
  {
    images: [],
    conversionName: "Mukthahar, Priyanka",
    message: "Patient3 fell on the floor, bleeding from the day one",
    date: "Today 2:45 pm",
    conversionType: "ToC - John Doe",
  },
  {
    images: [],
    isUnread: false,
    conversionName: "Mukthahar, Priyanka",
    message: "Patient fell on the floor, bleeding from the day one",
    date: "Today 2:45 pm",
    conversionType: "ToC - John Doe",
  },
  {
    images: [],
    isUnread: false,
    conversionName: "Mukthahar, Priyanka",
    message: "Patient fell on the floor, bleeding from the day one",
    date: "Today 2:45 pm",
    conversionType: "ToC - John Doe",
  },
  {
    images: [],
    isUnread: false,
    conversionName: "Mukthahar, Priyanka",
    message: "Patient fell on the floor, bleeding from the day one",
    date: "Today 2:45 pm",
    conversionType: "ToC - John Doe",
  },
  {
    images: [],
    isUnread: false,
    conversionName: "Mukthahar, Priyanka",
    message: "Patient fell on the floor, bleeding from the day one",
    date: "Today 2:45 pm",
    conversionType: "ToC - John Doe",
  },
  {
    images: [],
    isUnread: false,
    conversionName: "Mukthahar, Priyanka",
    message: "Patient fell on the floor, bleeding from the day one",
    date: "Today 2:45 pm",
    conversionType: "ToC - John Doe",
  },
  {
    images: [],
    isUnread: false,
    conversionName: "Mukthahar, Priyanka",
    message: "Patient fell on the floor, bleeding from the day one",
    date: "Today 2:45 pm",
    conversionType: "ToC - John Doe",
  },
  {
    images: [],
    isUnread: false,
    conversionName: "Mukthahar, Priyanka",
    message: "Patient fell on the floor, bleeding from the day one",
    date: "Today 2:45 pm",
    conversionType: "ToC - John Doe",
  },
  {
    images: [],
    isUnread: false,
    conversionName: "Mukthahar, Priyanka",
    message: "Patient fell on the floor, bleeding from the day one",
    date: "Today 2:45 pm",
    conversionType: "ToC - John Doe",
  },
  {
    images: [],
    isUnread: false,
    conversionName: "Prince",
    message: "Patient fell on the floor, bleeding from the day one",
    date: "Today 2:45 pm",
    conversionType: "ToC - John Doe",
  },
];

export const ToCDetailData = {
  patientName: "John Doe",
  patientAge: "85 Yrs",
  patientGender: "Male",
  navigatorName: "Shah RS",
  surgeryName: "Back and neck procedure of C spine, Non Fusion",
  surgeryHospitalName: "Surgery Hospital Name",
  navigatorNotes: {
    notesDesc:
      "The patient’s relatives are insisting to make him stay for morethan 5 days…",
    date: new Date(),
  },
  location: {
    los: [
      {
        location: "SNF",
        defaultValue: "1",
        defaultDays: "3",
      },
    ],
    visit: [
      {
        location: "M-OPT",
        defaultValue: "5",
        defaultDays: "3",
      },
    ],
  },
  status: "Approved",
  homeServiceChecked: true,
};

export const locationDropdownData = {
  los: [
    {
      location: "SNF",
      locationNames: [
        {
          id: 1,
          name: "Silver Sand Center",
        },
        {
          id: 2,
          name: "Mayo Speciality Clinic",
        },
        {
          id: 3,
          name: "Ruby",
        },
        {
          id: 4,
          name: "React Native",
        },
        {
          id: 5,
          name: "PHP",
        },
        {
          id: 6,
          name: "Python",
        },
        {
          id: 7,
          name: "Go",
        },
        {
          id: 8,
          name: "Swift",
        },
        {
          id: 9,
          name: "C",
        },
        {
          id: 10,
          name: "C++",
        },
        {
          id: 11,
          name: "TS",
        },
        {
          id: 12,
          name: "JS",
        },
      ],
    },
    {
      location: "IRF",
      locationNames: [
        {
          id: 1,
          name: "Silver Sand Center",
        },
        {
          id: 2,
          name: "Mayo Speciality Clinic",
        },
        {
          id: 3,
          name: "Ruby",
        },
        {
          id: 4,
          name: "React Native",
        },
        {
          id: 5,
          name: "PHP",
        },
        {
          id: 6,
          name: "Python",
        },
        {
          id: 7,
          name: "Go",
        },
        {
          id: 8,
          name: "Swift",
        },
        {
          id: 9,
          name: "C",
        },
        {
          id: 10,
          name: "C++",
        },
        {
          id: 11,
          name: "TS",
        },
        {
          id: 12,
          name: "JS",
        },
      ],
    },
  ],
  visit: [
    {
      location: "HH",
      locationNames: [
        {
          id: 1,
          name: "Silver Sand Center",
        },
        {
          id: 2,
          name: "Mayo Speciality Clinic",
        },
        {
          id: 3,
          name: "Ruby",
        },
        {
          id: 4,
          name: "React Native",
        },
        {
          id: 5,
          name: "PHP",
        },
        {
          id: 6,
          name: "Python",
        },
        {
          id: 7,
          name: "Go",
        },
        {
          id: 8,
          name: "Swift",
        },
        {
          id: 9,
          name: "C",
        },
        {
          id: 10,
          name: "C++",
        },
        {
          id: 11,
          name: "TS",
        },
        {
          id: 12,
          name: "JS",
        },
      ],
    },
    {
      location: "M-OPT",
      locationNames: [
        {
          id: 1,
          name: "Silver Sand Center",
        },
        {
          id: 2,
          name: "Mayo Speciality Clinic",
        },
        {
          id: 3,
          name: "Ruby",
        },
        {
          id: 4,
          name: "React Native",
        },
        {
          id: 5,
          name: "PHP",
        },
        {
          id: 6,
          name: "Python",
        },
        {
          id: 7,
          name: "Go",
        },
        {
          id: 8,
          name: "Swift",
        },
        {
          id: 9,
          name: "C",
        },
        {
          id: 10,
          name: "C++",
        },
        {
          id: 11,
          name: "TS",
        },
        {
          id: 12,
          name: "JS",
        },
      ],
    },
    {
      location: "OPT",
      locationNames: [
        {
          id: 1,
          name: "Silver Sand Center",
        },
        {
          id: 2,
          name: "Mayo Speciality Clinic",
        },
        {
          id: 3,
          name: "Ruby",
        },
        {
          id: 4,
          name: "React Native",
        },
        {
          id: 5,
          name: "PHP",
        },
        {
          id: 6,
          name: "Python",
        },
        {
          id: 7,
          name: "Go",
        },
        {
          id: 8,
          name: "Swift",
        },
        {
          id: 9,
          name: "C",
        },
        {
          id: 10,
          name: "C++",
        },
        {
          id: 11,
          name: "TS",
        },
        {
          id: 12,
          name: "JS",
        },
      ],
    },
  ],
};

export const locationNames = [
  {
    id: 1,
    name: "Silver Sand Center",
  },
  {
    id: 2,
    name: "Mayo Speciality Clinic",
  },
  {
    id: 3,
    name: "Ruby",
  },
  {
    id: 4,
    name: "React Native",
  },
  {
    id: 5,
    name: "PHP",
  },
  {
    id: 6,
    name: "Python",
  },
  {
    id: 7,
    name: "Go",
  },
  {
    id: 8,
    name: "Swift",
  },
  {
    id: 9,
    name: "C",
  },
  {
    id: 10,
    name: "C++",
  },
  {
    id: 11,
    name: "TS",
  },
  {
    id: 12,
    name: "JS",
  },
];

export const chatMessages = [
  {
    _id: 1,
    message: {
      type: "TEXT",
      content: "How are you  Mr Aiden?",
    },
    createdAt: "2022-02-24T11:50:42.468Z",
    user: {
      _id: 1,
      name: "Dr. Mukthahar",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 2,
    message: {
      type: "TEXT",
      content: "I how you are well?",
    },
    createdAt: "2022-02-24T11:50:42.468Z",
    user: {
      _id: 1,
      name: "Dr. Mukthahar",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 3,
    text: "Doctor, I am feeling better. I had a severe backpain though.",
    message: {
      type: "TEXT",
      content: "I how you are well?",
    },
    createdAt: "2022-02-24T11:45:42.468Z",
    user: {
      _id: 2,
      name: "Aiden",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 4,
    text: "I had a severe backpain though.",
    message: {
      type: "TEXT",
      content: "I how you are well?",
    },
    createdAt: "2022-02-24T11:45:42.468Z",
    user: {
      _id: 2,
      name: "Aiden",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 5,
    text: "Please pay a visit to the hospital so that I can do an examination ",
    message: {
      type: "TEXT",
      content: "I how you are well?",
    },
    createdAt: "2022-02-25T11:40:42.468Z",
    user: {
      _id: 1,
      name: "Dr. Mukthahar",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 6,
    text: "okkk doctor",
    message: {
      type: "TEXT",
      content: "I how you are well?",
    },
    createdAt: "2022-02-25T11:35:42.468Z",
    user: {
      _id: 2,
      name: "Aiden",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 7,
    text: "How are you  Mr Aiden?",
    message: {
      type: "TEXT",
      content: "I how you are well?",
    },
    createdAt: "2022-02-24T11:50:42.468Z",
    user: {
      _id: 1,
      name: "Dr. Mukthahar",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 8,
    text: "I how you are well?",
    message: {
      type: "TEXT",
      content: "I how you are well?",
    },
    createdAt: "2022-02-24T11:50:42.468Z",
    user: {
      _id: 1,
      name: "Dr. Mukthahar",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 9,
    text: "Doctor, I am feeling better. I had a severe backpain though.",
    message: {
      type: "TEXT",
      content: "I how you are well?",
    },
    createdAt: "2022-02-24T11:45:42.468Z",
    user: {
      _id: 2,
      name: "Aiden",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: "112jdskfjksadjfk",
    text: "I had a severe backpain though.",
    message: {
      type: "TEXT",
      content: "I how you are well?",
    },
    createdAt: "2022-02-24T11:45:42.468Z",
    user: {
      _id: 2,
      name: "Aiden",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 11,
    text: "",
    message: {
      type: "IMAGE",
      content: "https://placeimg.com/140/140/any",
    },
    createdAt: "2022-02-27T11:40:42.468Z",
    user: {
      _id: 1,
      name: "Dr. Mukthahar",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 12,
    text: "okkk doctor",
    message: {
      type: "TEXT",
      content: "I how you are well?",
    },
    createdAt: "2022-02-28T11:35:42.468Z",
    user: {
      _id: 2,
      name: "Aiden",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: "dfkasjfdajsk",
    text: "okkk doctor",
    message: {
      type: "IMAGE",
      content:
        "https://rukminim1.flixcart.com/image/416/416/jq8dgnk0/poster/z/z/b/medium-baby-poster-the-boos-baby-cartoon-12x18-paper-print-be-original-imafc8harrywqghc.jpeg?q=70",
    },
    createdAt: "2022-02-28T11:35:42.468Z",
    user: {
      _id: 2,
      name: "Aiden",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
];

export const NotificationsData = [
  {
    id: 1,
    message: "Sarah Will’s ToC need your approval",
    Date: new Date(),
    type: "APPROVETOC",
    highlightedText: ["Sarah Will’s ToC"],
    isRead: false,
  },
  {
    id: 2,
    message: "Shah, RS Navigator has sent you a message",
    Date: new Date(),
    type: "MESSAGE",
    highlightedText: ["Shah,", "RS Navigator"],
    isRead: true,
  },
  {
    id: 3,
    message: "John Doe is staying longer than the prescribed ToC",
    Date: new Date(),
    type: "OFFTRACKTOC",
    highlightedText: ["John Doe"],
    isRead: false,
  },
  {
    id: 1,
    message: "Sarah Will’s ToC need your approval",
    Date: new Date(),
    type: "APPROVETOC",
    highlightedText: ["Sarah Will’s ToC"],
    isRead: false,
  },
  {
    id: 2,
    message: "Shah, RS Navigator has sent you a message",
    Date: new Date(),
    type: "MESSAGE",
    highlightedText: ["Shah,", "RS Navigator"],
    isRead: true,
  },
  {
    id: 3,
    message: "John Doe is staying longer than the prescribed ToC",
    Date: new Date(),
    type: "OFFTRACKTOC",
    highlightedText: ["John Doe"],
    isRead: false,
  },
  {
    id: 1,
    message: "Sarah Will’s ToC need your approval",
    Date: new Date(),
    type: "APPROVETOC",
    highlightedText: ["Sarah Will’s ToC"],
    isRead: false,
  },
  {
    id: 2,
    message: "Shah, RS Navigator has sent you a message",
    Date: new Date(),
    type: "MESSAGE",
    highlightedText: ["Shah,", "RS Navigator"],
    isRead: true,
  },
  {
    id: 3,
    message: "John Doe is staying longer than the prescribed ToC",
    Date: new Date(),
    type: "OFFTRACKTOC",
    highlightedText: ["John Doe"],
    isRead: false,
  },
  {
    id: 1,
    message: "Sarah Will’s ToC need your approval",
    Date: new Date(),
    type: "APPROVETOC",
    highlightedText: ["Sarah Will’s ToC"],
    isRead: false,
  },
  {
    id: 2,
    message: "Shah, RS Navigator has sent you a message",
    Date: new Date(),
    type: "MESSAGE",
    highlightedText: ["Shah,", "RS Navigator"],
    isRead: true,
  },
  {
    id: 3,
    message: "John Doe is staying longer than the prescribed ToC",
    Date: new Date(),
    type: "OFFTRACKTOC",
    highlightedText: ["John Doe"],
    isRead: false,
  },
  {
    id: 1,
    message: "Sarah Will’s ToC need your approval",
    Date: new Date(),
    type: "APPROVETOC",
    highlightedText: ["Sarah Will’s ToC"],
    isRead: false,
  },
  {
    id: 2,
    message: "Shah, RS Navigator has sent you a message",
    Date: new Date(),
    type: "MESSAGE",
    highlightedText: ["Shah,", "RS Navigator"],
    isRead: true,
  },
  {
    id: 3,
    message: "John Doe is staying longer than the prescribed ToC",
    Date: new Date(),
    type: "OFFTRACKTOC",
    highlightedText: ["John Doe"],
    isRead: false,
  },
  {
    id: 1,
    message: "Sarah Will’s ToC need your approval",
    Date: new Date(),
    type: "APPROVETOC",
    highlightedText: ["Sarah Will’s ToC"],
    isRead: false,
  },
  {
    id: 2,
    message: "Shah, RS Navigator has sent you a message",
    Date: new Date(),
    type: "MESSAGE",
    highlightedText: ["Shah,", "RS Navigator"],
    isRead: true,
  },
  {
    id: 3,
    message: "John Doe is staying longer than the prescribed ToC",
    Date: new Date(),
    type: "OFFTRACKTOC",
    highlightedText: ["John Doe"],
    isRead: false,
  },
  {
    id: 1,
    message: "Sarah Will’s ToC need your approval",
    Date: new Date(),
    type: "APPROVETOC",
    highlightedText: ["Sarah Will’s ToC"],
    isRead: false,
  },
  {
    id: 2,
    message: "Shah, RS Navigator has sent you a message",
    Date: new Date(),
    type: "MESSAGE",
    highlightedText: ["Shah,", "RS Navigator"],
    isRead: true,
  },
  {
    id: 3,
    message: "John Doe is staying longer than the prescribed ToC",
    Date: new Date(),
    type: "OFFTRACKTOC",
    highlightedText: ["John Doe"],
    isRead: false,
  },
];
