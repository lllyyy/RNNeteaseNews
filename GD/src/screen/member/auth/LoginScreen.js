/**
 * 登录页面
 */
import React, {Component} from 'react';
import {
    StyleSheet,

    TouchableOpacity
} from 'react-native';
import BaseScreen from "../../BaseScreen";
import AuthApi from "../../../api/AuthApi";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Column from "../../../view/Column";
import {px2dp,wh} from "../../../utils/ScreenUtil";
import Color from "../../../app/Color";
import Input from "../../../view/Input";
import Divider from "../../../view/Divider";
import Checkbox from '../../../view/Checkbox'
import Images from "../../../app/Images";
import {Button,Toast} from  'teaset';
import Image from '../../../view/Image'
import DeviceStorage from "../../../utils/DeviceStorage";

export default class LoginScreen extends BaseScreen {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.setTitle('密码登录');
        this.state = {
            captcha:null
        };
        this.nameText= '';
        this.pwdText ='';
        this.codeText =''
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
    //显示隐藏密码
    _passwordVisible = (state) => {
         //this.pwd  拿到Input组件  在修改secureTextEntry
        this.pwd.setNativeProps({
            secureTextEntry: !state
        });
    };
    //登录
    _onBtnLoginClick(){

        if (this.nameText === '') {
            Toast.message('请输入账号')
            return ;
        }

        if (this.pwdText === ''){
            Toast.message('请输入密码')
            return ;
        }

        if (this.codeText === '') {
            Toast.message('请输入验证码')
            return ;
        }

        this._fetchLogin()
    }
    _fetchLogin(){
        AuthApi.fetchAccountLogin(this.nameText,this.pwdText,this.codeText).then((res) => {
            isLogin = true;
            UserInfo = res;
            DeviceStorage.save("Login","true");
            DeviceStorage.save("User",UserInfo);
            const navigation = this.props.navigation;
            navigation.state.params.callback(res);//回调穿参数
            navigation.goBack()
        })
    }

    renderView() {
        return (
            <KeyboardAwareScrollView style={styles.container}>
                <Column style={styles.content}>
                    <Input
                     bgViewStyle={styles.input}
                     label={'账号'}
                     placeholder={'请输入账号'}
                     value={this.nameText}
                     onChangeText={(text) => this.nameText = text}
                    />
                    <Divider/>
                    <Input
                     id={(p) => this.pwd =p}
                     bgViewStyle={styles.input}
                     label={'密码'}
                     placeholder={'请输入密码'}
                     secureTextEntry={true}
                     value={this.pwdText}
                     onChangeText={(text) => this.pwdText = text}
                    >
                    <Checkbox
                        tintColorEnable={false}
                        checkedIcon={Images.Login.hidePwd}
                        uncheckedIcon={Images.Login.showPwd}
                        onChange={this._passwordVisible.bind(this)}
                    />
                    </Input>
                    <Divider/>
                    <Input
                    bgViewStyle={styles.input}
                    label={'验证码'}
                    keyboardType={'number-pad'}
                    placeholder={'请输入验证码'}
                    onChangeText={(text) =>this.codeText =text}
                    >
                        <TouchableOpacity onPress={this._fetchRefreshCaptcha.bind(this)}>
                            <Image
                                source={decodeURIComponent(this.state.captcha)}
                                style={styles.captchaImgStyle}
                                needBaseUrl={false}/>
                        </TouchableOpacity>
                    </Input>
                </Column>
                <Button
                    style={styles.btnStyle}
                    title={'确定'}
                    onPress={this._onBtnLoginClick.bind(this)}/>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content:{
        marginTop:px2dp(20),
        backgroundColor:Color.white
    },
    input:{
        padding:px2dp(20)
    },
    btnStyle:{
        height:px2dp(88),
        margin:px2dp(30),
        borderRadius:px2dp(10)
    },
    captchaImgStyle:{
        ...wh(170,70),
        resizeMode:'contain'
    },
});
