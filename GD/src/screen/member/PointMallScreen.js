import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import BaseScreen from "../BaseScreen";
import EmptyView from  '../../view/EmptyView'
import Column from '../../view/Column'
/**
 * 积分商城
 */
export default class PointMallScreen extends BaseScreen {
    constructor(props) {
        super(props);
        // 初始状态
        this.setTitle('积分商城');
        this.state = {
            t:null
        };

    }
    renderView() {
        return (
            <Column style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <EmptyView/>
            </Column>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
