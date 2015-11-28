package com.cordova.ble;


import android.content.Context;

import com.onyxbeacon.OnyxBeaconManager;
import com.onyxbeacon.OnyxBeaconErrorListener;
import com.onyxbeacon.rest.auth.util.AuthenticationMode;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


public class Ble extends CordovaPlugin implements OnyxBeaconErrorListener,BleStateListener  {

    Context context = this.cordova.getActivity().getApplicationContext();
    private CallbackContext messageChannel;
    // OnyxBeacon SDK
    private OnyxBeaconManager beaconManager;
    private String CONTENT_INTENT_FILTER;
    private String BLE_INTENT_FILTER;
    private ContentReceiver mContentReceiver;
    private BleStateReceiver mBleReceiver;
    private boolean receiverRegistered = false;
    private boolean bleStateRegistered = false;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {


        super.initialize(cordova, webView);

        beaconManager = OnyxBeaconApplication.getOnyxBeaconManager(this);

        mContentReceiver = ContentReceiver.getInstance();

        //Register for BLE events
        mBleReceiver = BleStateReceiver.getInstance();
        mBleReceiver.setBleStateListener(this);

        BLE_INTENT_FILTER = getPackageName() + ".scan";
        registerReceiver(mBleReceiver, new IntentFilter(BLE_INTENT_FILTER));
        bleStateRegistered = true;

        CONTENT_INTENT_FILTER = getPackageName() + ".content";
        registerReceiver(mContentReceiver, new IntentFilter(CONTENT_INTENT_FILTER));
        receiverRegistered = true;
    }
    /**
     * Executes the request and returns PluginResult.
     *
     * @param action          The action to execute.
     * @param args            JSONArry of arguments for the plugin.
     * @param callbackContext The callback id used when calling back into JavaScript.
     * @return True if the action was valid, false if not.
     */
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

        if (action.equals("initSDK")) {
            beaconManager.initSDK(AuthenticationMode.CLIENT_SECRET_BASED);
            callbackContext.success("Success");
            return true;
        } else if (action.equals("isBluetoothAvailable")) {
            Boolean isBluetooth = beaconManager.isBluetoothAvailable();
            callbackContext.success(isBluetooth ? 1 : 0);
            return true;
        } else if (action.equals("enableBluetooth")) {
            beaconManager.enableBluetooth();
            callbackContext.success("Success");
            return true;
        } else if (action.equals("getTags")) {
            beaconManager.getTags();
            callbackContext.success("Success");
            return true;
        } else if (action.equals("sendGenericUserProfile")) {
            beaconManager.sendGenericUserProfile(args.getString(0));
            callbackContext.success("Success");
            return true;
        } else if (action.equals("setForegroundMode")) {
            beaconManager.setForegroundMode(args.getBoolean(0));
            callbackContext.success("Success");
            return true;
        } else if (action.equals("setBackgroundBetweenScanPeriod")) {
            beaconManager.setBackgroundBetweenScanPeriod(args.getLong(0));
            callbackContext.success("Success");
            return true;
        } else if (action.equals("startScan")) {
            beaconManager.startScan();
            callbackContext.success("Success");
            return true;
        } else if (action.equals("stopScan")) {
            beaconManager.stopScan();
            callbackContext.success("Success");
            return true;
        } else if (action.equals("isInForeground")) {
            Boolean isInForeground = beaconManager.isInForeground();
            callbackContext.success(isInForeground ? 1 : 0);
            return true;
        }else if (action.equals("deleteCoupon")) {
            beaconManager.deleteCoupon(args.getLong(0),args.getInt(1) );
            callbackContext.success("Success");
            return true;
        }else if (action.equals("markAsTapped")) {
            beaconManager.markAsTapped(args.getLong(0));
            callbackContext.success("Success");
            return true;
        }else if (action.equals("markAsOpened")) {
            beaconManager.markAsOpened(args.getLong(0));
            callbackContext.success("Success");
            return true;
        } else if (action.equals("isCouponEnabled")) {
            Boolean isCouponEnabled = beaconManager.isCouponEnabled();
            callbackContext.success(isCouponEnabled ? 1 : 0);
            return true;
        }else if (action.equals("isAPIEnabled")) {
            Boolean isAPIEnabled = beaconManager.isAPIEnabled();
            callbackContext.success(isAPIEnabled ? 1 : 0);
            return true;
        } else if (action.equals("setCouponEnabled")) {
            beaconManager.setCouponEnabled(args.getBoolean(0));
            callbackContext.success("Success");
            return true;
        } else if (action.equals("setLocationTrackingEnabled")) {
            beaconManager.setLocationTrackingEnabled(args.getBoolean(0));
            callbackContext.success("Success");
            return true;
        } else if (action.equals("logOut")) {
            beaconManager.logOut();
            callbackContext.success("Success");
            return true;
        }  else if (action.equals("restartLocationTracking")) {
            beaconManager.restartLocationTracking();
            callbackContext.success("Success");
            return true;
        } else if (action.equals("enableGeofencing")) {
            beaconManager.enableGeofencing(args.getBoolean(0));
            callbackContext.success("Success");
            return true;
        } else if (action.equals("setAPIContentEnabled")) {
            beaconManager.setAPIContentEnabled(args.getBoolean(0));
            callbackContext.success("Success");
            return true;
        }else if (action.equals("sendDeviceToken")) {
            beaconManager.sendDeviceToken(args.getString(0), args.getString(1));
            callbackContext.success("Success");
            return true;
        }else if (action.equals("setAuthExtraData")) {
            beaconManager.setAuthExtraData(args.getString(0));
            callbackContext.success("Success");
            return true;
        }else if (action.equals("setTagsFilterForCoupons")) {



            ArrayList<Tag> tagsFilter = new ArrayList<Tag>();

            for (int i = 0 ; i < args.length(); i++) {

                JSONArray arg = args.getJSONArray(i);
                Tag rtag = new Tag();
                rtag.id = arg.getInt(0);
                rtag.name = arg.getString(1);
                rtag.state  = arg.getString(2);

                tagsFilter.add(rtag);
            }
            beaconManager.setTagsFilterForCoupons(tagsFilter);
            callbackContext.success("Success");
            return true;
        }
        /* Unknown methods */
        else if (action.equals("sendReport")) {
            String reporter = args.getString(0);
            beaconManager.sendLogs(reporter);
            callbackContext.success("sendUserMetrics Invoked");
            return true;
        } else {
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

    @Override
    public void onBleStackEvent(int event) {
        System.out.println(event);
        switch (event) {
            case 1:
                onError(event,"Probably your bluetooth stack has crashed. Please restart your bluetooth”);
                break;
            case 2:
                 onError(event, "Beacons with invalid RSSI detected. Please restart your bluetooth.”);
             break;
 onError(event, “This Error is unknown“)
		default:break;

        }
    }


    public void onResume() {
        super.onResume();

        if(mBleReceiver == null) mBleReceiver = BleStateReceiver.getInstance();
        registerReceiver(mContentReceiver, new IntentFilter(CONTENT_INTENT_FILTER));
        receiverRegistered = true;

        if (mContentReceiver == null) mContentReceiver = ContentReceiver.getInstance();
        registerReceiver(mContentReceiver, new IntentFilter(CONTENT_INTENT_FILTER));
        receiverRegistered = true;

        if (mManager.isBluetoothAvailable()) {
            // Enable scanner in foreground mode and register receiver
            mManager.setForegroundMode(true);
        } else {
            Toast.makeText(this, "Please turn on bluetooth", Toast.LENGTH_LONG).show();
        }


    }

    public void onPause() {
        super.onPause();
        // Set scanner in background mode
        mManager.setForegroundMode(false);
        // Unregister content receiver

        if(bleStateRegistered){
            unregisterReceiver(mBleReceiver);
            bleStateRegistered = false;
        }

    }

}
