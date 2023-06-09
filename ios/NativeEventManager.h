#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface NativeEventManager : RCTEventEmitter <RCTBridgeModule>
-(void)calendarEventReminderReceived;
-(void)carePlanEvent;
-(void)patientProfileEvent;
-(void)onClickNotification:(NSString *)userInfo;
@end
