//  sharemodule.m
//  Created by Songlcy on 2017/12/01.

#import "sharemodule.h"

 
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <UMSocialCore/UMSocialCore.h>
#import <UMSocialCore/UMSocialManager.h>

@implementation sharemodule
RCT_EXPORT_MODULE(sharemodule)

- (dispatch_queue_t)methodQueue{
  return dispatch_get_main_queue();
}
//友盟分享
RCT_EXPORT_METHOD(share:(NSString *)title content:(NSString *)content imageUrl:(NSString*)imageUrl targetUrl:(NSString*)targetUrl successCallback:(RCTResponseSenderBlock*)successCallback errorCallback:(RCTResponseSenderBlock*)errorCallback )
{
  
  
  [UMSocialShareUIConfig shareInstance].sharePageGroupViewConfig.sharePageGroupViewPostionType = UMSocialSharePageGroupViewPositionType_Bottom;
  [UMSocialShareUIConfig shareInstance].sharePageScrollViewConfig.shareScrollViewPageItemStyleType = UMSocialPlatformItemViewBackgroudType_IconAndBGRadius;
  
  [UMSocialUIManager showShareMenuViewInWindowWithPlatformSelectionBlock:^(UMSocialPlatformType platformType, NSDictionary *userInfo) {
    NSLog(@"sdfasdfdsfdfd%@",userInfo);
    
    //创建分享消息对象
    UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
    messageObject.title = title;
    messageObject.text = content;
    messageObject.shareObject = targetUrl;
    
    [self shareWebPageToPlatformType:platformType messageObject:messageObject type:nil vc:nil];
  }];
  
}

//第三方登录
RCT_EXPORT_METHOD(type:(NSString *)type successCallback:(RCTResponseSenderBlock*)successCallback errorCallback:(RCTResponseSenderBlock*)errorCallback )
{
  NSLog(@"UMSocialPlatformType_QQ  %@",type);
  [self getUserInfoForPlatform:UMSocialPlatformType_WechatSession];
}

//第三方登录
- (void)getUserInfoForPlatform:(UMSocialPlatformType)platformType
{
  [[UMSocialManager defaultManager] getUserInfoWithPlatform:platformType currentViewController:nil completion:^(id result, NSError *error) {
    
    UMSocialUserInfoResponse *resp = result;
    
    // 第三方登录数据(为空表示平台未提供)
    // 授权数据
    NSLog(@" uid: %@", resp.uid);
    NSLog(@" openid: %@", resp.openid);
    NSLog(@" accessToken: %@", resp.accessToken);
    NSLog(@" refreshToken: %@", resp.refreshToken);
    NSLog(@" expiration: %@", resp.expiration);
    
    // 用户数据
    NSLog(@" name: %@", resp.name);
    NSLog(@" iconurl: %@", resp.iconurl);
    NSLog(@" gender: %@", resp.gender);
    
    // 第三方平台SDK原始数据
    NSLog(@" originalResponse: %@", resp.originalResponse);
  }];
}

//网页分享
- (void)shareWebPageToPlatformType:(UMSocialPlatformType)platformType
                     messageObject:(UMSocialMessageObject *)messageObject
                              type:(NSString *)type
                                vc:(UIViewController *)vc{
  
  //创建网页内容对象
  
  UMShareWebpageObject *shareObject = [UMShareWebpageObject shareObjectWithTitle:messageObject.title descr:messageObject.text thumImage:[UIImage imageNamed:@"img_share_doctor"]];
  //设置网页地址
  shareObject.webpageUrl = messageObject.shareObject;
  
  //分享消息对象设置分享内容对象
  messageObject.shareObject = shareObject;
  
  //调用分享接口
  [[UMSocialManager defaultManager] shareToPlatform:platformType messageObject:messageObject currentViewController:vc completion:^(id data, NSError *error) {
    if (type.length > 0) {
      [[NSNotificationCenter defaultCenter]postNotificationName:@"ShareNum" object:nil];
    }
    if (error) {
      UMSocialLogInfo(@"************Share fail with error %@*********",error);
    }else{
      if ([data isKindOfClass:[UMSocialShareResponse class]]) {
        UMSocialShareResponse *resp = data;
        //分享结果消息
        UMSocialLogInfo(@"response message is %@",resp.message);
        //第三方原始返回的数据
        UMSocialLogInfo(@"response originalResponse data is %@",resp.originalResponse);
        
      }else{
        UMSocialLogInfo(@"response data is %@",data);
      }
    }
    // [self alertWithError:error];
  }];
}

//- (UMSocialPlatformType)configPlatform: (NSInteger) platformType {
//
//  UMSocialPlatformType type = UMSocialPlatformType_Sina;
//  switch (platformType) {
//    case 0:
//      type = UMSocialPlatformType_QQ;
//      break;
//    case 1:
//      type = UMSocialPlatformType_Sina;
//      break;
//    case 2:
//      type = UMSocialPlatformType_WechatSession;
//      break;
//    case 3:
//      type = UMSocialPlatformType_WechatTimeLine;
//      break;
//    case 4:
//      type = UMSocialPlatformType_Qzone;
//      break;
//    case 5:
//      type = UMSocialPlatformType_Facebook;
//      break;
//    default:
//      break;
//  }
//  return type;
//}
//
///**
// * 图片分享
// */
//RCT_EXPORT_METHOD(shareImage:(NSString*)imagePath platformType:(NSInteger)platformType callback:(RCTResponseSenderBlock)callback){
//
//  //创建分享消息对象
//  UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
//  //创建图片内容对象
//  UMShareImageObject *shareObject = [[UMShareImageObject alloc] init];
//  //如果有缩略图，则设置缩略图本地
//  UIImage * image = [UIImage imageWithContentsOfFile:imagePath];
//  shareObject.thumbImage = image;
//  [shareObject setShareImage:image];
//  //分享消息对象设置分享内容对象
//  messageObject.shareObject = shareObject;
//
//  dispatch_async(dispatch_get_main_queue(), ^{
//
//    //调用分享接口
//    [[UMSocialManager defaultManager] shareToPlatform:[self configPlatform: platformType] messageObject:messageObject currentViewController:nil completion:^(id data, NSError *error) {
//      NSString *message = @"分享成功";
//      if (error) {
//        UMSocialLogInfo(@"************Share fail with error %@*********",error);
//        message = @"分享失败";
//      }else{
//        if ([data isKindOfClass:[UMSocialShareResponse class]]) {
//          UMSocialShareResponse *resp = data;
//          //分享结果消息
//          UMSocialLogInfo(@"response message is %@",resp.message);
//          //第三方原始返回的数据
//          UMSocialLogInfo(@"response originalResponse data is %@",resp.originalResponse);
//
//        }else{
//          UMSocialLogInfo(@"response data is %@",data);
//        }
//      }
//      callback( [[NSArray alloc] initWithObjects:message, nil]);
//    }];
//
//  });
//}
//
//// 图文分享
//RCT_EXPORT_METHOD(share:(NSString*)title descr:(NSString*)descr
//                  webpageUrl:(NSString*)webpageUrl
//                  thumbURL:(NSString*)thumbURLl
//                  NSInteger:(NSInteger)platformType
//                  callback:(RCTResponseSenderBlock)callback
//                  )
//{
//  //创建分享消息对象
//  UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
//  //创建网页内容对象
//  NSString* thumbURL =  thumbURLl;
//  UMShareWebpageObject *shareObject = [UMShareWebpageObject shareObjectWithTitle:title descr:descr thumImage:thumbURL];
//  //设置网页地址
//  shareObject.webpageUrl = webpageUrl;
//  //分享消息对象设置分享内容对象
//  messageObject.shareObject = shareObject;
//
//  dispatch_async(dispatch_get_main_queue(), ^{
//    //调用分享接口
//    [[UMSocialManager defaultManager] shareToPlatform: [self configPlatform: platformType]  messageObject:messageObject currentViewController:nil completion:^(id data, NSError *error) {
//      NSString *message = @"分享成功";
//      if (error) {
//        UMSocialLogInfo(@"************Share fail with error %@*********",error);
//        if(error.code == 2009){
//          message = @"取消分享";
//        }else{
//          message = @"分享失败";
//        }
//      }else{
//        if ([data isKindOfClass:[UMSocialShareResponse class]]) {
//          UMSocialShareResponse *resp = data;
//          //分享结果消息
//          UMSocialLogInfo(@"response message is %@",resp.message);
//          //第三方原始返回的数据
//          UMSocialLogInfo(@"response originalResponse data is %@",resp.originalResponse);
//          //          code = @"200";
//          //          message = resp.originalResponse;
//        }else{
//          UMSocialLogInfo(@"response data is %@",data);
//        }
//
//      }
//      callback( [[NSArray alloc] initWithObjects:message, nil]);
//    }];
//
//  });
//}
//
//// 官方不推荐使用该方式
////RCT_EXPORT_METHOD(authLogin:(NSInteger)platformType callback:(RCTResponseSenderBlock)callback){
////  [[UMSocialManager defaultManager] authWithPlatform: [self configPlatform:platformType] currentViewController:nil completion:^(id result, NSError *error) {
////
////    NSDictionary *userdata = nil;
////    NSNumber *code = @0;
////
////    if(error){
////      code = @1;
////      userdata = @{
////                   @"code": code
////                   };
////    } else {
////      UMSocialAuthResponse *authresponse = result;
////
////      userdata = @{
////                   @"code": code,
////                   @"uid": authresponse.uid,
////                   @"accessToken": authresponse.accessToken
////                   };
////    }
////    callback( [[NSArray alloc] initWithObjects: userdata, nil]);
////  }];
////}
//
//// 授权第三方登录
//RCT_EXPORT_METHOD(authLogin: (NSInteger) platformType callback: (RCTResponseSenderBlock) callback) {
//
//  [[UMSocialManager defaultManager] getUserInfoWithPlatform: [self configPlatform: platformType]  currentViewController:nil completion:^(id result, NSError *error) {
//
//      NSNumber *code = @0;
//      NSDictionary *userdata = nil;
//      if(error) {
//        code = @1;
//        userdata = @{
//                     @"code": code
//                   };
//      } else {
//        UMSocialUserInfoResponse *userinfo = result;
//        userdata = @{
//                       @"code": code,
//                       @"userId": userinfo.uid,
//                       @"accessToken": userinfo.accessToken,
//                       @"userName": userinfo.name,
//                       @"userAvatar": userinfo.iconurl,
//                       @"userGender": userinfo.gender
//                     };
//
//      }
//     callback( [[NSArray alloc] initWithObjects: userdata, nil]);
//  }];
//
//}

@end

