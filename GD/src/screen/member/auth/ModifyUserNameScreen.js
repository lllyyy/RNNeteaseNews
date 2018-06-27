import React, {Component} from 'react';
import {
    StyleSheet,

} from 'react-native';
import BaseScreen from "../../BaseScreen";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Input from "../../../view/Input";
import Column from "../../../view/Column";
import {marginLR, paddingLR, paddingTB, px2dp} from "../../../utils/ScreenUtil";
import Color from "../../../app/Color";
import Text from '../../../view/TextView'
import {Button,Toast} from 'teaset'

export default class ModifyUserNameScreen extends BaseScreen {
    constructor(props) {
        super(props);
        // 初始状态
        this.setTitle('修改用户名');

        this.name = ''
    }
    renderView() {
        return (
             <KeyboardAwareScrollView>
                 <Column style={styles.container}>
                     <Input
                         style={styles.inputStyle}
                         placeholder={' 输入用户名'}

                         onChangeText={(text)=>this.name = text}
                     />
                   <Text microSize gray text={'用户只能修改一次（5-24字符间）'} style={{...marginLR(15)}}/>
                     <Button style={styles.btnStyle}  title={'确认修改'}  titleStyle={{color:Color.white}}  onPress={this._onBtnClick.bind(this)}/>
                 </Column>
             </KeyboardAwareScrollView>
        );
    }
    _onBtnClick(){
        if (this.name === ''){
            Toast.message('输入用户名')
            return ;
        }

        UserInfo.userName = this.name;
        const navigation = this.props.navigation;
        navigation.state.params.callback(this.name);
        navigation.goBack()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:px2dp(15),

    },
    inputStyle:{
        flex:1,
        ...marginLR(15),
        ...paddingTB(20),
        borderWidth:px2dp(1),
        borderColor:Color.gray,
        borderRadius:px2dp(5),
        marginBottom:px2dp(20)
    },
    btnStyle:{
        height:px2dp(80),
        marginTop:px2dp(30),
        ...marginLR(15),
        borderColor:Color.white,
        backgroundColor:Color.theme,

    }
});
