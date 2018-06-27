import React, {Component} from 'react';
import {
    StyleSheet,

} from 'react-native';
import BaseScreen from "../../BaseScreen";
import ScrollableTabView from 'react-native-scrollable-tab-view'
import Column from "../../../view/Column";
import BusinessVouchers from "./BusinessVouchers";
import RedPacket from "./RedPacket";
import TabBar from '../../../view/TabBar'
import OverduePage from "./OverduePage";
/**
 *
 * 我的优惠
 */


export default class DiscountScreen extends BaseScreen {
    constructor(props) {
        super(props);
        // 初始状态
        this.setTitle('我的优惠');
        this.state = {
            t:null
        };

    }
    renderView() {
        return (
            <Column style={styles.container}>
                <ScrollableTabView renderTabBar={() => <TabBar/>}>
                    <RedPacket tabLabel={'红包'} navigation={this.props.navigation}/>
                    <BusinessVouchers tabLabel={'商家代金券'}/>
                    <OverduePage tabLabel={'已过期'}/>
                </ScrollableTabView>
            </Column>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
