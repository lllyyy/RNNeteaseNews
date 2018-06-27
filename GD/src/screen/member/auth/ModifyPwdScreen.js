import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import BaseScreen from "../../BaseScreen";
import AuthApi from "../../../api/AuthApi";

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Column from "../../../view/Column";
import Input from "../../../view/Input";
import {px2dp,wh} from "../../../utils/ScreenUtil";
import Divider from "../../../view/Divider";
import Image from '../../../view/Image'
import {Button,Toast} from 'teaset'
import Color from '../../../app/Color'


export default class ModifyPwdScreen extends BaseScreen {
    constructor(props) {
        super(props);
        // 初始状态
        this.setTitle('重置密码');
        this.state = {
            captcha:null
        };
        this.userName = props.navigation.state.params.name;
        this.nameText= '';
        this.oldPwdText = '';
        this.pwdText = '';
        this.confirmPwdText = '';
        this.codeText = ''

    }


    componentDidMount() {
        this._fetchRefreshCaptcha()
    }
    //活期验证吗
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
                        label={'账号'}
                        bgViewStyle={styles.inputStyle}
                        placeholder={'请输入账号'}
                        value={this.userName}
                        onChangeText={(text) =>this.nameText = text}
                    />
                    <Divider/>
                    <Input
                        label={'旧密码'}
                        bgViewStyle={styles.inputStyle}
                        placeholder={'请输入旧密码'}
                        secureTextEntry={true}
                        onChangeText={(text) =>this.oldPwdText = text}
                    />
                    <Divider/>
                    <Input
                        label={'新密码'}
                        bgViewStyle={styles.inputStyle}
                        placeholder={'新密码'}
                        secureTextEntry={true}
                        onChangeText={(text) =>this.pwdText = text}
                    />
                    <Divider/>
                    <Input
                        label={'确认密码'}
                        bgViewStyle={styles.inputStyle}
                        placeholder={'确认密码'}
                        secureTextEntry={true}
                        onChangeText={(text) =>this.confirmPwdText = text}
                    />
                    <Divider/>
                    <Input
                        label={'验证码'}
                        bgViewStyle={styles.inputStyle}
                        placeholder={'请输入验证码'}
                        onChangeText={(text) =>this.codeText = text}
                    >
                        <TouchableOpacity onPress={this._fetchRefreshCaptcha}>
                            <Image source={decodeURIComponent(this.state.captcha)} style={styles.captchaImgStyle} needBaseUrl={false}/>
                         </TouchableOpacity>
                    </Input>
                </Column>
                 <Button
                     style={styles.btnStyle}
                     title='确认'
                     onPress={this._onBtnLoginClick}
                 />
            </KeyboardAwareScrollView>
        );
    }


    _onBtnLoginClick =()=>{
        if (this.userName === '') {
            Toast.message('请输入手机号/邮箱/用户名');
            return
        }
        if(this.oldPwdText === ''){
            Toast.message('请输入旧密码');
            return
        }
        if(this.pwdText === ''){
            Toast.message('请输入新密码');
            return
        }
        if (this.confirmPwdText === '') {
            Toast.message('请输入新密码');
            return
        }

        if(this.codeText === ''){
            Toast.message('请输入验证码');
            return
        }

        this._fetch()
    }

    _fetch =() => {
        AuthApi.fetchUpdatePwd(this.userName,this.oldPwdText,this.pwdText,this.confirmPwdText,this.codeText).then((res) => {

            this.props.navigation.goBack()
            Toast.message('修改成功')
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content:{
        marginTop: px2dp(20),
        backgroundColor: Color.white
    },
    inputStyle:{
        padding:px2dp(20)
    },
    captchaImgStyle:{
        ...wh(170,70),
        resizeMode:'contain'
    },
    btnStyle:{
        height:px2dp(88),
        margin:px2dp(30)
    }

});
