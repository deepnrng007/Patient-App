package com.episodesolutions.enavpatient;

import android.app.NotificationManager;
import android.app.StatusBarManager;
import android.service.notification.StatusBarNotification;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class JSToNativeEventModule extends ReactContextBaseJavaModule {
    ReactApplicationContext reactContext;
    JSToNativeEventModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "JSToNativeEventModule";
    }

    @ReactMethod
    public void removeNotification(String identifier) {
        try{
            NotificationManager manager = reactContext.getSystemService(NotificationManager.class);
            for(StatusBarNotification notification : manager.getActiveNotifications()){
                String notifyId =Integer.toString(notification.getId());
                String notifyTag = notification.getTag();
                Log.d("FCM Logs::::",notifyId);
                Log.d("FCM Logs::::",notifyTag);
                Log.d("FCM Logs::::",identifier);
                if(notifyId.startsWith(identifier) && notifyTag.split("episodesolutions")[0].equals(identifier)){
                    manager.cancel(notifyTag,Integer.parseInt(notifyId));
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
