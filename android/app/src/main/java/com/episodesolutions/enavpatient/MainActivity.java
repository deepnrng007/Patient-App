package com.episodesolutions.enavpatient;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.RequiresApi;

import org.json.JSONObject;

import java.util.HashMap;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ENavPatient";
  }

  @Override
  public void onDestroy() {
    super.onDestroy();
    AppState.setState(false);
    Log.d("activity","activity destroyed");
    SharedPreferences preferences = EncriptedStorageEditor.getEncryptedEditor(this.getApplicationContext());
    SharedPreferences.Editor editor = preferences.edit();
    editor.remove("CONVERSATION_ID_KEY");
    editor.commit();

  }

  @Override
  public void onCreate(Bundle savedInstanceState)
  {
    AppState.setState(true);
    super.onCreate(savedInstanceState);
    Bundle extras = getIntent().getExtras();
    if(extras!=null) {
      if (extras.containsKey("notificationPayload")) {
        String notificationPayload = extras.getString("notificationPayload");
        SharedPreferences preferences = EncriptedStorageEditor.getEncryptedEditor(this.getApplicationContext());
        SharedPreferences.Editor editor = preferences.edit();
        editor.putString(Enums.NOTIFICATION_PAYLOAD,notificationPayload);
        editor.commit();
      }
    }
  }


  @Override
  public void onNewIntent(Intent intent) {
    Bundle extras = intent.getExtras();
    if (extras != null) {
      if (extras.containsKey("notificationPayload")) {
        try {
          String data = extras.getString("notificationPayload");
          MainApplication application = (MainApplication) this.getApplication();
          ReactNativeHost reactNativeHost = application.getReactNativeHost();
          ReactInstanceManager reactInstanceManager = reactNativeHost.getReactInstanceManager();
          ReactContext reactContext = reactInstanceManager.getCurrentReactContext();
          reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                  .emit("onClickNotificationEvent", data);
        } catch (Exception e) {
          e.printStackTrace();
        }
      }

    }
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the rendered you wish to use (Fabric or the older renderer).
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new MainActivityDelegate(this, getMainComponentName());
  }

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }
  }
}
