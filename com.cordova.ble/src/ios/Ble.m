//
//  Ble.m
//  onyxB
//
//  Created by Nomi on 21/11/2015.
//
//

#import "Ble.h"


@interface Ble ()

@property (strong, nonatomic) DDFileLogger* fileLogger;
@property (nonatomic, strong) NSArray *coupons;
@property (nonatomic, strong) OBContent *selContent;

@end

@implementation Ble

/*
    NSDictionary *jsonObj = [ [NSDictionary alloc]
                             initWithObjectsAndKeys :
                             dateStr, @"dateStr",
                             @"true", @"success",
                             nil
                             ];
*/

#pragma mark - Coupan View
- (void)getContent:(CDVInvokedUrlCommand *)command{
    self.coupons = [[OnyxBeacon sharedInstance] getContent];
}

- (void)didRangeBeacons:(NSArray *)beacons inRegion:(OBBeaconRegion *)region {
    NSLog(@"beacons: %@", beacons);
}


#pragma mark - OnyxBeaconCouponDelegate Methods

- (void)didReceiveContent:(NSArray *)coupons {
    /*
     for (OBContent *coupon in coupons) {
     UILocalNotification *notification = [[UILocalNotification alloc] init];
     notification.alertBody = coupon.message;
     notification.userInfo = @{@"uuid": coupon.uuid};
     notification.soundName = UILocalNotificationDefaultSoundName;
     [[UIApplication sharedApplication] presentLocalNotificationNow:notification];
     }
     */
    //Send Coupan to Cordova
    
}

- (void)didRequestInfo:(OBContent *)content inViewController:(UIViewController *)viewController {
    
}

- (void)contentOpened:(OBContent *)content {
    [[OnyxBeacon sharedInstance] contentOpened:content];
}

- (void)contentTapped:(OBContent *)content {
    [[OnyxBeacon sharedInstance] contentTapped:self.selContent];
}

- (void)deleteContent:(OBContent *)content {
    [[OnyxBeacon sharedInstance] deleteContent:content];
}


#pragma mark - Main OnyxBeacon

- (void) version: (CDVInvokedUrlCommand *)command {
    
    [[OnyxBeacon sharedInstance] version];
    CDVPluginResult* pluginResult = [CDVPluginResult
                                     resultWithStatus:CDVCommandStatus_OK
                                     messageAsString: @"Version Invoked"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    
}

- (void)sendUserMetrics : (CDVInvokedUrlCommand *)command {
    NSDictionary * user =[command.arguments objectAtIndex:0];
    
    [[OnyxBeacon sharedInstance] sendUserMetrics:user];
    
    CDVPluginResult* pluginResult = [CDVPluginResult
                                     resultWithStatus:CDVCommandStatus_OK
                                     messageAsString: @"sendUserMetrics Invoked"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    
}
- (void)sendReport :(CDVInvokedUrlCommand *)command {
    
    NSString* reporter = [command.arguments objectAtIndex:0];
    
    DDLogVerbose(@"Sending log report: %@", reporter);
    for (id<DDLogger>logger in [DDLog allLoggers]) {
        if ([logger isKindOfClass:[DDFileLogger class]]) {
            id <DDLogFileManager> lfm = ((DDFileLogger *)logger).logFileManager;
            NSArray *infos = [lfm sortedLogFileInfos];
            for (DDLogFileInfo *fi in infos) {
                NSString *filePath = fi.filePath;
                NSLog(@"LOG: Sending %@ size %llu", filePath, fi.fileSize);
                [[OnyxBeacon sharedInstance] sendReport:[[NSData alloc] initWithContentsOfFile:filePath] reporter:reporter message:@"" handler:^(NSError *error) {
                    NSLog(@"Sending log report: %@", error);
                }];
            }
        }
    }
    
    
    CDVPluginResult* pluginResult = [CDVPluginResult
                                     resultWithStatus:CDVCommandStatus_OK
                                     messageAsString: @"sendLogReport Invoked"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (UIViewController *)viewControllerForTags:(CDVInvokedUrlCommand *)command
{
    return [[OnyxBeacon sharedInstance] viewControllerForTags];
    
}


- (void)requestWhenInUseAuthorization:(CDVInvokedUrlCommand *)command
{
    return [[OnyxBeacon sharedInstance] requestWhenInUseAuthorization];
    
}



- (void)onyxBeaconError:(NSError *)error {
    DDLogVerbose(@"Error: %@", error);
    NSString* jsString = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\");", @"window.cordova.plugins.Ble.onyxBeaconError", error];
    [self.commandDelegate evalJs:jsString];

}



-(void) requestAlwaysAuthorization :(CDVInvokedUrlCommand *)command {
    [[OnyxBeacon sharedInstance] requestAlwaysAuthorization];
    
    CDVPluginResult* pluginResult = [CDVPluginResult
                                     resultWithStatus:CDVCommandStatus_OK
                                     messageAsString: @"requestAlwaysAuthorization Invoked"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) setLogger:(CDVInvokedUrlCommand *)command {
    
    //NSString* message = [command.arguments objectAtIndex:0];

    if (self.fileLogger == nil) {
        [DDLog addLogger:[DDTTYLogger sharedInstance]];
        self.fileLogger = [[DDFileLogger alloc] init];
        self.fileLogger.rollingFrequency =  60 * 60 * 24;
        self.fileLogger.logFileManager.maximumNumberOfLogFiles = 1;
        self.fileLogger.maximumFileSize = 0.5 * 1024 * 1024;
        [self.fileLogger setLogFormatter:[[DDLogFileFormatterDefault alloc] init]];
        [DDLog addLogger:self.fileLogger];
    }
    [[OnyxBeacon sharedInstance] setLogger:^(NSString *message) {
        DDLogVerbose(@"OB: %@", message);
    }];
    
    
    
    CDVPluginResult* pluginResult = [CDVPluginResult
                                     resultWithStatus:CDVCommandStatus_OK
                                     messageAsString: @"setLogger Invoked"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

}

-(void) startServiceWithClientID:(CDVInvokedUrlCommand *)command {
    
    NSString* SA_CLIENTID = [command.arguments objectAtIndex:0];
    NSString* SA_SECRET = [command.arguments objectAtIndex:1];
    
    
    [[OnyxBeacon sharedInstance] startServiceWithClientID:SA_CLIENTID secret:SA_SECRET];
    [[OnyxBeacon sharedInstance] setContentDelegate:self];
    [[OnyxBeacon sharedInstance] setDelegate:self];
    
    CDVPluginResult* pluginResult = [CDVPluginResult
                                     resultWithStatus:CDVCommandStatus_OK
                                     messageAsString: @"startServiceWithClientID Invoked"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

}


- (void)applicationDidEnterBackground:(CDVInvokedUrlCommand *)command
{
    [[OnyxBeacon sharedInstance] didEnterBackground];

    CDVPluginResult* pluginResult = [CDVPluginResult
                                     resultWithStatus:CDVCommandStatus_OK
                                     messageAsString: @"didEnterBackground Invoked"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void)applicationWillEnterForeground:(CDVInvokedUrlCommand *)command
{
    [[OnyxBeacon sharedInstance] willEnterForeground];
    
    CDVPluginResult* pluginResult = [CDVPluginResult
                                     resultWithStatus:CDVCommandStatus_OK
                                     messageAsString: @"didEnterBackground Invoked"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

}

@end