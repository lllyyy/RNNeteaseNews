import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    TouchableOpacity,

} from 'react-native';
import BaseScreen from "../BaseScreen";
import Row from "../../view/Row";
import Text from  '../../view/TextView'
import {marginLR, marginTB, paddingLR, paddingTB,wh,px2dp} from "../../utils/ScreenUtil";
import Column from "../../view/Column";
import Color from "../../app/Color";
import Image from  '../../view/Image'
import Images from "../../app/Images";
import Divider from '../../view/Divider'
/**
 * 饿了么会员
 */
export default class ElmVIPScreen extends BaseScreen {
    constructor(props) {
        super(props);
        // 初始状态
        this.setTitle('饿了么会员');
        this.state = {
            t:null
        };

    }
    renderView() {
        return (
            <ScrollView style={styles.container}>
                <Row verticalCenter>
                    <Text gray text={'未账号'} style={{...marginLR(25,0),...marginTB(20)}}/>
                    <Text text={UserInfo.user_id} style={{fontWeight:'600',...marginLR(5)}}/>
                    <Text gray text={'购买会员'}/>
                </Row>
                <Column style={{...paddingLR(25,20),...paddingTB(20),backgroundColor:Color.white}}>
                    <Row verticalCenter style={{justifyContent:'space-between'}}>
                        <Text largeSize text={'会员特权'}/>
                            <TouchableOpacity >
                                <Row verticalCenter>
                                    <Text  theme text={'会员说明'}/>
                                    <Image source={Images.Common.arrowRight} style={styles.arrowStyle}/>
                                </Row>
                            </TouchableOpacity>
                      </Row>
                    <Divider style={{marginTop:px2dp(25)}}/>
                    {this._renderActivity()}
                    <Divider/>
                    {this._renderActivity()}
                </Column>

                <Column style={{...marginTB(20,0),backgroundColor:Color.white}}>
                   <Text black text={'开通会员'} style={{margin: px2dp(25)}}/>

                    <Divider style={{marginLeft:px2dp(25)}}/>
                    <Row verticalCenter style={{justifyContent:'space-between',...paddingLR(25),...paddingTB(20)}} >
                        <Text text={'1个月'}>
                            <Text orange text={'￥20'} style={{fontWeight:'600'}}/>
                        </Text>
                        <TouchableOpacity onPress={this._buyClick.bind(this)}>
                            <Text orange text={"购买"}/>
                        </TouchableOpacity>
                    </Row>
                </Column>

                {this._renderItemView('兑换会员','使用卡号卡密')}
                {this._renderItemView('购买记录','开发票')}
            </ScrollView>
        );
    }
    _renderItemView=(lable,detalie)=> {
        return(
           <TouchableOpacity onPress={this._onItemClick.bind(this,lable)}>
            <Row verticalCenter style={{justifyContent:'space-between',...paddingLR(25),...paddingTB(20),backgroundColor:Color.white,marginTop:px2dp(20)}}>
                <Text black  text={lable}/>
                <Row verticalCenter>
                    <Text gray text={detalie}/>
                    <Image source={Images.Common.arrowRight} style={styles.arrowStyle}/>
                </Row>
            </Row>
            </TouchableOpacity>
        )
     }


    //会员特权
    _renderActivity=()=>{
         return(
            <Row verticalCenter>
                <Image source={Images.Main.homeTabClick} style={{...wh(100),marginRight:px2dp(25)}}/>
                <Column style={{flex:1,...paddingTB(10)}}>
                    <Text black text={'减免配送费'}/>
                    <Text mediumSize gray text={'每月减免30单，每日可减免3单，每天最高减免4元'}/>
                    <Text mediumSize gray text={'蜂鸟专送专享'}/>
                </Column>
            </Row>
            )
     }
    //点击购买
    _buyClick=()=>{
        this.props.navigation.navigate('PayOnLine')
    }
    //兑换会员
    _onItemClick(lable){

        if (lable === '兑换会员') {
            this.props.navigation.navigate('ExchangeVIP')
        }else {
            this.props.navigation.navigate('BuyRecord')
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    arrowStyle:{
        ...wh(20),
        marginLeft: px2dp(10),
        tintColor:Color.gray2
    },
});
