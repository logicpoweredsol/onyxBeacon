package com.cordova.ble;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.TaskStackBuilder;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.media.RingtoneManager;
import android.net.Uri;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.onyxbeacon.OnyxBeaconApplication;
import com.onyxbeacon.couponbeacondemo7.R;
import com.onyxbeacon.couponbeacondemo7.activity.MainActivity;
import com.onyxbeacon.listeners.OnyxBeaconsListener;
import com.onyxbeacon.listeners.OnyxCouponsListener;
import com.onyxbeacon.listeners.OnyxPushListener;
import com.onyxbeacon.listeners.OnyxTagsListener;
import com.onyxbeacon.model.Tag;
import com.onyxbeacon.model.web.BluemixApp;
import com.onyxbeacon.rest.model.Coupon;
import com.onyxbeaconservice.IBeacon;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created by Work 2 on 4/2/2015.
 */
public class ContentReceiver extends BroadcastReceiver {

    private OnyxBeaconsListener mOnyxBeaconListener;
    private OnyxCouponsListener mOnyxCouponsListener;
    private OnyxTagsListener mOnyxTagsListener;
    private OnyxPushListener mOnyxPushListener;
    private static ContentReceiver sInstance;

    /* Coupons */
    private static String COUPONS_TAG = "coupons_tag";
    private SharedPreferences mSharedPref;
    private Gson gson = new Gson();
    private static final String COUPONS_LIST_ENTRY = "couponsList";
    private static final String COUPONS_NEW_COUNTER = "couponsNewCounter";
    private static final String SHARED_PREF_NO_ENTRY = "noEntry";

    public ContentReceiver() {}

    public static ContentReceiver getInstance() {
        if (sInstance == null) {
            sInstance = new ContentReceiver();
            return sInstance;
        } else {
            return sInstance;
        }
    }

    public void setOnyxBeaconsListener(OnyxBeaconsListener onyxBeaconListener) {
        mOnyxBeaconListener = onyxBeaconListener;
    }

    public void setOnyxCouponsListener(OnyxCouponsListener onyxCouponsListener) {
        mOnyxCouponsListener = onyxCouponsListener;
    }

    public void setOnyxTagsListener(OnyxTagsListener onyxTagsListener){
        mOnyxTagsListener = onyxTagsListener;
    }

    public void setOnyxPushListener(OnyxPushListener onyxPushListener) {
        mOnyxPushListener = onyxPushListener;
    }

    public void onReceive(Context context, Intent intent) {
        String payloadType = intent.getStringExtra(OnyxBeaconApplication.PAYLOAD_TYPE);

        switch (payloadType) {
            case OnyxBeaconApplication.TAG_TYPE:
                ArrayList<Tag> tagsList = intent.getParcelableArrayListExtra(OnyxBeaconApplication.EXTRA_TAGS);
                if (mOnyxTagsListener != null) {
                    mOnyxTagsListener.onTagsReceived(tagsList);
                } else {
                    // In background display notification
                }
                break;
            case OnyxBeaconApplication.BEACON_TYPE:
                ArrayList<IBeacon> beacons = intent.getParcelableArrayListExtra(OnyxBeaconApplication.EXTRA_BEACONS);
                if (mOnyxBeaconListener != null) {
                    mOnyxBeaconListener.didRangeBeaconsInRegion(beacons);
                } else {
                    // In background display notification
                }
                break;
            case OnyxBeaconApplication.COUPON_TYPE:

                mSharedPref = context.getSharedPreferences("COUPONS_PREF",
                        Context.MODE_PRIVATE);
                NotificationManager notificationManager =
                        (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
                ArrayList<Coupon> coupons = intent.getParcelableArrayListExtra(OnyxBeaconApplication.EXTRA_COUPONS);
                IBeacon beacon = intent.getParcelableExtra(OnyxBeaconApplication.EXTRA_BEACON);

                System.out.println("BUZZ beacon " + gson.toJson(beacon));
                /*OnyxBeaconManager manager = OnyxBeaconApplication.getOnyxBeaconManager(context);
                for (int i=0; i<3; ++i) {
                    manager.buzz(beacon, new byte[]{1, 0, 1, 1, 0, 0, 1, 1});
                }*/


                if (coupons == null || coupons.size() == 0) {
                } else {
                    String couponsListAsString = mSharedPref.getString(COUPONS_LIST_ENTRY, SHARED_PREF_NO_ENTRY);
                    ArrayList<Coupon> couponsFromStorage = new ArrayList<Coupon>();
                    ArrayList<Coupon> newCoupons = new ArrayList<Coupon>();
                    if (!couponsListAsString.equals(SHARED_PREF_NO_ENTRY)) {
                        couponsFromStorage = (ArrayList<Coupon>)gson.fromJson(couponsListAsString, new TypeToken<List<Coupon>>() {
                        }.getType());
                    }

                    ArrayList<Coupon> newCouponsList = new ArrayList<Coupon>();
                    for (Coupon cp : coupons) {
                        if (!couponsFromStorage.contains(cp)) {
                            newCouponsList.add(cp);
                        }
                    }
                    couponsFromStorage.addAll(newCouponsList);

                    TaskStackBuilder stackBuilder = TaskStackBuilder.create(context);
                    Intent i = new Intent(context, MainActivity.class);
                    i.putParcelableArrayListExtra(MainActivity.EXTRA_COUPONS, coupons);
                    stackBuilder.addNextIntent(i);
                    PendingIntent resultPendingIntent = stackBuilder.getPendingIntent(0, PendingIntent.FLAG_UPDATE_CURRENT);

                    Uri notificationSound = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
                    long[] vibratePattern = {500, 500, 500, 500};
                    for (Iterator<Coupon> ci = coupons.iterator(); ci.hasNext();) {
                        Coupon c = ci.next();
                        Notification.Builder builder =
                                new Notification.Builder(context)
                                        .setContentTitle(c.name)
                                        .setContentText(c.message)
                                        .setSmallIcon(R.drawable.ic_launcher)
                                        .setAutoCancel(true)
                                        .setVibrate(vibratePattern)
                                        .setLights(Color.BLACK, 500, 500)
                                        .setSound(notificationSound);

                        builder.setContentIntent(resultPendingIntent);
                        notificationManager.notify(COUPONS_TAG, 1, builder.build());
                    }

                    if (mOnyxCouponsListener != null) {
                        mOnyxCouponsListener.onCouponsReceived(coupons, beacon);
                    } else {
                        SharedPreferences.Editor editor = mSharedPref.edit();
                        editor.putString(COUPONS_LIST_ENTRY, gson.toJson(couponsFromStorage));
                        editor.apply();
                    }
                }
                break;
            case OnyxBeaconApplication.PUSH_TYPE:
                BluemixApp bluemixApp = intent.getParcelableExtra(OnyxBeaconApplication.EXTRA_BLUEMIX);
                System.out.println("PUSH Received bluemix credentials " + gson.toJson(bluemixApp));
                if (mOnyxPushListener != null) {
                    mOnyxPushListener.onBluemixCredentialsReceived(bluemixApp);
                }
                break;
            case OnyxBeaconApplication.WEB_REQUEST_TYPE:
                String extraInfo = intent.getStringExtra(OnyxBeaconApplication.EXTRA_INFO);
                System.out.println("AUTH Web reguest info " + extraInfo);
                if (extraInfo.equals(OnyxBeaconApplication.REQUEST_UNAUTHORIZED)) {
                    // Pin based session expired
                }
                break;
        }


    }
}
