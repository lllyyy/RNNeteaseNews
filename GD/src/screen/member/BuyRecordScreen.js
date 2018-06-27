import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList
} from 'react-native';
import BaseScreen from "../BaseScreen";
import EmptyView from "../../view/EmptyView";
import Divider from "../../view/Divider";

/**
 * 购买会员记录
 */
export default class BuyRecordScreen extends BaseScreen {
    constructor(props) {
        super(props);
        this.setTitle('购买记录');
        this.state = {
            record:[]
        };
    }

    renderView() {
        return (
             <FlatList
                 data={this.state.record}
                 renderItem={this._renderItem}
                 contentContainerStyle={[{flex: 1}, this._contentStyle()]}
                 keyExtractor={(item, index) => index + ''}
                 ListEmptyComponent={() =><EmptyView/>}
                 ItemSeparatorComponent={()=><Divider/>}
             />
        );
    }
    _renderItem = ({item, index}) => {
        return null
    };
    _contentStyle(){
        return this.state.record.length ? null : {justifyContent: 'center', alignItems:'center'}
    }
}


