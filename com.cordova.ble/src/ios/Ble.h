//
//  Ble.h
//  onyxB
//
//  Created by Nomi on 21/11/2015.
//
//

#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import <UIKit/UIKit.h>

#import "DDLog.h"
#import <OnyxBeaconLib/OnyxBeacon.h>
#import "DDFileLogger.h"
#import "DDTTYLogger.h"

extern const int ddLogLevel;

@interface Ble : CDVPlugin<OnyxBeaconContentDelegate, OnyxBeaconDelegate>

- (void)didRangeBeacons:(NSArray *)beacons inRegion:(OBBeaconRegion *)region;
- (void)didReceiveContent:(NSArray *)coupons;
- (void)didRequestInfo:(OBContent *)content inViewController:(UIViewController *)viewController;
- (void)contentOpened:(OBContent *)content;
- (void)contentTapped:(OBContent *)content;
- (void)deleteContent:(OBContent *)content;
- (void)getContent:(CDVInvokedUrlCommand *)command;
- (void) version: (CDVInvokedUrlCommand *)command;
- (void)sendUserMetrics : (CDVInvokedUrlCommand *)command;
- (void)sendReport :(CDVInvokedUrlCommand *)command;
- (UIViewController *)viewControllerForTags:(CDVInvokedUrlCommand *)command;
- (void) requestAlwaysAuthorization :(CDVInvokedUrlCommand *)command;
- (void) startServiceWithClientID:(CDVInvokedUrlCommand *)command;
- (void)applicationDidEnterBackground:(CDVInvokedUrlCommand *)command;
- (void)applicationWillEnterForeground:(CDVInvokedUrlCommand *)command;
- (void)requestWhenInUseAuthorization:(CDVInvokedUrlCommand *)command;
-(void) setLogger:(CDVInvokedUrlCommand *)command ;

- (void)onyxBeaconError:(NSError *)error;

@end