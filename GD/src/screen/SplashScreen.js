/**
 *
 * 启动页
 *
 */
import React from 'react';
import {Image, StatusBar, View} from 'react-native';
import BaseScreen from "./BaseScreen";
import NavigationUtil from "../utils/NavigationUtil";
import Images from "../app/Images";
import Storage from '../utils/DeviceStorage';
import GuidePage from "../view/GuidePage";
import UpgradeDialog from '../view/UpgradeDialog'
import {screenW} from "../utils/ScreenUtil";
import {getFormattedTime,getRemainingimeDistance2,formatChatTime,currentTime,format} from "../utils/ScreenUtil";


export default class SplashScreen extends BaseScreen {

    constructor(props) {
        super(props);
        this.setNavBarVisible(false)
    }

    render() {
        return (
//Images.Splash.splash

            <View>
               <Image source={Images.Splash.splash}  style={{width: '100%',height: '100%', resizeMode:'stretch'}}/>
                {/*<View style={{backgroundColor: 'transparent', position: 'absolute', left: 0, top: 0, width: screenW}}>*/}
                    {/*<UpgradeDialog ref="upgradeDialog" content={getFormattedTime(1530176361)+"  "+getRemainingimeDistance2(1530176361) + " " + formatChatTime(1530176361) + "  " + format(new Date,"yyyy-MM-dd hh:mm:ss")}/>*/}
                {/*</View>*/}
            </View>

        );
    }



    componentDidMount() {

            // 显示更新dialog
        // this.refs.upgradeDialog.showModal();
        const {navigation} = this.props;
        this.timer = setTimeout(() => {
            Storage.get('isInit')   //获取初次打开的标记位
                .then((isInit) => {
                    if (!isInit) {  //如果为false,跳转到引导页
                        NavigationUtil.reset(navigation, 'GuidePage');
                        // NavigationUtil.reset(navigation, "Home");
                        Storage.save('isInit', true);  //同时把isInit存到本地数据库中
                    } else {
                        NavigationUtil.reset(navigation, "Home")
                    }
                })
        }, 1000);
    }
}
