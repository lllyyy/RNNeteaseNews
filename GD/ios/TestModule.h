//
//  TestModule.h
//  GD
//
//  Created by 卢杨 on 2018/7/12.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTBridge.h>
@interface TestModule : NSObject<RCTBridgeModule>
@property (nonatomic,copy) NSString *contactName;
@property (nonatomic,copy) NSString *contactPhoneNumber;
@end
