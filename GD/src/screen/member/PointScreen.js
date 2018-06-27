import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    View,

} from 'react-native';
import BaseScreen from "../BaseScreen";
import Row from "../../view/Row";
import Column from "../../view/Column";
import Color from "../../app/Color";
import {marginLR, marginTB, paddingTB, px2dp, px2sp} from "../../utils/ScreenUtil";
import Text from '../../view/TextView'
import {Button} from 'teaset'
import Divider from '../../view/Divider'
import {toDecimal2} from "../../store/ShoppingCarStore";
/**
 * 我的积分
 */

export default class PointScreen extends BaseScreen {
    constructor(props) {
        super(props);
        // 初始状态
        this.setTitle('我的积分');
        this.state = {
            number:'11000000000',
            data: null
        };

    }

    componentDidMount() {

    }

    //提现button
    _computeBtnBg(){
        return UserInfo.balance > 0 ? Color.reseda :Color.gray
    }
    renderView() {
        return (
            <View style={styles.container}>
                <Column style={{backgroundColor:Color.theme}}>
                    <Column style={{backgroundColor:Color.white,margin:px2dp(20),borderRadius:px2dp(5), padding:px2dp(10)}}>
                        <Row verticalCenter style={{justifyContent:'space-between'}}>
                            <Text gray text={'当前积分'}/>
                            <Text theme text={'积分说明'}/>
                        </Row>
                        <Row style={{alignItems: 'flex-end',...marginTB(5,10)}}>
                            <Text text={toDecimal2(UserInfo.balance)} style={{fontSize: px2sp(50)}}/>
                            <Text microSize text={'元'} style={{marginBottom: px2dp(10),marginLeft:px2dp(10)}}/>
                        </Row>
                        <Button
                            style={{height:px2dp(80),backgroundColor:Color.red,borderWidth:0}}
                            title='积分兑换商品'
                            titleStyle={{color:Color.white}}

                        />
                    </Column>
                </Column>
                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index + item.name}
                    ItemSeparatorComponent={() => <Divider/>}
                    ListHeaderComponent={this._renderHeader}

                />
            </View>
        );
    }
    _renderHeader=()=>{
        return(
            <Text microSize gray text={'最近30天的积分记录'} style={{margin:px2dp(15)}}/>
        )
    }

    _renderItem =({item,index}) => {
        return (
            <Row style={{justifyContent:'space-between', padding:px2dp(15),backgroundColor:Color.white}}>
                <Column >
                    <Text black text={'点餐费用'}/>
                    <Text gray text={`订单号:${this.state.number}`}/>
                    <Text gray text={'2018-05-30 12:20:11'}/>
                </Column>
                <Column>
                    <Text black text={'收入'} style={{marginTop:px2dp(20)}}/>
                    <Text red text={'1500'}/>
                </Column>
            </Row>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
