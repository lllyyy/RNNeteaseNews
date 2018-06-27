/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <UMSocialCore/UMSocialCore.h>
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  
    #ifdef DEBUG
        jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
    #else
        jsCodeLocation = [CodePush bundleURL];
    #endif

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"GD"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  
   [self initUmeng];
  
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}
-(void)initUmeng{
  //UMeng分享   //打开调试日志
  [[UMSocialManager defaultManager] openLog:YES];
  
  //设置友盟appkey
  [[UMSocialManager defaultManager] setUmSocialAppkey:@"54460c4dfd98c5c7dd001ee8"];
  
  //设置微信的appKey和appSecret
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_WechatSession appKey:@"wx757c78d77ca65a56" appSecret:@"e74228d96e52d4008319b178c50e7c44" redirectURL:@"http://mobile.umeng.com/social"];
  
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_Sina
                                        appKey:@"3073438324"
                                     appSecret:@"ae8464b5abde073ba7d5e5c666509fad"
                                   redirectURL:@"http://mobile.umeng.com/social"];
  
  //设置分享到QQ互联的appKey和appSecret
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_QQ appKey:@"1101839493"  appSecret:@"6BO8ssJF0x55qxzw" redirectURL:@"http://mobile.umeng.com/social"];
  
}
@end
