import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { px2dp } from "../../utils/ScreenUtil";
import BaseScreen from "../BaseScreen";

/**
 * 通讯录
 *
 * @type {string[]}
 */

    // 列表数据源
const brands = [ 'A', 'ARMANI', 'B', 'BALLY', 'BOTTEGA VENETA', 'BOSS', 'BURBERRY', 'C', 'CARTIER', 'COACH', 'CHOW TAI FOOK', 'Chow Sang Sang', 'D', 'DOLCE & GABBANA', 'DUNHILL',
        'E', 'EMPHASIS', 'F', 'FENDI', 'Ferragamo', 'FURLA', 'G', 'GUCCI', 'H', 'I', 'J', 'K', 'kate spade', 'KENZO', 'L', 'LA PERLA', 'LONGCHAMP', 'Longines', 'LUKFOOK JEWELLERY',
        'M', 'MCM', 'MICHAEL KORS', 'MIDO', 'MIUMIU', 'MOVADO', 'MONT BLANC', 'N', 'O', 'OMEGA', 'P', 'PRADA', 'PANDORA', 'Q', 'R', 'RayBan', 'RIMOWA', 'ROLEX',
        'S', 'SWAROVSKI', 'T', 'TAGHeuer', 'TESIRO', 'TISSOT', 'Tiffany & Co.', 'TORY BURCH', 'TOUS', 'U', 'V', 'VALENTINO', 'Versace', 'W', 'X', 'Y', 'Y-3', 'Z', 'Zegna' ];
// 字母
const letters = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];

export default class BrandPage extends BaseScreen {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            currentLetter : 'A'
        };
    }

    renderView() {
        return (
            <View style={styles.container}>
                <FlatList style={{ flex : 1 }}
                          data={brands}
                          renderItem={this._renderItemComponent}
                          scrollEventThrottle={40}
                          onScroll={(event) => this._onScroll(event)}
                          keyExtractor={(item, index) => 'Brand' + index}
                          ref={(view) => this._flatList = view}
                          getItemLayout={(data, index) => (
                              { length : px2dp(60), offset : px2dp(60) * index, index }
                          )}
                />
                <View
                    style={{ width : px2dp(45), backgroundColor : '#fff', alignItems : 'center', justifyContent : 'center' }}>
                    {
                        // 遍历字母数组， 分别渲染每个字母
                        letters.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={this._indexPress.bind(this, item)}>
                                    <Text style={{
                                        color : item === this.state.currentLetter ? ' #EE0000' : '#333',
                                        fontSize : item === this.state.currentLetter ? px2dp(36) : px2dp(20),
                                        paddingVertical : px2dp(5)
                                    }}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        );
    }

    _indexPress(item) {
        let index = brands.indexOf(item);//获取字符串的下标
        this._flatList.scrollToIndex({ viewPosition : 0, index : index, animated : false });
        this.setState({
            currentLetter : item
        })
    }

    _renderItemComponent = ({ item, index }) => {
        if (item.length === 1) { // 如果是某一个字母 则不可以点击
            return (
                <View style={{
                    backgroundColor : '#f1f6f6',
                    paddingLeft : px2dp(36),
                    height : px2dp(60),
                    justifyContent : 'center'
                }}>
                    <Text style={{ color : '#333', fontSize : px2dp(30) }}>{item}</Text>
                </View>
            )
        } else {
            return (
                <TouchableOpacity style={{
                    backgroundColor : '#fff',
                    paddingLeft : px2dp(36),
                    height : px2dp(60),
                    justifyContent : 'center'
                }}>
                    <Text style={{ color : '#333', fontSize : px2dp(30) }}>{item}</Text>
                </TouchableOpacity>
            )
        }
    };

    // 监听 FlatList 滚动事件，动态设置选中的字母
    _onScroll(event) {
        let offsetY = event.nativeEvent.contentOffset.y;

        let offsetIndex = parseInt((offsetY + px2dp(15)) / px2dp(60));
        if (offsetIndex < 0) {
            offsetIndex = 0;
        }
        if (offsetIndex > brands.length - 1) {
            offsetIndex = brands.length - 1;
        }
        let toLetter = brands[ offsetIndex ].substring(0, 1).toUpperCase();//得到选中的字符串

        this.setState({
            currentLetter : toLetter
        })
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#f5f5f5',
        paddingTop : px2dp(4),
        flexDirection : 'row'
    },
});
