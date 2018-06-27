/**
 * 个人信息页面
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import BaseScreen from "../../BaseScreen";
import Column from "../../../view/Column";
import Color from "../../../app/Color";
import Row from "../../../view/Row";
import {paddingTB, paddingLR, wh, px2dp, marginLR, marginTB} from "../../../utils/ScreenUtil";
import Text from '../../../view/TextView'
import Image from  '../../../view/Image'
import Divider from '../../../view/Divider'
import Images from  '../../../app/Images'
import {Button} from 'teaset';
import DialogLogout from  '../../../dialog/DialogLogout'


import ImagePicker from 'react-native-image-picker';

var options = {
    title: 'Select Avatar',
    customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};


export default class UserInfoScreen extends BaseScreen {


    constructor(props) {
        super(props);
        // 初始状态
        this.setTitle('个人信息');
        this.state = {
            avatarSource:null,
            userName:UserInfo.username
        };
  }

    renderView() {
        return (
             <ScrollView style={styles.container}>
                 <Divider style={styles.headDividerStyle}/>
                 {this._renderItem(null,'头像',<Image source={UserInfo.avatar === null ? UserInfo.avatar:this.state.avatarSource }   style={styles.hedaerImg}/>)}
                 <Divider/>
                 {this._renderItem(null,'用户名',<Text text={this.state.userName}/>)}
                 <Divider/>
                 {this._renderItem(null,'收货地址',null)}
                 <Divider/>
                 {this._renderItemType2('账号绑定')}
                 {this._renderItem(this._renderPhoneIcon(), '手机', <Text text={UserInfo.mobile}/>)}
                 {this._renderItemType2('安全设置')}
                 {this._renderItem(null, '登录密码', <Text gray text={'修改'}/>)}
                 <Button type='danger'   title='退出登录' style={{...marginTB(20),...marginLR(15),...paddingTB(25)}}
                         onPress={this._logoutBtnClick}/>
                <DialogLogout ref={(d)=>this.dialog=d} handleRightBth={this._handleRightBth}/>
             </ScrollView>
        );
    }

    //退出登录
    _logoutBtnClick=()=>{
        this.dialog.show()
    }

    _handleRightBth =() =>{
        isLogin = false;
        const navigation = this.props.navigation;
        navigation.state.params.callback();
        navigation.goBack()
    }

    //每一个item
    _renderItem(img = null ,lable, view:Element = null)  {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => this._onItemClick(lable)} >
                <Row verticalCenter style={styles.itemStyle}>
                    <Row verticalCenter>
                        {img !== null ? img:null}
                        <Text text={lable}/>
                    </Row>

                    <Row verticalCenter>
                        {view !== null ? view:null}
                        <Image source={Images.Common.arrowRight}
                               style={{...wh(25), marginLeft: px2dp(10), tintColor: Color.gray2}}/>
                    </Row>
                </Row>
            </TouchableOpacity>
         )}

    _renderItemType2(label) {
        return(
            <Row verticalCenter style={[styles.itemStyle, {backgroundColor: Color.background}]}>
                <Text text={label}/>
            </Row>
        )
    }
    _renderPhoneIcon = () => <Image source={Images.My.phone} style={styles.iconPhoneStyle}/>


    _onItemClick = (lable) => {
        const navigation = this.props.navigation;
        if (lable === '用户名'){
            navigation.navigate('ModifyUserName',{callback:this._handleModifySuccess})
        }else if (lable === '收货地址'){
            navigation.navigate('Address',{chose:false})
        }else if (lable === '登录密码'){
            navigation.navigate('ModifyPwd',{name:this.state.userName})
        }else if (lable === '头像'){
            this.selectPhotoTapped()
           // navigation.navigate('ModifyPwd',{name:this.state.userName})
        }else if (lable === '手机'){
            navigation.navigate('PhoneMoblie',{phone:this.state.userName})
        }
    }

    _handleModifySuccess=(name) =>{
        this.setState({
            userName:name
        })
    }

    //相册
    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
               // let source = { uri: response.uri };
              //  console.log('sourcesourcesource ', source);
                // You can also display the image using data:
                 let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headDividerStyle:{
        height:px2dp(20),
      //  backgroundColor:Color.gray2
    },
    itemStyle:{
        justifyContent:'space-between',
        ...paddingTB(20),
        ...paddingLR(15),
       backgroundColor:Color.white
    },
    hedaerImg:{
        ...wh(80),
        borderRadius: px2dp(30)
    },
    iconPhoneStyle:{
        ...wh(35),
        marginRight: px2dp(10),
        tintColor: Color.theme
    }


});
