package com.episodesolutions.enavpatient;

import android.app.ActivityManager;
import android.content.ComponentName;
import android.content.SharedPreferences;
import android.nfc.Tag;
import android.os.CountDownTimer;
import android.os.Looper;
import android.util.Log;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import android.os.Build;
import android.app.NotificationChannel;
import android.app.NotificationManager;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

import android.content.Intent;
import android.app.PendingIntent;
import android.app.Notification;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;
import android.graphics.Color;
import android.webkit.URLUtil;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import android.os.Handler;



public class FcmMessaging extends FirebaseMessagingService {

    private final static String TAG = "FCM Logs::::";
    private final static String CHANNEL_ID = "ENAVPATIENTNOTIFICATION";

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        try {
            Map<String, String> params = remoteMessage.getData();
            String title = params.get("title");
            String body = params.get("body");
            String actionType = params.get("actionType");
            String actionEntityId = params.get("actionEntityId");
            String dateInsertedTimeStamp = params.get("dateInsertedTimeStamp");

            SharedPreferences preferences = EncriptedStorageEditor.getEncryptedEditor(this.getApplicationContext());
            String localConversationID = preferences.getString(Enums.CONVERSATION_ID_KEY, "");
            String astChatVisitTimeStamps = preferences.getString(Enums.LASTCHATSCREENVISIT, "");
            Log.d(TAG,"Conversation ID: "+remoteMessage.getData().toString()+localConversationID);


            JSONObject json = new JSONObject(params);
            MainApplication application = (MainApplication) this.getApplication();
            ReactNativeHost reactNativeHost = application.getReactNativeHost();
            ReactInstanceManager reactInstanceManager = reactNativeHost.getReactInstanceManager();
            ReactContext reactContext = reactInstanceManager.getCurrentReactContext();
            if(AppState.getState()) {
                    if (actionType.equals(Enums.NEW_MESSAGE)) {
                        if(!localConversationID.equals(actionEntityId)) {
                            if (astChatVisitTimeStamps.equals("")) {
                                reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                        .emit("getAllConversations", "event triggered");
                                createNotificationChannel(params);
    
                            } else {
                                JSONArray array = Utils.convertStringToJsonArray(astChatVisitTimeStamps);
                                if (array != null) {
                                    JSONObject item = Utils.findIndexOf("convoID", actionEntityId, array);
                                    if (item != null) {
                                        String lastVisitTime = item.getString("lastVisitTime");
                                        Date notify = Utils.convertStringToDate(dateInsertedTimeStamp);
                                        Date visitTime = Utils.convertStringToDate(lastVisitTime);
                                        if (notify.compareTo(visitTime) > 0) {
                                            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                                    .emit("getAllConversations", "event triggered");
                                            createNotificationChannel(params);
                                        }
                                    }else{
                                        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                                .emit("getAllConversations", "event triggered");
                                        createNotificationChannel(params);
                                    }
                                }
                            }
                        }
                    } else if (actionType.equals(Enums.PATIENT_TOC)) {
                    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("carePlanEvent", "event triggered");
                    createNotificationChannel(params);
                } else if (actionType.equals(Enums.PATIENT_PROFILE)) {
                    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("getEpisodeListEvent", "event triggered");
                            final Handler handler = new Handler(Looper.getMainLooper());
                            Log.d("patient profile","work before delay");
                            handler.postDelayed(new Runnable() {
                            @Override
                            public void run() {
                                // Do something after 5s = 5000ms
                                Log.d("patient profile","work after delay");
                                try {
                                    createNotificationChannel(params);
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                            }
                            }, 1000*300);
                }
            }else createNotificationChannel(params);

        } catch (Exception e) {
            Log.i(TAG, "error is " + e);
        }
    }


        @Override
    public void onNewToken(String s) {
        super.onNewToken(s);
        Log.d(TAG, "FCM Token received: " + s);
        SharedPreferences preferences = EncriptedStorageEditor.getEncryptedEditor(this.getApplicationContext());
        SharedPreferences.Editor editor = preferences.edit();
        editor.putString("FCM_TOKEN_KEY", s);
        editor.apply();
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    private void createNotificationChannel(Map<String, String> params) throws JSONException {
        String title = params.get("title");
        String body = params.get("body");
        String actionType = params.get("actionType");
        String actionEntityId = params.get("actionEntityId");
        JSONObject json = new JSONObject(params);
        Intent notificationIntent = new Intent(this, MainActivity.class);
        notificationIntent.putExtra("notificationPayload",json.toString(2));
        notificationIntent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent contentIntent = PendingIntent.getActivity(this, (int) System.currentTimeMillis(), notificationIntent, PendingIntent.FLAG_UPDATE_CURRENT);
        NotificationManager manager = null;
        manager = getSystemService(NotificationManager.class);


        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel serviceChannel = new NotificationChannel(CHANNEL_ID, "Foreground Service Channel",
            NotificationManager.IMPORTANCE_HIGH);
            manager.createNotificationChannel(serviceChannel);
        }
        boolean valid = URLUtil.isValidUrl(body);
        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle(title)
                .setContentText(valid ? "Attachment" : body)
                .setAutoCancel(true)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setDefaults(Notification.DEFAULT_ALL)
                .setPriority(Notification.PRIORITY_HIGH)
                .setContentIntent(contentIntent)
                .setColor(Color.WHITE)
                .setVibrate(new long[] { 100, 200, 300, 400, 500, 400, 300, 200, 400 })
                .build();
                int id;
                String notifyTag = actionEntityId;
                try{
                    int num= ThreadLocalRandom.current().nextInt(10000, 1000000);
                    if(actionType.equals(Enums.NEW_MESSAGE)) {
                        id = Integer.parseInt(actionEntityId+""+ num);
                        notifyTag = actionEntityId+"episodesolutions"+ num;
                    }else if(actionType.equals(Enums.PATIENT_TOC)){
                        String intakeID=actionEntityId.split(",")[0];
                        Log.d(TAG,intakeID);
                        id=Integer.parseInt(intakeID);
                        Log.d(TAG,Integer.toString(id));
                        notifyTag = intakeID+"episodesolutions"+ num;
                    }
                    else id= Integer.parseInt(actionEntityId);
                }catch (NumberFormatException e){
                    id =1;
                }

                manager.notify(notifyTag,id, notification);
    }
}