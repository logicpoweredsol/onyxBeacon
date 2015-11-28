var argscheck = require('cordova/argscheck'),
utils = require('cordova/utils'),
exec = require('cordova/exec');

var Ble = function () {
};

var Tag = function (id, name, status){

    this.id = id || "";
    this.name = name || "";
    this.status = status || "";
}

var currentCallback=null;


/**
 * startServiceWithClientID
 * @param SA_CLIENTID
 * @param SA_SECRET
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */

Ble.startServiceWithClientID = function (clientid, clientsecret, success, fail) {
    exec(success, fail, 'Ble', 'startServiceWithClientID', [clientid,clientsecret]);
};

/**
 * getContent
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.getContent = function (success, fail) {
    exec(success, fail, 'Ble', 'getContent', []);
};

/**
 * version
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.version = function ( success, fail) {
    exec(success, fail, 'Ble', 'version', []);
};

/**
 * sendUserMetrics
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.sendUserMetrics = function (user, success, fail) {
    exec(success, fail, 'Ble', 'sendUserMetrics', [user]);
};

/**
 * sendLogReport
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.sendReport = function ( reporter, success, fail) {
    exec(success, fail, 'Ble', 'sendLogReport', [reporter]);
};

/**
 * viewControllerForTags
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.viewControllerForTags = function ( success, fail) {
    exec(success, fail, 'Ble', 'viewControllerForTags', []);
};


/**
 * requestAlwaysAuthorization
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.requestAlwaysAuthorization = function (success, fail) {
    exec(success, fail, 'Ble', 'requestAlwaysAuthorization', []);
};


/**
 * applicationDidEnterBackground
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.applicationDidEnterBackground = function ( success, fail) {
    exec(success, fail, 'Ble', 'applicationDidEnterBackground', []);
};

/**
 * applicationWillEnterForeground
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.applicationWillEnterForeground = function (success, fail) {
    exec(success, fail, 'Ble', 'applicationWillEnterForeground', []);
};

/**
 * setLogger
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.setLogger = function ( success, fail) {
    exec(success, fail, 'Ble', 'setLogger', []);
};

/**
 * requestWhenInUseAuthorization
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.requestWhenInUseAuthorization = function (success, fail) {
    exec(success, fail, 'Ble', 'requestWhenInUseAuthorization', []);
};

/**
 * initSDK
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.initSDK = function (success, fail) {
    exec(success, fail, 'Ble', 'initSDK', []);
};

/**
 * isBluetoothAvailable
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.isBluetoothAvailable = function (success, fail) {
    exec(success, fail, 'Ble', 'isBluetoothAvailable', []);
};

/**
 * startScan
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.startScan = function (success, fail) {
    exec(success, fail, 'Ble', 'startScan', []);
};

/**
 * stopScan
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.stopScan = function (success, fail) {
    exec(success, fail, 'Ble', 'stopScan', []);
};

/**
 * setBackgroundBetweenScanPeriod
 * @param {int} period
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.setBackgroundBetweenScanPeriod = function (period, success, fail) {
    exec(success, fail, 'Ble', 'setBackgroundBetweenScanPeriod', [period]);
};

/**
 * setForegroundMode
 * @param {Boolean} is
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.setForegroundMode = function (is, success, fail) {
    exec(success, fail, 'Ble', 'setForegroundMode', [is]);
};

/**
 * setCouponEnabled
 * @param {Boolean} is
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.setCouponEnabled = function (is, success, fail) {
    exec(success, fail, 'Ble', 'setCouponEnabled', [is]);
};

/**
 * enableGeofencing
 * @param {Boolean} is
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.enableGeofencing = function (is, success, fail) {
    exec(success, fail, 'Ble', 'enableGeofencing', [is]);
};
/**
 * setLocationTrackingEnabled
 * @param {Boolean} is
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.setLocationTrackingEnabled = function (is, success, fail) {
    exec(success, fail, 'Ble', 'setLocationTrackingEnabled', [is]);
};

/**
 * setAPIContentEnabled
 * @param {Boolean} is
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.setAPIContentEnabled = function (is, success, fail) {
    exec(success, fail, 'Ble', 'setAPIContentEnabled', [is]);
};


/**
 * enableBluetooth
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.enableBluetooth = function (success, fail) {
    exec(success, fail, 'Ble', 'enableBluetooth', []);
};


/**
 * getTags
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.getTags = function (success, fail) {
    exec(success, fail, 'Ble', 'getTags', []);
};


/**
 * restartLocationTracking
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.restartLocationTracking = function (success, fail) {
    exec(success, fail, 'Ble', 'restartLocationTracking', []);
};

/**
 * logOut
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.logOut = function (success, fail) {
    exec(success, fail, 'Ble', 'logOut', []);
};

/**
 * sendGenericUserProfile
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.sendGenericUserProfile = function (profile,success, fail) {
    exec(success, fail, 'Ble', 'sendGenericUserProfile', [profile]);
};

/**
 * isInForeground
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.isInForeground = function (success, fail) {
    exec(success, fail, 'Ble', 'isInForeground', []);
};


/**
 * isCouponEnabled
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.isCouponEnabled = function (success, fail) {
    exec(success, fail, 'Ble', 'isCouponEnabled', []);
};

/**
 * isAPIEnabled
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.isAPIEnabled = function (success, fail) {
    exec(success, fail, 'Ble', 'isAPIEnabled', []);
};

/**
 * deleteCoupon
 * @param {Function} var1
 * @param {Function} var2
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.deleteCoupon = function (var1,var2,success, fail) {
    exec(success, fail, 'Ble', 'deleteCoupon', [var1,var2]);
};

/**
 * sendDeviceToken
 * @param {Function} var1
 * @param {Function} var2
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.sendDeviceToken = function (var1,var2,success, fail) {
    exec(success, fail, 'Ble', 'sendDeviceToken', [var1,var2]);
};

/**
 * setAuthExtraData
 * @param {Function} var1
 * @param {Function} var2
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.setAuthExtraData = function (var1,success, fail) {
    exec(success, fail, 'Ble', 'setAuthExtraData', [var1]);
};

/**
 * setAuthExtraData
 * @param {Function} var1, this is JSONARRAY of Tag [[id,name,state],[id,name,state],[id,name,state]]
 * @param {Function} var2
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.setTagsFilterForCoupons = function (tagArrayList,success, fail) {
    exec(success, fail, 'Ble', 'setAuthExtraData', tagArrayList]);
};

/**
 * markAsTapped
 * @param {Function} var1
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.markAsTapped = function (var1,success, fail) {
    exec(success, fail, 'Ble', 'markAsTapped', [var1]);
};

/**
 * markAsOpened
 * @param {Function} var1
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.markAsOpened = function (var1,success, fail) {
    exec(success, fail, 'Ble', 'markAsOpened', [var1]);
};

/**
 * onyxBeaconError
 */
Ble.onyxBeaconError = function (msg) {
    Console.log(msg);
}
if (cordova.platformId === 'android' || cordova.platformId === 'amazon-fireos' || cordova.platformId === 'windowsphone') {
    
    var channel = require('cordova/channel');
    
    channel.createSticky('onBlePluginReady');
    channel.waitForInitialization('onBlePluginReady');
    
    channel.onCordovaReady.subscribe(function() {
                                     exec(Ble.onyxBeaconError, undefined, 'Ble', 'messageChannel', []);
                                     channel.initializationComplete('onBlePluginReady');
                                     });
}

module.exports = Ble;