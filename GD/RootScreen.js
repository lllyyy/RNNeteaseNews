import React, {Component} from 'react';
import {Navigator} from "./src/navigation/StackNavigator";
import {Provider} from 'mobx-react'
import RootStore from "./src/store/RootStore";
import DeviceStorage from "./src/utils/DeviceStorage";
import XPay from 'react-native-puti-pay'
import CodePush from "react-native-code-push"; // 引入code-push
import {YellowBox} from 'react-native';

// 设置检查更新的频率
// ON_APP_RESUME APP恢复到前台的时候
// ON_APP_START APP开启的时候
// MANUAL 手动检查
let codePushOptions = {
    checkFrequency : CodePush.CheckFrequency.MANUAL};

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
        CodePush.disallowRestart();//禁止重启
        this.syncImmediate(); //开始检查更新
    }

    componentDidMount() {
        CodePush.allowRestart();//在加载完了，允许重启
    }

    //如果有更新的提示
    syncImmediate() {
        CodePush.sync( {
            //安装模式
            // ON_NEXT_RESUME 下次恢复到前台时
            // ON_NEXT_RESTART 下一次重启时
            // IMMEDIATE 马上更新
            installMode : CodePush.InstallMode.IMMEDIATE ,
            //对话框
            updateDialog : {
                //是否显示更新描述
                appendReleaseDescription : true ,
                //更新描述的前缀。 默认为"Description"
                descriptionPrefix : "更新内容：" ,
                //强制更新按钮文字，默认为continue
                mandatoryContinueButtonLabel : "立即更新" ,
                //强制更新时的信息. 默认为"An update is available that must be installed."
                mandatoryUpdateMessage : "必须更新后才能使用" ,
                //非强制更新时，按钮文字,默认为"ignore"
                optionalIgnoreButtonLabel : '稍后' ,
                //非强制更新时，确认按钮文字. 默认为"Install"
                optionalInstallButtonLabel : '后台更新' ,
                //非强制更新时，检查到更新的消息文本
                optionalUpdateMessage : '有新版本了，是否更新？' ,
                //Alert窗口的标题
                title : '更新提示'
            },
        });
    }
}


XPay.setWxId('wxb4ba3c02aa476ea1');
//设置	支付宝URL Schemes
XPay.setAlipayScheme('ap2017102209453437')
//获取是否登录
DeviceStorage.get("Login").then((res) => {
    if (res) {
        global.isLogin =  true
    } else {
        global.isLogin = false
    }
});
//获取是用户信息
DeviceStorage.get("User").then((res) => {
    if (res) {
        global.UserInfo =  res
    } else {
        global.UserInfo = {};
    }
});

global.Geohash = null;

RootScreen = CodePush(codePushOptions)(RootScreen);
export default RootScreen;
