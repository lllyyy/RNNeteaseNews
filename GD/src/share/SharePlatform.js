/**
 * 平台
 */
// const SharePlatform = {
//     QQ: 0,
//     SINA: 1,
//     WECHAT: 2,
//     WECHATMOMENT: 3,
//     QQZONE: 4,
//     FACEBOOK: 5
// }
// export default SharePlatform;

import {NativeModules} from 'react-native';
export default NativeModules.examplan;


// import UShare from './share/share'
// import SharePlatform from './SharePlatform'
// /**
//  * 第三方分享
//  * 参数：标题、分享内容、分享链接、图片、平台、分享结果回调
//  */
// _share() {
//     UShare.share('标题','内容', 'http://baidu.com','http://dev.umeng.com/images/tab2_1.png', SharePlatform.QQ,
//         (message) => {
//             // message: 分享成功、分享失败、取消分享
//             // TODO ...
//         });
// }
//
// /**
//  * 第三方登录
//  * 参数：登录平台、登录结果回调
//  *  'userId: ' 用户id
//  'accessToken: token
//  'userName: ' 用户昵称
//  'userGender: ' 用户性别
//  'userAvatar: ' 用户头像
//  */
// _getUserInfo() {
//     UShare.authLogin(SharePlatform.QQ, (result) => {
//         // code: 0成功、1失败、2取消
//         if(result.code === 0) {
//             console.log('授权登录成功:' +
//                 'userId: ' + result.uid +
//                 'accessToken: ' + result.accessToken +
//                 'userName: ' + result.userName +
//                 'userGender: ' + result.userGender +
//                 'userAvatar: ' + result.userAvatar
//             );
//         } else {
//             // TODO ...
//         }
//     });
// }
