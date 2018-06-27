import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import BaseScreen from "../../BaseScreen";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Column from "../../../view/Column";
import Input from "../../../view/Input";
import {paddingLR, paddingTB,px2dp} from "../../../utils/ScreenUtil";
import {Button,Toast} from 'teaset'
import Color from "../../../app/Color";
import Text from  '../../../view/TextView'
import Row from "../../../view/Row";
import AddressApi from "../../../api/AddressApi";
export default class AddAddressScreen extends BaseScreen {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.setTitle('新增地址');

        this.state = {
            item2HasValue:false, //用来判断小区那一栏是否有值，有则更新字体颜色
            addressName:'小区/写字楼/学校等',
        };
        this.address=null;//搜索反传值的对象
        this.name='';
        this.detailAddress='';
        this.phone='';
        this.phone2='';
       }

     //跳转到搜索地址界面
    addressScreen(){
          this.props.navigation.navigate('SearchAddress',{callback:this._handleAddAddress})
    }
    //回调 传值
    _handleAddAddress=(address)=>{
         //回调回来的值
        this.address = address;
        this.setState({
            item2HasValue: true,
            addressName: address.name
        })
    }

    //保存编辑的地址
    _onBtnClick(){
        if (this.name === '') {
            Toast.message('请输入姓名');
            return;
        }
        if (this.detailAddress === '') {
            Toast.message('请输入详情地址');
            return;
        }
        if (this.phone === '') {
            Toast.message('请输入电话');
            return;
        }
        if (this.phone2 === '') {
            Toast.message('请输入备用电话');
            return;
        }
        if (this.address === '') {
            Toast.message('请输入地址');
            return;
        }
        this._fetchAddress()
    }

    _fetchAddress(){
          alert(this.state.addressName)
        AddressApi.fetchAddAddress(UserInfo.user_id,this.state.addressName,
            this.detailAddress,this.address.geohash,this.name,this.phone,this.phone2).then((res)=>{

            Toast.message(res.success);
            const  navigation = this.props.navigation;
            navigation.state.params.callback(true)
            navigation.goBack()
        })
    }

    renderView() {
        return (
            <KeyboardAwareScrollView>
                <Column style={styles.contentStyle}>
                    <Input
                        bgViewStyle={styles.input}
                        placeholder={'请输入您的姓名'}
                        value={this.name}
                        onChangeText={(text) => this.name = text}
                    />
                    <TouchableOpacity activeOpacity={0.5} onPress={this.addressScreen.bind(this)}>
                        <Row verticalCenter style={styles.input}>
                            <Text gray text={this.state.addressName} style={{color:this.state.item2HasValue ? Color.black: Color.gray3}}/>
                        </Row>
                    </TouchableOpacity>
                    <Input
                        bgViewStyle={styles.input}
                        placeholder={'请输入详细地址'}
                        value={this.detailAddress}
                        onChangeText={(text) => this.detailAddress = text}
                    />
                    <Input
                        bgViewStyle={styles.input}
                        placeholder={'请输入您的手机号'}
                        value={this.phone}
                        onChangeText={(text) => this.phone = text}
                    />
                    <Input
                        bgViewStyle={styles.input}
                        placeholder={'备用联系人电话'}
                        value={this.phone2}
                        onChangeText={(text) => this.phone2 = text}
                    />
                </Column>
                <Button
                    title={'新增地址'}
                    style={styles.btnStyle}
                    titleStyle={{color:Color.white}}
                    onPress={this._onBtnClick.bind(this)}
                />
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    contentStyle: {
        padding: px2dp(20),
        marginTop: px2dp(20),
        backgroundColor: Color.white
    },
    input:{
        marginBottom: px2dp(20),
        borderWidth: px2dp(1),
        borderColor: Color.divider,
        borderRadius: px2dp(3),
        backgroundColor:Color.gray,
        ...paddingLR(10),
        ...paddingTB(20)
    },
    btnStyle:{
        margin: px2dp(20),
        ...paddingTB(25),
        borderRadius: px2dp(5),
        backgroundColor: Color.theme,
        borderWidth:0,
    }
});
