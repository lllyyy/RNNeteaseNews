import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
} from 'react-native';
import BaseScreen from "../BaseScreen";
import OrderApi from "../../api/OrderApi";
import EmptyView from '../../view/EmptyView'
import OrderItem from "../../view/OrderItem";
export default class OrderScreen extends BaseScreen {
    /*支持手势返回，如果有页面不需要手势返回，则重写该方法，禁止掉手势 gesturesEnabled: false */
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.setTitle('订单列表')
        this.setGoBackVisible(false)
        this.state = {
            data:[],
           refreshState:false
        };
    }

    componentDidMount() {
        if (!isLogin) return;
        this._fetchData()
    }
    //接口请求
    _fetchData(){
        if (!isLogin) return;
        this.setState({refreshState :true})
        OrderApi.fetchOrderList(UserInfo.user_id,0).then((res) =>{
            this.setState({data:res})
        }).finally(()=>{
            this.setState({refreshState:false})
        })

    }
     getData(){

        alert("AAA")
    }

    renderView() {
        return (
            <FlatList
                onRefresh={this._fetchData()}
                refreshing={this.state.refreshState}
                style={{flex:1}}
                data={this.state.data}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => index + item.restaurant_name}
                contentContainerStyle={[{flex: 1}, this._contentStyle()]}//屏幕居中
                ListEmptyComponent={()=>  <EmptyView retryClick={() =>{
                    alert('没有数据')
                }}/>}
            />


        );
    }

    _renderItem=()=>{
        return (
            <OrderItem
            data={item}
            onItemClick={()=>null}
            onAgainClick={()=>this.props.navigation.navigate('ShopInfo', {id: item.restaurant_id})}
            />
        )
    }

    _contentStyle(){
        return this.state.data.length ? null : {justifyContent: 'center', alignItems:'center'}
    }
}


