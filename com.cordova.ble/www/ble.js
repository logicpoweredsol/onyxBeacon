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