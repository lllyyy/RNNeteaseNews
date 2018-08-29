import React, {Component} from 'react';
import {Navigator} from "./src/navigation/StackNavigator";
import {Provider} from 'mobx-react'
import RootStore from "./src/store/RootStore";
import DeviceStorage from "./src/utils/DeviceStorage";
import XPay from 'react-native-puti-pay'
import codePush from "react-native-code-push"; // 引入code-push
import {YellowBox} from 'react-native';

// 设置检查更新的频率
// ON_APP_RESUME APP恢复到前台的时候
// ON_APP_START APP开启的时候
// MANUAL 手动检查
let codePushOptions = {
    checkFrequency : codePush.CheckFrequency.MANUAL};
const deploymentKey = 'fHssD2uZOmE3-51jbJmnRRZ3ROTnbe13c683-0901-45a1-a322-d2221fe851e4 ';
//在react native中出现的黄色框警告可能是干扰性的。我们将使用控制台。使黄色框完全失效。我们还将使用控制台。将ignoredYellowBox有选择性地禁用警告。
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
type Props = {};
export class RootScreen extends Component<Props> {
    render() {
        return (
            <Provider  {...RootStore}>
                <Navigator/>
            </Provider>
        );
    }
    componentWillMount() {
        // Theme.set({fitIPhoneX: true});
        // CodePush.disallowRestart();//禁止重启
        // this.syncImmediate(); //开始检查更新
    }

    componentDidMount() {
        // CodePush.allowRestart();//在加载完了，允许重启
        codePush.notifyAppReady();
        codePush.checkForUpdate(deploymentKey).then((update) => {
            if (!update) {
                DeviceStorage.get('test').then((value) => {
                    if(value === null || value === "0")
                    {
                        DeviceStorage.save("test","1");
                        alert("最新版更新完成", [
                            {
                                text: "Ok", onPress: () => {
                                    console.log("点了OK");
                                }
                            }
                        ]);
                    }
                });
            } else {
                codePush.sync({
                        deploymentKey: deploymentKey,
                        updateDialog: {
                            optionalIgnoreButtonLabel: '稍后',
                            optionalInstallButtonLabel: '立即更新',
                            optionalUpdateMessage: '有新版本了，是否更新？',
                            mandatoryContinueButtonLabel : "确定",
                            mandatoryUpdateMessage : '有新版本了，请更新？',
                            title: '更新提示',
                        },
                        installMode: codePush.InstallMode.IMMEDIATE,

                    },
                    (status) => {
                        switch (status) {
                            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                                //alert('1');
                                console.log("=====================DOWNLOADING_PACKAGE");
                                break;
                            case codePush.SyncStatus.INSTALLING_UPDATE:
                                //alert('2');
                                // codePush.notifyApplicationReady();
                                // codePush.notifyAppReady();
                                console.log("====================INSTALLING_UPDATE");
                                break;
                            case codePush.SyncStatus.UPDATE_INSTALLED:
                                DeviceStorage.save("test","0");
                                console.log("==============UPDATE_INSTALLED");
                                break;
                        }
                    },
                    (progress) => {
                        console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
                    }
                );
            }
        });



    }

    //如果有更新的提示
      syncImmediate() {


        //   CodePush.sync( {
        //     //安装模式
        //     // ON_NEXT_RESUME 下次恢复到前台时
        //     // ON_NEXT_RESTART 下一次重启时
        //     // IMMEDIATE 马上更新
        //     installMode : CodePush.InstallMode.IMMEDIATE ,
        //     //对话框
        //     updateDialog : {
        //         //是否显示更新描述
        //         appendReleaseDescription : true ,
        //         //更新描述的前缀。 默认为"Description"
        //         descriptionPrefix : "更新内容：" ,
        //         //强制更新按钮文字，默认为continue
        //         mandatoryContinueButtonLabel : "立即更新" ,
        //         //强制更新时的信息. 默认为"An update is available that must be installed."
        //         mandatoryUpdateMessage : "必须更新后才能使用" ,
        //         //非强制更新时，按钮文字,默认为"ignore"
        //         optionalIgnoreButtonLabel : '稍后' ,
        //         //非强制更新时，确认按钮文字. 默认为"Install"
        //         optionalInstallButtonLabel : '后台更新' ,
        //         //非强制更新时，检查到更新的消息文本
        //         optionalUpdateMessage : '有新版本了，是否更新？' ,
        //         //Alert窗口的标题
        //         title : '更新提示'
        //     },
        //
        // });
    }


}



XPay.setWxId('wxb4ba3c02aa476ea1');
//设置	支付宝URL Schemes
XPay.setAlipayScheme('ap2017102209453437')

global.isLogin = false
global.UserInfo = {};
global.Geohash = null;
//获取是否登录
// DeviceStorage.get("Login").then((res) => {
//     if (res) {
//         global.isLogin =  true
//     } else {
//         global.isLogin = false
//     }
// });
// //获取是用户信息
// DeviceStorage.get("User").then((res) => {
//     if (res) {
//         global.UserInfo =  res
//     } else {
//         global.UserInfo = {};
//     }
// });



RootScreen = codePush(codePushOptions)(RootScreen);
export default RootScreen;

// react-native bundle --platform ios --entry-file index.js --bundle-output ./bundles/index.ios.bundle --assets-dest ./bundles --dev false
