export enum attachmentType {
  DOCUMENT = "DOCUMENT",
  CAMERA = "CAMERA",
  GALLERY = "GALLERY",
}

export enum mediaTypes {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  PDF = "PDF",
  DOC = "WORD",
}

export enum conversationType {
  EPISODE = "EPISODE",
  GENERAL = "GENERAL",
  TOC = "TOC",
}

export enum NOTIFICATIONTYPE {
  message = "MESSAGE",
  approveTOC = "APPROVETOC",
  offTrackTOC = "OFFTRACKTOC",
}

export enum encriptedStorageKeys {
  LOGINDETAILS = "LOGINDETAILS",
  CONVCOUNTONDASHBOARD = "CONVCOUNTONDASHBOARD",
  PATIENT_PROFILE = "PATIENT_PROFILE",
  ACCESSTOKEN = "ACCESSTOKEN",
  USERNAMEANDPWD = "USERNAMEANDPWD",
  ENABLETOUCHID = "ENABLETOUCHID",
  CONVERSATION_ID_KEY = "CONVERSATION_ID_KEY",
  LASTCHATSCREENVISIT = "LASTCHATSCREENVISIT",
  NOTIFICATION_PAYLOAD = "NOTIFICATION_PAYLOAD",
  BINDING_ID = "BINDING_ID",
}

export const notificationTypes = {
  NEW_MESSAGE: "NEW_MESSAGE",
  PATIENT_TOC: "PATIENT_TOC",
  PATIENT_PROFILE: "PATIENT_PROFILE",
};

export const AuthenticationTypes = {
  TOUCHID: "TouchID",
  FACEID: "FaceID",
  BIOMETRIC: "Biometrics",
};

export enum trackStatus {
  ONTRACK = "On-Track",
  OFFTRACK = "Off-Track",
  PPROVED = "Approved",
  PENDING = "Pending",
}
export const SESSION_TIMEOUT = 1000 * 60 * 30;

export enum constants {
  MYPROFILE = "MY PROFILE",
  MYPROFILESMALL = "My Profile",
  EPISODEINFORMATION = "EPISODE INFORMATION",
  EPISODEINFORMATIONSMALL = "Episode Information",
  CAREPLAN = "CARE PLAN",
  CAREPLANSMALL = "My Care Plan",
  NAME = "Name",
  DOB = "Date of Birth",
  PHONE = "Phone",
  EDIT = "Edit",
  DONE = "Done",
  NAVIGATOR = "Navigator",
  SURGEON = "Surgeon",
  PROCEDURENAME = "Procedure Name",
  SURGERYDATE = "Surgery Date",
  PRACTICE = "Practice",
  PRACTICEPHONE = "Practice Phone",
  POSTSURGERY = "Post Surgery Plan",
  MYCAREPLAN = "My Care Plan",
  MESSAGES = "Messages",
  CONTACTS = "Contacts",
  FIRSTNAME = "First Name",
  LASTNAME = "Last Name",
  PASSWORDHINT = "min. 8 characters",
  EMAIL = "Username/Email",
  EMAILHINT = "johndoe1@email.com",
  REGISTER = "Register",
  PASSWORD = "Password",
  NODATA = "Data could not be loaded",
  REFRESH = "Click to Refresh",
  INVALIDLOGIN = "Username or Password is incorrect!!!",
  DATE = "Date",
  LOCATION = "Location",
  USERNAME = "Username",
  NEWPASSWORD = "Enter New Password",
  RESETPASSWORD = "Reset Password",
  MIN8CHAR = "Minimum length 8 characters",
  MIN1NUM = "Requires a number between 0-9",
  UPPERCASE = "Requires an upper case character",
  LOWERCASE = "Requires a lower case character",
  SPECIALCHAR = "Requires a special character i.e. @_/%!&",
  CONFIRM = "Confirm",
  REDIRECTING = "Redirecting in",
  SECONDS = "seconds",
  PWDCHANGED = "Password Changed Successfully",
  SENDOTP = "Send OTP",
  OTPTEXT = " An OTP will be sent to the mobile number associated with your account",
  OTPTEXT2 = " An OTP will be sent to the given mobile number ",
  SENTOTP = "Enter the OTP sent via SMS to your registered Mobile no. ",
  MUST = " Your password must contains",
  MOBILE = "Mobile Number",
  LOGIN = "Login",
  OOPS = "Oops!",
  HINAVIGATOR = "Say Hi to your Navigator!",
  NEWCONVERSATION = "Click here to start a conversation now.",
  TANDC = "Terms & Conditions",
  ABOUT = "ABOUT ENAV PATIENT",
  DESCRIPTION = "The ENavPatient app allows patients to message and call their care team, view health and surgery information, and see upcoming appointment locations and details.",
  SESSIONEXPIRETITLE = "Session Timed Out",
  SESSIONEXPIREMESSAGE = "Please login again to continue",
  LOG_OUT_EVENT = "LOG_OUT_EVENT",
  LOGINWITH = "Login with",
  TOUCHID = "Touch ID",
  FACEID = "Face ID",
  ENABLEBIO = "Enable Biometrics for faster login",
  ENABLEBIODESC = "By enabling this you can login to ENav Provider without your credentials.",
  ENABLETOUCHFACEID = "Enable Face ID/Touch ID",
  SKIP = "Skip",
  FACEANDTOUCHID = "Face ID/Touch ID",
  ENABLETOUCHID = "Enable Face ID/Touch ID Login",
  ENABLETOUCHIDDESC = "Through Face ID/Touch ID setup, you will be able to login to ENav Provider instantly, with any biometric saved in your device.",
  SUCCESS = "Success",
  SUCCESSENABLED = "Face ID/Touch ID has been enabled successfully. You can now use them to login.",
  SUCCESSDISABLED = "Face ID/Touch ID has been Disabled successfully.",
  TODISABLE = "To disable, please go to",
  UNDER = "under",
  OPTION = "option",
  MENU = "menu",
  GOTO = "Go to Home",
  OTPSESSIONEXPIRED = "Reset password Session Expired. Please reset again",
  NOTIFICATION = "NOTIFICATION",
  PUSHNOTIFICATION = "pushnotification",
}

export const responseStatus = "success";
