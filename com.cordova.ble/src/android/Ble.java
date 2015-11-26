package com.cordova.ble;


import android.content.Context;
import com.onyxbeacon.OnyxBeaconManager;
import com.onyxbeacon.OnyxBeaconErrorListener;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Objects;

public class Ble extends CordovaPlugin implements OnyxBeaconErrorListener {

    Context context = this.cordova.getActivity().getApplicationContext();
    private CallbackContext messageChannel;
    // OnyxBeacon SDK
    private OnyxBeaconManager beaconManager;

    /**
     * Executes the request and returns PluginResult.
     *
     * @param action            The action to execute.
     * @param args              JSONArry of arguments for the plugin.
     * @param callbackContext   The callback id used when calling back into JavaScript.
     * @return                  True if the action was valid, false if not.
     */
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if(action.equals("startServiceWithClientID")){
            String clientId = args.getString(0);
            String clientSecret = args.getString(1);
            callbackContext.success("startServiceWithClientID Invoked");
            return true;
        }
        else if(action.equals("didRangeBeacons")){
            JSONObject beacons = args.getJSONObject(0);
            callbackContext.success("didRangeBeacons Invoked");
            return true;
        }
        else if(action.equals("version")){
            callbackContext.success("Version Invoked");
            return true;
        }
        else if(action.equals("sendUserMetrics")){
            JSONObject user = args.getJSONObject(0);
            callbackContext.success("sendUserMetrics Invoked");
            return true;
        }
        else if(action.equals("sendReport")){
            String reporter = args.getString(0);
            beaconManager.sendLogs(reporter);
            callbackContext.success("sendUserMetrics Invoked");
            return true;
        }
        else if(action.equals("viewControllerForTags")){
            callbackContext.success("viewControllerForTags Invoked");
            return true;
        }
        else if(action.equals("applicationDidEnterBackground")){
            callbackContext.success("applicationDidEnterBackground Invoked");
            return true;
        }
        else if(action.equals("applicationWillEnterForeground")){
            callbackContext.success("applicationWillEnterForeground Invoked");
            return true;
        }
        else if(action.equals("setLogger")){
            callbackContext.success("setLogger Invoked");
            return true;
        }
        else if(action.equals("requestWhenInUseAuthorization")){
            callbackContext.success("requestWhenInUseAuthorization Invoked");
            return true;
        }
        else {
            return false;
        }
    }
    public void onError(int errorCode, Exception e) {
        PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, e.toString());
        pluginResult.setKeepCallback(true);
        if (messageChannel != null) {
            messageChannel.sendPluginResult(pluginResult);
        }
    }

}
