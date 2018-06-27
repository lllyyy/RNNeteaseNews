import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    View,
    Keyboard
} from 'react-native';
import BaseScreen from "../BaseScreen";
import Column from "../../view/Column";
import Row from "../../view/Row";
import {paddingLR, px2dp, px2sp,screenW,wh} from "../../utils/ScreenUtil";
import Color from "../../app/Color";
import {Button,Toast} from 'teaset';
import {inject,observer} from 'mobx-react';
import VisibleView from "../../view/VisibleView";
import Text from '../../view/TextView'
import ShopListItem from '../../view/ShopListItem'
import Divider from '../../view/Divider'
import Images from '../../app/Images'
import Image  from '../../view/Image'
import EmptyView from '../../view/EmptyView'

@inject('findStore')
@observer
export default class FindScreen extends BaseScreen {
    /*支持手势返回，如果有页面不需要手势返回，则重写该方法，禁止掉手势 gesturesEnabled: false */
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
     };

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.setTitle('发现')
        this.setGoBackVisible(false)
        this.state = {
            keyWord :''
        };
      }

    renderView() {
        return (
            <Column style={styles.container}>
                <Row verticalCenter style={styles.headStyle}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder={'请输入商品或美食名称'}
                        placeholderTextColor={Color.gray4}
                        selectionColor={Color.theme}
                        numberOfLines={1}
                        autoFocus={false}
                        underlineColorAndroid= 'transparent'
                        value={this.state.keyWord}
                        onChangeText={this._onInputChange}
                     />
                    <Button title={'提交'}
                            titleStyle={{color:Color.white}}
                            style={{backgroundColor: Color.theme,
                            marginLeft: px2dp(10)}}
                            onPress={this._click.bind(this)}
                    />
                </Row>

                <VisibleView visible={this.props.findStore.showNoResult}>
                    <Row horizontalCenter verticalCenter style={{height:px2dp(60),marginTop:px2dp(10),backgroundColor:Color.white}}>
                        <Text text={'很抱歉！无搜索结果'}/>
                    </Row>
                </VisibleView>


                <Column style={styles.container}>
                    <FlatList
                        style={[styles.container]}
                        data={this.props.findStore.getShopList}
                        bounces={false}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => index + ''}
                        ItemSeparatorComponent={() => <Divider/>}
                        ListEmptyComponent={() =><EmptyView retryClick={()=>{
                            this._click()
                        }}/>}
                    />
                    <VisibleView visible={this.props.findStore.showHistory}>
                        <FlatList
                            style={[styles.contain, styles.historyStyle]}
                            data={this.props.findStore.getList}
                            bounces={false}
                            renderItem={({item, index}) =>
                                <Row verticalCenter style={styles.hisItemStyle}>
                                    <Text text={item}/>
                                    <TouchableOpacity style={{padding: px2dp(10)}} onPress={()=>this._deleteHisItem(item)}>
                                        <Image source={Images.Common.close} style={{...wh(50)}}/>
                                    </TouchableOpacity>
                                </Row>
                            }
                             keyExtractor={(item, index) => index + ''}
                             ListHeaderComponent={this._renderHisHeader }
                             ListFooterComponent={this._renderHisFooter}
                            ItemSeparatorComponent={() => <Divider/>}/>
                    </VisibleView>
                </Column>
            </Column>
        );
    }

    //输入搜索内容
    _onInputChange= (text) =>{
        this.setState({keyWord: text});
         if (text !== ''){
            this.props.findStore.setSearchState(false)
        }
    }
    //删除历史搜索结果
    _deleteHisItem=(item) =>{
        this.props.findStore.deleteItem(item)
    }

    //确认搜索
    _click() {
         Keyboard.dismiss()

        if (this.state.keyword !== ''){
            this.props.findStore.fetchData(Geohash,this.state.keyWord,)
        }else {
            Toast.message("请输入内容")
        }
    }
    //搜索结果
    _renderItem = ({item, index}) => {
        return (
            <ShopListItem data={item} onClick={() => this.props.navigation.navigate('ShopInfo', {id: item.id})}/>
        );
    }

    //搜索历史纪录列表的头视图
    _renderHisHeader = () => {
        return(
            <View>
                <Text text={'搜索历史'} style={{margin: px2dp(20)}}/>
                <Divider height={1}/>
            </View>
        )
    };
      //搜索历史纪录列表的尾视图
    _renderHisFooter = () => {
        return(
            <Column>
                <Divider height={1}/>
                <Button
                    type = {'link'}
                    title={'清空历史记录'}
                    style={styles.clearBtnStyle}
                    titleStyle={{color: Color.theme}}
                    onPress={this._clear}/>
            </Column>
        )
    };

    _clear=() => {
        this.props.findStore.clear()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headStyle:{
        padding:px2dp(15),
        backgroundColor:Color.white
    },
    inputStyle:{
        flex:1,
        height:px2dp(70),
        fontSize:px2sp(28),
        color:Color.gray4,
        backgroundColor:Color.gray,
        borderRadius:px2dp(3),
        padding:px2dp(5)
    },
    historyStyle:{
        marginTop: px2dp(10),
        position: 'absolute',
        backgroundColor:Color.white,
        elevation: 5,
        shadowOffset: {width: 10, height: 10},
        shadowColor: Color.gray2,
        shadowOpacity: 1,
        shadowRadius: 5
    },
    hisItemStyle:{
        width: screenW,
        height: px2dp(70),
        justifyContent: 'space-between',
        padding: px2dp(15),
        marginVertical: px2dp(1),
        backgroundColor: Color.white
    },
    clearBtnStyle:{
        flex: 1,
        height: px2dp(60),
    }
});
