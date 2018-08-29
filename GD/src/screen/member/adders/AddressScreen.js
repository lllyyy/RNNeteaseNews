import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import BaseScreen from "../../BaseScreen";
import Text from '../../../view/TextView'
import EmptyView from '../../../view/EmptyView'
import {px2dp, wh} from "../../../utils/ScreenUtil";
import {inject,observer} from 'mobx-react'
import Row from "../../../view/Row";
import Color from "../../../app/Color";
import Column from "../../../view/Column";
import Images from "../../../app/Images";
import Image from '../../../view/Image'
import Divider from '../../../view/Divider'
@inject('addressListStore')
@observer

export default class AddressScreen extends BaseScreen {
    constructor(props) {
        super(props);
        // 初始状态
        this.setTitle('收货地址');

    }

    componentDidMount() {
        this.props.addressListStore.fetchData(UserInfo.user_id)
    }

    _isChose(){
        return this.props.navigation.state.params.chose
    }

    _onMenuClick = () => {
        this.props.navigation.navigate('AddAddress',{callback:this._handleAddAddressSuccess})
    };
    /*下单的时候选择地址，回调*/
    _onItemClick = (item) => {
        const navigation = this.props.navigation;
        if (this._isChose()){
            navigation.state.params.callback(item);
            navigation.goBack()
        }
    };
    /*添加地址成功后回调，刷新页面*/
    _handleAddAddressSuccess = (state) => {
        if (state) this.props.addressListStore.fetchData(UserInfo.user_id)
    };

    //删除添加的地址
    _fetchDeleteAddress(item){
        this.props.addressListStore.deleteItem(UserInfo.user_id, item);
    }

    renderMenu(){
        return(
            <TouchableOpacity onPress={this._onMenuClick}>
                <Text white text={'新增'} style={{margin:px2dp(15)}}/>
            </TouchableOpacity>
        )
    }

    renderView() {
        return (
             <FlatList
                 data={this.props.addressListStore.getList}
                 renderItem={this._renderItem}
                 keyExtractor={(item, index) => index + ''}
                 ItemSeparatorComponent={() => <Divider style={{height:px2dp(20)}}/>}
                 contentContainerStyle={[{flex: 1}, this._contentStyle()]}//屏幕居中
                 ListEmptyComponent={() =><EmptyView  />}
             />
        );
    }

    _contentStyle(){
        return this.props.addressListStore.getList.length ? null : {justifyContent: 'center', alignItems:'center'}
    }
    //item每一项
    _renderItem=({item,index})=>{
        return(
            <TouchableOpacity activeOpacity={this._isChose() ? 0.1:1} onPress={() => this._onItemClick() }>
                <Row style={styles.itemStyle}>
                    <Column style={{justifyContent:'space-between'}}>
                        <Text mediumSize text={item.address}/>
                        <Text mediumSize text={item.phone}/>
                    </Column>
                    <TouchableOpacity onPress={() =>this._fetchDeleteAddress(item)}>
                        <Image source={Images.Common.close} style={{...wh(30),margin:px2dp(10)}}/>
                    </TouchableOpacity>
                </Row>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemStyle:{
        justifyContent:'space-between',
        padding:px2dp(20),
        backgroundColor:Color.white
    }
});
