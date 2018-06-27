import React, {Component} from 'react';
import {
    StyleSheet,

} from 'react-native';
import BaseScreen from "../BaseScreen";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Row from "../../view/Row";
import {paddingLR, paddingTB, px2dp} from "../../utils/ScreenUtil";
import Text from  '../../view/TextView'
import Column from "../../view/Column";
import Color from "../../app/Color";
import Input from "../../view/Input";
import Divider from "../../view/Divider";
import {Button} from 'teaset'

/**
 * 兑换会员
 *
 */
export default class ExchangeVIPScreen extends BaseScreen {
    constructor(props) {
        super(props);
        // 初始状态
        this.setTitle('兑换会员');
        this.state = {

        };
       this.numberText='';
       this.pwdText='';
    }
    renderView() {
        return (
            <KeyboardAwareScrollView>
                <Row verticalCenter style={{margin:px2dp(20)}}>
                    <Text gray text={'成功兑换后将关联到当前的账号:'}/>
                        <Text black text={'15527832500'} style={{fontWeight:'600'}}/>

                </Row>
                <Column style={{backgroundColor:Color.white}}>
                    <Input
                        bgViewStyle={styles.input}
                        keyboardType={'number-pad'}
                        placeholder={'请输入与10位卡号'}
                        onChangeText={(text) =>this.numberText =text}
                    />
                    <Divider/>
                    <Input
                        bgViewStyle={styles.input}
                        keyboardType={'number-pad'}
                        placeholder={'请输入与6位卡密'}
                        onChangeText={(text) =>this.pwdText =text}
                    />
                </Column>
                <Button
                    style={styles.btnStyle}
                    title={'确定'}
                    titleStyle={{color:Color.white}}
                        onPress={this._onBtnLoginClick.bind(this)}
                />
            </KeyboardAwareScrollView>
        );
    }
    _onBtnLoginClick(){

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input:{
        ...paddingLR(25),
        ...paddingTB(20)

    },
    btnStyle:{
        height:px2dp(88),
        margin:px2dp(30),
        borderWidth:0,
        backgroundColor:Color.theme,

    },
});
