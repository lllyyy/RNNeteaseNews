import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import BaseScreen from "../BaseScreen";
import Column from "../../view/Column";
import Color from "../../app/Color";
import VisibleView from "../../view/VisibleView";
import Row from "../../view/Row";
import {marginLR, paddingLR, paddingTB, px2dp, wh,marginTB} from "../../utils/ScreenUtil";
import Text from  '../../view/TextView'
import Image from '../../view/Image'
import Images from "../../app/Images";
import {Button} from 'teaset'
import Divider from "../../view/Divider";

export default class OrderConfirmScreen extends BaseScreen {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.setTitle('确认订单')
        this.state = {
         };
      }


    renderView() {
        return (
            <Column style={{flex:1}}>
              <ScrollView style={{flex:1}}>
                  {this._renderAddress()}
                  <Row verticalCenter style={styles.timeStyle}>
                    <Text largeSize text={'送达时间'} style={{fontWeight:'600'}}/>
                      <Column style={{alignItems:'flex-end'}}>
                      <Text theme text={'尽快送达|预计 14:28'}/>
                      <Button title='蜂鸟专送' style={{width:px2dp(170),marginTop:px2dp(20),borderWidth:0}}/>
                      </Column>
                  </Row>
                  {this._renderItemWithImg('支付方式','支付方式')}
                  <Divider style={{...marginLR(20)}}/>
                  {this._renderItem('红包','暂不支持')}
                  <Row verticalCenter style={{padding:px2dp(20),marginTop:px2dp(20),backgroundColor:Color.white}}>
                      <Image source={Images.Common.shopBg} style={{...wh(50)}}/>
                      <Text text={'效果演示'}/>
                  </Row>
                  <Divider/>
                  <Row verticalCenter style={{justifyContent:'space-between', padding:px2dp(20),backgroundColor:Color.white}}>
                  <Text mediumSize text={'视频名称'}/>
                      <Row verticalCenter>
                        <Text mediumSize text={'x2'} style={{color:'red',marginRight:px2dp(30)}}/>
                          <Text mediumSize text={'￥20'}/>
                      </Row>
                 </Row>
                  {this._renderItem('餐盒', '￥2')}
                  {this._renderItem('配送费', '￥3')}
                  {this._renderItemWithImg('订单备注', '口味、偏好等')}
                  {this._renderItemWithImg('发票抬头', '不需要开发票')}
              </ScrollView>
                <Row style={{height: px2dp(90)}}>
                    <Row verticalCenter style={{flex: 3, paddingLeft: px2dp(25), backgroundColor: Color.black}}>
                        <Text white text={'待支付 ￥211'}/>
                    </Row>
                    <Button title={'确认下单'} style={{flex: 1, backgroundColor: Color.reseda, borderWidth:0,borderRadius:0}} onPress={this._onConfirmBtn}/>
                </Row>
            </Column>
        );
    }

    _renderItemWithImg(lable,lable2){
          return(
              <Row verticalCenter style={{justifyContent:'space-between',...paddingLR(20),...paddingTB(15),backgroundColor:Color.white}}>
                  <Text text={lable}/>
                  <Row verticalCenter>
                      <Text mediumSize text={lable2} style={{color:Color.gray2}}/>
                      <Image source={Images.Common.arrowRight} style={{...wh(15),titleColor:Color.gray2}}/>
                  </Row>
              </Row>
          )
    }

    _renderItem(label1, label2) {
        return (
            <Row verticalCenter style={{justifyContent: 'space-between', padding: px2dp(20), backgroundColor: Color.white}}>
                <Text mediumSize text={label1}/>
                <Text mediumSize text={label2} style={{color: Color.gray2}}/>
            </Row>
        )
    }

    _renderAddress(){
          return(
              <TouchableOpacity onPress={this._chooseAddress}>
                  <Column style={{backgroundColor:Color.white}}>
                      <VisibleView visible={true}>
                          <Row verticalCenter horizontalCenter style={{height:px2dp(150),justifyContent:'center',alignItems:'center'}}>
                             <Text text={'请选择收货地址'}/>
                          </Row>
                       </VisibleView>

                      <VisibleView visible={false}>
                      <Row verticalCenter style={{height:px2dp(150),justifyItem:'space-between',...paddingLR(20)}}>
                          <Row verticalCenter>
                              <Image source={Images.Main.location} style={{...wh(30),tintColor:Color.theme,marginRight:px2dp(10)}}/>
                              <Column>
                                  <Row verticalCenter>
                                      <Text largeSize text={'姓名'} style={{fontWeight:'600'}}/>
                                      <Text mediumSize text={'先生155'}/>
                                  </Row>

                                  <Row verticalCenter>
                                       <View style={{borderRadius:px2dp(6),padding:px2dp(6),backgroundColor:'pink'}}>
                                           <Text smallSize text={'详细地址'}/>
                                       </View>
                                      <Text mediumSize text={'405'}/>
                                  </Row>
                              </Column>
                          </Row>
                          <Image source={Images.Common.arrowRight} style={{...wh(20), tintColor: Color.gray3}}/>
                      </Row>
                      </VisibleView>
                  </Column>
              </TouchableOpacity>

          )
    }

    _chooseAddress=()=>{
        this.props.navigation.navigate('Address',{chose:true, callback:this._handleChoseAddress})
    }

    _onConfirmBtn = () => {
        this.props.navigation.navigate('PayOnLine')
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    timeStyle:{
        ...marginTB(20),
        justifyContent: 'space-between',
        borderLeftColor: Color.theme,
        borderLeftWidth: px2dp(10),
        padding: px2dp(20),
        backgroundColor: Color.white
    }
});
