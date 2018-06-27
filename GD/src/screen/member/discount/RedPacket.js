import React, {Component} from 'react';
import {
    StyleSheet,
     FlatList
} from 'react-native';
import Column from "../../../view/Column";
import RedPacketApi from "../../../api/RedPacketApi";
import {marginLR, paddingLR, paddingTB, px2dp, px2sp, screenW} from "../../../utils/ScreenUtil";
import Divider from '../../../view/Divider'
import Row from "../../../view/Row";
import Color from "../../../app/Color";
import Text from  '../../../view/TextView'
import {Button,Toast} from 'teaset'
import EmptyView from "../../../view/EmptyView";

/**
 * 优惠券红包页面
 */

export default class RedPacket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        RedPacketApi.fetchGetRedPacketNum(UserInfo.user_id).then((res) =>{
            this.setState({
                 data:res
            })
        })
    }

    render() {
        return (
            <Column style={styles.container}>

                {
                    this.state.data.length > 0 ?
                    <FlatList
                    data={this.state.data}
                    style={{...marginLR(20)}}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index + item.name}
                    ItemSeparatorComponent={() => <Divider height={20} color={'transparent'}/>}
                    ListHeaderComponent={this._renderHeader}
                    ListFooterComponent={this._renderFooter}
                />:<Column style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <EmptyView/>
                </Column>
                }

                 <Row verticalCenter style={{backgroundColor:Color.background}}>
                    <Button

                        onPress={this.ChangeRedPacket.bind(this)}
                        title='兑换红包'
                        titleStyle={{color:Color.black}}
                        style={[styles.btnStyle,{marginRight:px2dp(1)}]}
                    />
                    <Button

                        title='推荐有奖'
                        titleStyle={{color:Color.black}}
                        style={[styles.btnStyle]}
                    />
                </Row>
            </Column>
        );
    }

    ChangeRedPacket(){
        this.props.navigation.navigate('ChangeRedPacket')
    }

    //渲染每一个Item
    _renderItem=({item,index}) => {
        return (
            <Row style={styles.itemStyle}>
                <Column>
                    <Row style={{alignItems:'flex-end'}}>
                        <Text smallSize red text={'￥'} style={{...paddingTB(0,5)}}/>
                        <Text red text={item.amount} style={{fontSize:px2sp(40)}}/>
                    </Row>
                    <Text mediumSize text={item.description_map.sum_condition} style={{marginTop:px2dp(15)}}/>
                  </Column>
                   <Column style={{marginLeft:px2dp(20)}}>
                       <Text mediumSize text={item.name}/>
                       <Text mediumSize gray text={item.description_map.validity_periods}/>
                       <Text mediumSize gray text={item.description_map.phone}/>
                   </Column>
                <Text mediumSize red text={item.description_map.validity_delta}/>
            </Row>

        )
    }
    //列表的头视图
    _renderHeader=()=>{
        return (
            <Row verticalCenter style={{justifyContent:'space-between' ,...paddingTB(15)}}>
                <Text smallSize> {'有 '}
                 <Text red text={this.state.data.length}/>
                 <Text smallSize black text={'个红包即将到期'}/>
                </Text>

                <Text smallSize theme text={'红包说明'}/>
            </Row>

        )
    }
    //列表的尾部
    _renderFooter =() =>{
        return (
            <Text smallSize gray text={'限品类： 快餐便当、特色菜系、小吃夜宵、甜品饮品、异国料理'} style={{margin:px2dp(15)}}/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemStyle:{
        justifyContent:'space-between',
        padding:px2dp(15),
        borderRadius:px2dp(8),
        backgroundColor:Color.white
    },
    btnStyle:{
        borderWidth:0,
        width:screenW/2,
        height:px2dp(70),
        backgroundColor:Color.white
    }
});
