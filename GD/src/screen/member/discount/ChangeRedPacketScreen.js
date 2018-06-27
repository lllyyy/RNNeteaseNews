import React, {Component} from 'react';
import {
    StyleSheet,
   TouchableOpacity
} from 'react-native';
import BaseScreen from "../../BaseScreen";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Button,Toast} from  'teaset';
import AuthApi from "../../../api/AuthApi";
import Column from "../../../view/Column";
import Input from "../../../view/Input";
import {marginLR, marginTB, paddingTB, px2dp, wh} from "../../../utils/ScreenUtil";
import Divider from "../../../view/Divider";
import Color from "../../../app/Color";
import ShareApi from "../../../share/ShareApi";
import RedPacketApi from "../../../api/RedPacketApi";
import Image from  '../../../view/Image'



export default class ChangeRedPacketScreen extends BaseScreen {
    constructor(props) {
        super(props);
        // 初始状态
        this.setTitle('兑换红包');
        this.state = {
            captcha:null
        };
        this.coderText= '';
        this.captchaText ='';
    }

    componentDidMount() {
        this._fetchRefreshCaptcha()
    }
    //更换验证吗接口
    _fetchRefreshCaptcha(){
        AuthApi.fetchCaptcha().then((res) => {
            this.setState({captcha:res.code})
        })
    }
    renderView() {
        return (
            <KeyboardAwareScrollView style={styles.container}>
                <Column style={styles.content}>
                    <Input
                        bgViewStyle={[styles.input,{...paddingTB(15)}]}
                        placeholder={'请输入兑换码'}
                        value={this.coderText}
                        onChangeText={(text) => this.coderText = text}
                    />
                    <Input
                        bgViewStyle={[styles.input,{...marginTB(20)}]}
                        placeholder={'请输入验证码'}
                        value={this.captchaText}
                        onChangeText={(text) => this.captchaText = text}
                     >
                        <TouchableOpacity onPress={() => this._fetchRefreshCaptcha()}>
                            <Image
                                source={decodeURIComponent(this.state.captcha)}
                                style={styles.captchaImgStyle}
                                needBaseUrl={false}/>
                        </TouchableOpacity>
                    </Input>
                    <Button
                        style={{height:px2dp(80),backgroundColor:Color.theme,borderWidth:0,...marginLR(15)}}
                        title='确认兑换'
                        titleStyle={{color:Color.white}}
                        onPress={this._onClick}
                    />
                </Column>
            </KeyboardAwareScrollView>
        );
    }
    _onClick =()=>{
        if (this.coderText === ''){
            Toast.message('请输入兑换码')
            return;
        }

        if (this.captchaText === ''){
            Toast.message('请输入验证码')
            return;
        }
        this.shopFetch()
    }

    //兑换接口
    shopFetch(){
        RedPacketApi.fetchExChangeRedPacket(UserInfo.user_id,this.coderText,this.captchaText).then((res)=>{
            this.props.navigation.goBack()
            Toast.show(res.success);
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content:{
        ...marginTB(20),

    },
    captchaImgStyle:{
        ...wh(170,70),
        resizeMode:'contain'
    },
    input:{
        padding:px2dp(10),
        backgroundColor:Color.white
    }
});
