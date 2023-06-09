#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <Firebase.h>
#import "NativeEventManager.h"
#import "Utils.h"

#import <React/RCTAppSetupUtils.h>

#if RCT_NEW_ARCH_ENABLED
#import <React/CoreModulesPlugins.h>
#import <React/RCTCxxBridgeDelegate.h>
#import <React/RCTFabricSurfaceHostingProxyRootView.h>
#import <React/RCTSurfacePresenter.h>
#import <React/RCTSurfacePresenterBridgeAdapter.h>
#import <ReactCommon/RCTTurboModuleManager.h>

#import <react/config/ReactNativeConfig.h>

@interface AppDelegate () <RCTCxxBridgeDelegate, RCTTurboModuleManagerDelegate> {
  RCTTurboModuleManager *_turboModuleManager;
  RCTSurfacePresenterBridgeAdapter *_bridgeAdapter;
  std::shared_ptr<const facebook::react::ReactNativeConfig> _reactNativeConfig;
  facebook::react::ContextContainer::Shared _contextContainer;
}
@end
#endif

@implementation AppDelegate
bool isGrantedNotificationAccess;
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions

{
  
  
  RCTAppSetupPrepareApp(application);

 //====================== Firebase Configration ===================
  [FIRApp configure];
  [FIRMessaging messaging].delegate = self;
  isGrantedNotificationAccess=false;
  UNUserNotificationCenter *center = [UNUserNotificationCenter           currentNotificationCenter];
  center.delegate=self;
  if ([UNUserNotificationCenter class] != nil) {
      [UNUserNotificationCenter currentNotificationCenter].delegate = self;
    
    UNAuthorizationOptions authOptions = UNAuthorizationOptionAlert         +UNAuthorizationOptionSound+UNAuthorizationOptionBadge;
      [[UNUserNotificationCenter currentNotificationCenter]
          requestAuthorizationWithOptions:authOptions
          completionHandler:^(BOOL granted, NSError * _Nullable error) {
        isGrantedNotificationAccess = granted;
          }];
    } else {
      UNAuthorizationOptions allNotificationTypes = UNAuthorizationOptionAlert         +UNAuthorizationOptionSound+UNAuthorizationOptionBadge;
      UIUserNotificationSettings *settings =
      [UIUserNotificationSettings settingsForTypes:allNotificationTypes categories:nil];
      [application registerUserNotificationSettings:settings];
    }
  isGrantedNotificationAccess=true;
    [application registerForRemoteNotifications];
  
  //========================End firebase configuration ===================

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"ENavPatient"
                                            initialProperties:nil];
  

  if (@available(iOS 13.0, *)) {
      rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
      rootView.backgroundColor = [UIColor whiteColor];
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  UIApplication.sharedApplication.applicationIconBadgeNumber = -1;
}

//=========================== Firebase Functions ======================
- (NSString *)fetchDeviceToken:(NSData *)deviceToken {
    NSUInteger len = deviceToken.length;
    if (len == 0) {
        return nil;
    }
    const unsigned char *buffer = deviceToken.bytes;
    NSMutableString *hexString  = [NSMutableString stringWithCapacity:(len * 2)];
    for (int i = 0; i < len; ++i) {
        [hexString appendFormat:@"%02x", buffer[i]];
    }
    return [hexString copy];
}

+ (BOOL) appRegisterForPushNotification {
       if ([[UIApplication sharedApplication] respondsToSelector:@selector(currentUserNotificationSettings)]) {
           UIUserNotificationType types = [[[UIApplication sharedApplication] currentUserNotificationSettings] types];
           return ((types & UIUserNotificationTypeAlert));
       }
       return NO;
   }
   
- (void)application:(UIApplication *)application
    didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    NSString *str2 = [self fetchDeviceToken:deviceToken];
     NSLog(@"devicetoken isssss: %@", str2);
    [Utils setEncryptedStorage:@"FCM_TOKEN_KEY" data:str2];
    [FIRMessaging messaging].APNSToken = deviceToken;
}

- (void)messaging:(FIRMessaging *)messaging didReceiveRegistrationToken:(NSString *)fcmToken {
   NSLog(@"FCM registration token: %@", fcmToken);
}


- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request
                   withContentHandler:(void (^)(UNNotificationContent *contentToDeliver))contentHandler{
  NSLog(@"silent didReceiveNotificationRequest: %@", request);
}


- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
    fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
  [[FIRMessaging messaging] appDidReceiveMessage:userInfo];
  NSLog(@"didReceiveRemoteNotification %@", userInfo);
  [self checkNotification:userInfo];
}


- (void)checkNotification:(NSDictionary *)userInfo {
  NSLog(@"silent notification: %@", userInfo);
  NSString *actionType = [userInfo valueForKey:@"actionType"];
  NSString *title = [userInfo valueForKey:@"title"];
  NSString *body = [userInfo valueForKey:@"body"];
  NSString *dateInsertedTimeStamp = [userInfo valueForKey:@"dateInsertedTimeStamp"];
  
  NSString *actionEntityId = [userInfo valueForKey:@"actionEntityId"];
  NSString *storedValue = [Utils getEncryptedStorage:@"CONVERSATION_ID_KEY"];
  NSString *chatVisitTime = [Utils getEncryptedStorage:@"LASTCHATSCREENVISIT"];
  if([actionType isEqualToString:@"NEW_MESSAGE"]){
    if(storedValue!=actionEntityId){
      if([chatVisitTime isEqualToString:@""]){
          NativeEventManager *event = [[NativeEventManager alloc] init];
          [event calendarEventReminderReceived];
          [AppDelegate showNotification: title valuestr2:body data: userInfo];
      }else{
        NSArray *chatTimeStampsArr = [Utils convertStringToJsonArray:chatVisitTime];
        if(chatTimeStampsArr){
          NSDictionary *timeStampObj = [Utils findFirstIndexOf:chatTimeStampsArr key:@"convoID" value:actionEntityId];
          NSString *visitTime = [timeStampObj valueForKey:@"lastVisitTime"];
          NSDate *notify = [Utils convertStringToDate:dateInsertedTimeStamp];
          NSDate *visit = [Utils convertStringToDate:visitTime];
          if([notify compare:visit]>=0){
            NativeEventManager *event = [[NativeEventManager alloc] init];
            [event calendarEventReminderReceived];
            [AppDelegate showNotification: title valuestr2:body data: userInfo];
          }
        }
      }
    }
  }else if([actionType isEqualToString:@"PATIENT_TOC"]){
    NativeEventManager *event = [[NativeEventManager alloc] init];
    [event carePlanEvent];
    [AppDelegate showNotification: title valuestr2:body data: userInfo];
  }else if([actionType isEqualToString:@"PATIENT_PROFILE"]){
    NativeEventManager *event = [[NativeEventManager alloc] init];
    [event patientProfileEvent];
    NSLog(@" some work before delay");
    NSTimeInterval delayInSeconds = 300.0;
        dispatch_time_t popTime = dispatch_time(DISPATCH_TIME_NOW, (int64_t)(delayInSeconds * NSEC_PER_SEC));
        dispatch_after(popTime, dispatch_get_main_queue(), ^(void){
          NSLog(@"work done after delay");
          [AppDelegate showNotification: title valuestr2:body data:userInfo];
        });
      }
      else [AppDelegate showNotification:title valuestr2:body data:userInfo];
}



+ (void) showNotification: (NSString*)title valuestr2: (NSString*)body data:(NSDictionary *) userInfo {

  if(isGrantedNotificationAccess && [AppDelegate appRegisterForPushNotification] ){
    UNMutableNotificationContent *content = [[UNMutableNotificationContent             alloc] init];
    NSString *actionEntityId = [userInfo valueForKey:@"actionEntityId"];
    NSString *actionType = [userInfo valueForKey:@"actionType"];
    NSString *dateInsertedTimeStamp = [userInfo valueForKey:@"dateInsertedTimeStamp"];
    if([actionType isEqualToString:@"NEW_MESSAGE"]){
      NSTimeInterval milliseconds = [[NSDate date] timeIntervalSince1970];
      NSString *seconds = [NSString stringWithFormat:@"%f",milliseconds];
      actionEntityId =[NSString stringWithFormat:@"%@%@%@", actionEntityId,@"episode", seconds];
    }else if([actionType isEqualToString:@"PATIENT_TOC"]){
      NSTimeInterval milliseconds = [[NSDate date] timeIntervalSince1970];
      NSString *seconds = [NSString stringWithFormat:@"%f",milliseconds];
      NSArray<NSString *> *listItems=[actionEntityId componentsSeparatedByString:@","];
      NSString *intakeID=[listItems objectAtIndex:0];
      NSLog(@"devicetoken isssss: %@", intakeID);
      actionEntityId =[NSString stringWithFormat:@"%@%@%@", intakeID,@"episode", seconds];
    }
    NSURLRequest *req = [NSURLRequest requestWithURL:[NSURL URLWithString:body]];
    bool valid = [NSURLConnection canHandleRequest:req];
   
    content.title = title;
    content.body = valid ? @"Attachment" : body;
    content.userInfo=userInfo;
    content.sound = [UNNotificationSound defaultSound];
    
    UNTimeIntervalNotificationTrigger* trigger = [UNTimeIntervalNotificationTrigger
                triggerWithTimeInterval:1 repeats:NO];  
    UNNotificationRequest *request = [UNNotificationRequest requestWithIdentifier:actionEntityId content:content trigger:trigger];
    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
    [center addNotificationRequest:request withCompletionHandler:nil];
    
    dispatch_time_t delay = dispatch_time(DISPATCH_TIME_NOW, NSEC_PER_SEC * 1);
        if([[UIApplication sharedApplication] applicationState] == UIApplicationStateBackground){
          UIApplication.sharedApplication.applicationIconBadgeNumber = UIApplication.sharedApplication.applicationIconBadgeNumber+1;
        }
  }
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler {
  UNNotificationPresentationOptions presentationOptions = UNNotificationPresentationOptionSound+UNNotificationPresentationOptionAlert;
  NSLog(@"willPresentNotification");
  completionHandler(presentationOptions);
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       didReceiveNotificationResponse:(UNNotificationResponse *)response
       withCompletionHandler:(void (^)(void))completionHandler {
  NSDictionary *userInfo = response.notification.request.content.userInfo;
  completionHandler();
  NSString *stringData = [Utils convertJsonToString:userInfo];
  [Utils setEncryptedStorage:@"NOTIFICATION_PAYLOAD" data:stringData];
  NativeEventManager *event = [[NativeEventManager alloc] init];
  NSLog(@"onClickNotification");
  [event onClickNotification:stringData];
 }

//======================================================================

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" ];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
