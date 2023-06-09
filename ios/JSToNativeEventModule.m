//
//  JSToNativeEventModule.m
//  physicianAppProvider
//
//  Created by Mukthahar Shaik on 01/09/22.
//

#import <Foundation/Foundation.h>
#import "JSToNativeEventModule.h"
#import <Firebase.h>

@implementation JSToNativeEventModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(removeNotification:(NSString *)identifier){
  [[UNUserNotificationCenter currentNotificationCenter] getDeliveredNotificationsWithCompletionHandler:^(NSArray<UNNotification *> * _Nonnull notifications) {
    for (UNNotification* notification in notifications) {
      NSString *notificationID = notification.request.identifier;
      NSArray *listItems = [notificationID componentsSeparatedByString:@"episode"];
      if([identifier isEqualToString:[listItems objectAtIndex:0]]) {
        [[UNUserNotificationCenter currentNotificationCenter] removeDeliveredNotificationsWithIdentifiers:@[notificationID]];
      }
    }
    
  }];
}

@end

