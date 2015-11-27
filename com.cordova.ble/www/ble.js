var argscheck = require('cordova/argscheck'),
utils = require('cordova/utils'),
exec = require('cordova/exec');

var Ble = function () {
};
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
 * setAPIContentEnabled
 * @param {Boolean} is
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
Ble.setAPIContentEnabled = function (is, success, fail) {
    exec(success, fail, 'Ble', 'setAPIContentEnabled', [is]);
};

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