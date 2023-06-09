


//
//  Utils.m
//  physicianAppProvider
//
//  Created by Deepak Narang on 10/08/22.
//

#import <Foundation/Foundation.h>
#import "Utils.h"
#import <Firebase.h>
@import UIKit;
#import <Foundation/Foundation.h>

@implementation Utils

+ (Boolean) setEncryptedStorage:(NSString*)key data:(NSString*)value {
  NSData* dataFromValue = [value dataUsingEncoding:NSUTF8StringEncoding];
  NSDictionary* storeQuery = @{
    (__bridge id)kSecClass : (__bridge id)kSecClassGenericPassword,
    (__bridge id)kSecAttrAccount : key,
            (__bridge id)kSecValueData : dataFromValue
  };
  SecItemDelete((__bridge CFDictionaryRef)storeQuery);
   OSStatus insertStatus = SecItemAdd((__bridge CFDictionaryRef)storeQuery, nil);
  if(insertStatus==noErr){
    return YES;
  }else return NO;
}

+ (NSString *)getEncryptedStorage:(NSString*)key{
  NSDictionary* getQuery = @{
           (__bridge id)kSecClass : (__bridge id)kSecClassGenericPassword,
           (__bridge id)kSecAttrAccount : key,
           (__bridge id)kSecReturnData : (__bridge id)kCFBooleanTrue,
           (__bridge id)kSecMatchLimit : (__bridge id)kSecMatchLimitOne
       };
  CFTypeRef dataRef = NULL;
  NSString* storedValue=@"";
  OSStatus getStatus = SecItemCopyMatching((__bridge CFDictionaryRef)getQuery, &dataRef);
  if (getStatus == errSecSuccess) {
    storedValue= [[NSString alloc] initWithData: (__bridge NSData*)dataRef encoding: NSUTF8StringEncoding];
      }
  return storedValue;
}

+ (NSString *)convertJsonToString:(NSDictionary *)json{
  NSData *jsonData = [NSJSONSerialization dataWithJSONObject:json options:0 error:nil];
  NSString * myString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
  return myString;
}

+ (NSArray *) convertStringToJsonArray:(NSString *)str{
  NSString *strJson =[str mutableCopy];
  NSData* data = [strJson dataUsingEncoding:NSUTF8StringEncoding];
  NSArray *jsonObject = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
  return jsonObject;
}

+ (NSDictionary *)findFirstIndexOf: (NSArray *)arr  key:(NSString *)key value:(NSString *)value{
  for (NSDictionary *item in arr) {
  NSString *str =[[item valueForKey:key] stringValue];
  if([str isEqualToString:value]){
    return item;
     break;
  }
  else continue;
  }
  return nil;
}

+(NSDate *) convertStringToDate:(NSString *)date{
  NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ss.SSSZ"];
    return [dateFormatter dateFromString:date];
}

+(void)getnoOfnotificationsWithCategory{
  NSMutableArray *notifyIDList = [NSMutableArray array];
  [[UNUserNotificationCenter currentNotificationCenter] getDeliveredNotificationsWithCompletionHandler:^(NSArray<UNNotification *> * _Nonnull notifications) {
    if(notifications.count>0){
      for (UNNotification* notification in notifications) {
        NSString *notificationID = notification.request.identifier;
        NSArray *listItems = [notificationID componentsSeparatedByString:@""];
        [notifyIDList addObject:[listItems objectAtIndex:0]];
      }
      dispatch_async(dispatch_get_main_queue(), ^{
        UIApplication.sharedApplication.applicationIconBadgeNumber = [notifyIDList count];
      });
    }else dispatch_async(dispatch_get_main_queue(), ^{
      UIApplication.sharedApplication.applicationIconBadgeNumber = 0;
    });
  }];
    
}

@end

