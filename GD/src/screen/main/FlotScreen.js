import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableOpacity,
    Alert,
    Image,
    ImageBackground,
    Button,
    DeviceEventEmitter,
    Platform
} from 'react-native'
import SuspendScreen from '../../view/index'
import RootSibling from 'react-native-root-siblings'
import BaseScreen from "../BaseScreen";
import DatePicker from 'react-native-datepicker'
import LoginScreen from "../member/auth/LoginScreen";
import HeaderView from "../../view/HeaderView";
import Color from "../../app/Color";
import Images from "../../app/Images";
import ScreenUtil, { marginLR, marginTB, paddingTB, screenW } from "../../utils/ScreenUtil";
import ModalOne from "../../view/ModalOne";
import AddressSelect from "../../view/AddressSelect";
import DialogAdders from "../../dialog/DialogAdders";

/**
 * 悬浮框
 */

export default class FlotScreen extends BaseScreen {

    //
    //
    constructor(props) {
        super(props);
        this.setNavBarVisible(false);// 默认不显示导航栏底下的分割线
        this.state = {
            fadeAnim : new Animated.Value(0),//
            datetime1 : ""
        }
    }

    componentDidMount() {
        //通知
        this.msgListener = DeviceEventEmitter.addListener('Msg', (listenerMsg) => {
            alert(listenerMsg)
        });

        this.fadeAnim();
    }

    componentWillUnmount() {
        //此生命周期内，去掉监听
        this.msgListener && this.msgListener.remove();
    }

    fadeAnim() {
        Animated.timing(
            this.state.fadeAnim,////初始值
            { toValue : 1 } //结束值
        ).start();//开始
    }

    //导航栏滑动的透明度 react-native 实现header渐变
    //     _onScroll = (event) => {
    //         let Y = event.nativeEvent.contentOffset.y;
    //         console.log(Y);
    //         if (Y < 100) {
    //             st = Y*0.01;
    //         } else {
    //             st = 1;
    //         }
    //         this._refHeader.setNativeProps({
    //             opacity:st
    //         })
    //     }
    // <View >
    // <View ref={(e) => this._refHeader = e} style={{ opacity: 0, backgroundColor: Color.theme, justifyContent: "center", alignItems: "center", height: 64, position: "absolute",
    // left: 0, right: 0, zIndex: 2 }}><Text>首页</Text></View> <ScrollView onScroll = {this._onScroll} scrollEventThrottle = {10} > </ScrollView> </View>

    onPress = () => {

        if (this.sibling) {
            return
        }
        this.sibling = new RootSibling(<SuspendScreen close={this.close} toFloat name={'AAAAA'}/>)
    }

    option() {
        alert("AAA")
    }

    close = () => {
        this.sibling && this.sibling.destroy()
        this.sibling = undefined
    }

    renderView() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.onPress}>
                    {/*<Image source={{uri:'bg_navbar'}} style={{width:300,height:100}}/>*/}

                    <ImageBackground source={{ uri : 'bg_navbar' }} style={{ width : 300, height : 100 }}>
                        <Text style={{ color : "white", backgroundColor : "#000000" }}>
                            Link
                        </Text>
                    </ImageBackground>
                </TouchableOpacity>

                <Text style={styles.instructions}>datetime: {this.state.datetime}</Text>
                <DatePicker
                    style={{ width : 200 }}
                    date={this.state.datetime1}
                    mode="date"
                    format="YYYY-MM-DD HH:mm"
                    confirmBtnText="确定"
                    cancelBtnText="取消"
                    // androidMode="spinner"
                    // minDate="2016-05-01"
                    // maxDate="2018-06-01"
                    // showIcon={false}
                    customStyles={{
                        dateIcon : {
                            position : 'absolute',
                            left : 0,
                            top : 4,
                            marginLeft : 0
                        },
                        dateInput : {
                            marginLeft : 36
                        }
                    }}
                    minuteInterval={10}
                    onDateChange={(datetime) => {
                        this.setState({ datetime1 : datetime });
                    }}
                />

                <Animated.Text
                    style={{
                        opacity : this.state.fadeAnim, //透明度动画
                        transform : [ { //transform动画
                            translateX : this.state.fadeAnim.interpolate({
                                inputRange : [ 0, 1 ],
                                outputRange : [ 60, 0 ]//线性插值，0对应60，0.6对应30，1对应0
                            })
                        }, {
                            scale : this.state.fadeAnim
                        } ]
                    }}>
                    Welcome to React Native!
                </Animated.Text>

                <Button title="打开ModalOne" onPress={() => this.onPressModal()}/>

                {/*<ModalOne ref={(c) => this.modalOne = c} handleRightBth={this._handleRightBth} />*/}

            </View>
        )
    }

    _handleRightBth = (area) => {
        var str = '';
        area.map((item, index) => {
            // console.log(item.label)
            str += item.label
            console.log(str)
        })
        alert(str)
        console.log('str', str)
        this.modalOne.disMiss()
    }

    onPressModal = (type) => {
        this.modalOne && this.modalOne.show()
    }

}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#F5FCFF'
    },
});
