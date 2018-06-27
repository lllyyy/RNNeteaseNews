import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import BaseScreen from "../BaseScreen";
import Column from "../../view/Column";
import Row from "../../view/Row";
import Color from "../../app/Color";
import {marginLR, paddingLR, paddingTB, px2dp, wh} from "../../utils/ScreenUtil";
import Image from '../../view/Image'
import Images from "../../app/Images";
import Text from '../../view/TextView'
import Divider from "../../view/Divider";

export default class ServiceCenterScreen extends BaseScreen {
    constructor(props) {
        super(props);
        // 初始状态
        this.setTitle('服务中心');
        this.state = {
            t:null
        };

    }
    renderView() {
        return (
            <ScrollView style={styles.container}>
                <Row verticalCenter style={{backgroundColor:Color.white,height:px2dp(150)}}>
                    {this.renderItem(Images.My.service,'在线客服')}
                    <Divider  height={100} vertical={true}/>
                    {this.renderItem(Images.ServiceCenter.phone,'电话客服')}
                </Row>
                <Divider/>
                <Row verticalCenter style={{backgroundColor:Color.white}}>
                     <Text black text={'热门问题'} style={{fontWeight:'600',...paddingTB(40),...paddingLR(20)}}/>
                </Row>
                <Divider/>
                {this.renderItemText('超级会员权益说明')}
                <Divider/>
                {this.renderItemText('签到规则')}
                <Divider/>
                {this.renderItemText('用户等级说明')}
                <Divider/>
                {this.renderItemText('超级会员权益说明')}
                <Divider/>
                {this.renderItemText('积分问题')}
                <Divider/>
                {this.renderItemText('支付问题')}
                <Divider/>
                {this.renderItemText('超级会员权益说明')}
                <Divider/>
                {this.renderItemText('其他问题')}
                <Divider/>
                {this.renderItemText('会员问题')}


             </ScrollView>
        );
    }

    renderItem(img,label){
        return (
            <Column style={{justifyContent:'center',alignItems:'center',flex:0.5}}>
                <Image source={img} style={{...wh(30),marginBottom:px2dp(10)}}/>
                <Text black text={label}/>
            </Column>
         )
    }

    renderItemText(label){
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={this.itemClick.bind(this,label)}>
            <Row verticalCenter style={{backgroundColor:Color.white,justifyContent:'space-between',...paddingLR(0,15)}}>
                <Text text={label} style={{...paddingTB(20),...paddingLR(15,0)}}/>
                <Image source={Images.Common.arrowRight} style={{...wh(20) , tintColor:Color.gray2}}/>
            </Row>
            </TouchableOpacity>
        )
    }

    itemClick(label){
        alert(label)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
