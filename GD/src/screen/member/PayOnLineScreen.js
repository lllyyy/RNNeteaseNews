import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import BaseScreen from "../BaseScreen";
import Column from "../../view/Column";
import {paddingLR, paddingTB, px2dp, px2sp, wh,aliPay,wxPay} from "../../utils/ScreenUtil";
import Color from "../../app/Color";
import Text from '../../view/TextView'
import CountDownView from '../../view/CountDownView'
import Row from "../../view/Row";
import Checkboc from '../../view/Checkbox'
import Images from '../../app/Images'
import Image from '../../view/Image'
import Divider from '../../view/Divider'
import {Button} from 'teaset'
/***
 *
 * 在线支付
 */

export default class PayOnLineScreen extends BaseScreen {
    constructor(props) {
        super(props);
        this.setTitle('在线支付');
        this.state = {
            selectIndex:0
        };
        this.endTime = new Date().getTime() + 1000 * 60 * 5  //倒计时毫秒
    }

    renderView() {
        return (
            <ScrollView style={styles.container}>
                <Column style={{height:px2dp(200),justifyContent:'center',alignItems:'center',backgroundColor:Color.white}}>
                    <Text black text={'支付剩余时间'}/>
                    <CountDownView
                        endTime={this.endTime}
                        daysStyle={styles.time}
                        hoursStyle={styles.time}
                        minsStyle={styles.time}
                        secsStyle={styles.time}
                        firstColonStyle={styles.colon}
                        secondColonStyle={styles.colon}
                        onEnd={()=> this.props.navigation.goBack()}/>
                </Column>
                <Text black text={'选择支付方式'} style={{...paddingLR(25), ...paddingTB(20)}}/>
                {this._renderItem(Images.PayOnLine.alipay, '支付宝', 0)}
                <Divider/>
                {this._renderItem(Images.PayOnLine.wechat, '微信', 1)}

                <Button
                    style={{height:px2dp(80), margin: px2dp(25),backgroundColor:Color.theme,borderWidth:0}}
                    title='确认支付'
                    titleStyle={{color:Color.white}}
                    onPress={this.payClick.bind(this)}
                />
            </ScrollView>
        );
    }

    _renderItem=(img,label,index)=>{
        return(
            <TouchableOpacity activeOpacity={1} onPress={this._onClick.bind(this,index)}>
                <Row verticalCenter style={styles.itemstyle}>
                    <Row verticalCenter>
                        <Image source={img} style={{...wh(80),marginRight:px2dp(15)}}/>
                        <Text text={label}/>
                    </Row>
                    <Checkboc disabled checked={this.state.selectIndex === index}/>
                </Row>
            </TouchableOpacity>
        )
    }
    //选择的什么方式支付
    _onClick=(index)=>{
        alert(index)
        console.log(index)
        this.setState({selectIndex:index})

    }
    //支付
    payClick=()=>{
        console.log(this.state.index)
        if (this.state.selectIndex === 0) {
            aliPay()//支付宝
        }else {
            wxPay()
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    //时间文字
    time: {
        fontSize: px2sp(50),
        fontWeight:'500',
        color: Color.black,
        paddingHorizontal: px2dp(3),
        marginHorizontal: px2dp(3)
    },
    //冒号
    colon: {
        fontSize: px2sp(50),
        fontWeight:'500',
        color: Color.black
    },
    itemstyle:{
        ...paddingLR(20),
        ...paddingTB(15),
        backgroundColor:Color.white,
        justifyContent: 'space-between',
    }
});
