import React, {PureComponent} from 'react'
import Row from "./Row";
import Color from "../app/Color";
import {TouchableOpacity, StyleSheet, View} from "react-native";
import PropTypes from "prop-types";
import Image from "./Image";
import {paddingLR, paddingTB, px2dp, wh} from "../utils/ScreenUtil";
import Column from "./Column";
import Text from  './TextView'
import StarRating from "./StarRating";
import Images from "../app/Images";
/**
 * 首页Item
 *
 */

export default class ShopListItem extends PureComponent {

    static  propTypes = {
        data:PropTypes.object.isRequired,
        onClick:PropTypes.func
    };



    render() {
        const data = this.props.data;
        console.log(data)
        return (
           <TouchableOpacity onPress={() => this.props.onClick()}>
               <Row verticalCenter style={{
                   justifyContent:'space-between',...paddingLR(20),...paddingTB(30),
                   backgroundColor:Color.white
               }}>
                   <Row verticalCenter>
                       <Image source={data.image_path} style={{...wh(100)}}/>
                       <Column style={{justifyContent:'space-between',marginLeft:px2dp(20)}}>
                           {/*标题*/}
                            <Row verticalCenter>
                                <Text microSize style={{backgroundColor:'yellow'}} text={'品牌'}/>
                                <Text style={styles.titleStyle}  text={data.name}/>
                            </Row>
                            {/*得分的星星*/}
                           <Row verticalCenter>
                                <StarRating
                                    disabled={true}
                                    rating={parseInt(data.rating)}
                                    maxStars={5}
                                    starSize={13}
                                />
                               <Text microSize style={{marginLeft:px2dp(5)}} orange text={data.rating}/>
                               <Text microSize style={{marginLeft:px2dp(10)}} text={`月销${data.recent_order_num}`}/>
                           </Row>
                           <Text microSize text={`￥${data.float_minimum_order_amount}起送 / 配送费约￥${data.float_delivery_fee}`}/>
                           <Row verticalCenter>
                               <Image source={Images.Main.location} style={{...wh(20)}}/>
                               <Text microSize style={styles.categoryStyle} gray text={data.category}/>
                           </Row>
                        </Column>
                    </Row>
                        {/*右边UI*/}
                        <Column style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
                            <Row verticalCenter>
                                {this.__renderIcon(data)}
                            </Row>
                            <Row verticalCenter>
                                <View style={[styles.icon, {borderColor: Color.theme, backgroundColor: Color.theme}]}>
                                    <Text microSize white text={'蜂鸟专送'}/>
                                </View>
                                <View style={[styles.icon, {borderColor: Color.theme, marginLeft:px2dp(10)}]}>
                                    <Text microSize theme text={'准时达'}/>
                                </View>
                            </Row>
                            <Row verticalCenter>
                                <Text microSize gray text={`${data.distance} / `}/>
                                <Text microSize theme text={data.order_lead_time}/>
                            </Row>
                        </Column>
               </Row>
           </TouchableOpacity>
        );
    }
    __renderIcon(data){
        let icon = [];
        {data.supports.map((item, index) =>

            icon.push(
                <View style={[styles.icon,{margin:px2dp(2)}]} key={index}>
                    <Text microSize gray  text={item.icon_name}/>
                </View>
            ))}

        return icon
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        padding: px2dp(2),
        borderRadius: px2dp(2),
        borderWidth: px2dp(1),
        borderColor: Color.divider
    },
    titleStyle:{
        fontWeight: '600',
        marginLeft:px2dp(10)
    },
    categoryStyle:{
        borderWidth:px2dp(1),
        marginLeft:px2dp(10),

        borderColor:Color.gray,
        ...paddingLR(5)
    },
});
