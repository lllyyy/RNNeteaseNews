import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    TextInput,
    StatusBar
} from 'react-native';

import cityContent from '../../api/city.json'
import { screenH, screenW } from "../../utils/ScreenUtil";
import BaseScreen from "../BaseScreen";

const CITYHEIGHT = 30;
const TITLEHEIGHT = 40;
const DESCHEIGHT = 25;
const CITYHEIGHT2 = 30;

export default class LocationCity extends BaseScreen {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            sections : [],
            cityArray : [],
            cityBase : [],
            showFlag : true
        }
        // 特殊栏目的数量 （定位，热门，常用）
        descNumber = 0;
        // 和上面对应的item 的数量。三个的总数
        city2number = 0;
        // 每个栏目前面城市的数量
        titleCityArray = [ 0 ],
            // 右侧导航中 特殊栏目的数量。
            this.letterDescNumber = 0;

        this._moveAction = this._moveAction.bind(this);
        this._getItemLayout = this._getItemLayout.bind(this);

    }

    componentWillMount() {
        this._gestureHandlers = {
            onStartShouldSetResponder : (evt) => true,
            onMoveShouldSetResponder : (evt) => true,
            onResponderStart : (evt) => {
                console.log(this)
            }
        }
    }

    componentDidMount() {
        //初始化数据
        let cityContent2 = cityContent.data;
        let letterList = [];
        let cityArray = [];
        let sections = [];
        this.city2number = 0;
        this.descNumber = 0;
        this.titleCityArray = [ 0 ];

        // 设置不同的type 在 FlatList 中的 renderItem 中用于区分，实现不同的样式
        sections[ sections.length ] = {
            name : '定位城市',
            type : 'desc',
        };

        sections[ sections.length ] = {
            name : '珠海',
            type : 'location',
        };
        sections[ sections.length ] = {
            name : '常用城市',
            type : 'desc',
        };

        sections[ sections.length ] = {
            name : '珠海,广州',
            type : 'city2',
        };

        sections[ sections.length ] = {
            name : '热门城市',
            type : 'desc',
        };

        sections[ sections.length ] = {
            name : '珠海,广州,杭州',
            type : 'city2',
        };
        sections[ sections.length ] = {
            name : '北京,上海,西安',
            type : 'city2',
        };
        // sections[sections.length] = {
        //     name:'广州,杭州,北京',
        //     type:'city2',
        // };
        // sections[sections.length] = {
        //     name:'上海,西安',
        //     type:'city2',
        // };
        letterList.splice(0, 0, '定位', '常用', '热门');
        this.letterDescNumber = letterList.length;
        sections.forEach(element => {
            if (element.type != 'desc') {
                this.city2number++;
            } else {
                this.descNumber++;
            }
        });
        let i = 0;
        cityContent2.forEach(element => {
            sections[ sections.length ] = {
                name : element.title,
                type : 'letter',
            };
            element.city.forEach(element => {
                if (element.city_child == element.city_parent) {
                    sections[ sections.length ] = {
                        name : element.city_child,
                        type : 'city',
                    }
                    i++;
                }
            });
            this.titleCityArray[ this.titleCityArray.length ] = i;
            letterList[ letterList.length ] = element.title;
        });

        // 查找时使用的数据
        let key = 0;
        cityArray = [];
        cityContent2.forEach(element => {
            element.city.forEach(element => {
                if (element.city_child == element.city_parent) {
                    cityArray[ cityArray.length ] = {
                        'name' : element.city_child,
                        'name_en' : element.city_child_en,
                        'key' : key++,
                    }
                }
            });
        });
        this.setState({
            sections : sections,
            listData : letterList,
            cityBase : cityArray,
            searchArray : cityArray,
        });
    }

    6217002680002734466

    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    width : screenW,
                    height : 93 - screenH.statusBarHeight * 2,
                    flexDirection : 'row',
                    alignItems : 'center',
                    justifyContent : 'space-between'
                }}>

                    <TextInput
                        style={{ width : 200, height : 50 }}
                        onChangeText={(text) => this.onChangeText(text)}
                        underlineColorAndroid='transparent'
                        placeholder={'输入城市名字或首字母查询'}
                    />
                    <Image style={{ marginRight : 20, width : 30, height : 30, backgroundColor : 'red' }}/>
                </View>
                {this.state.showFlag == true ? (
                    <View>
                        <FlatList
                            ref={'FlatList'}
                            style={{ width : '100%' }}
                            data={this.state.sections}
                            contentContainerStyle={styles.list}
                            showsVerticalScrollIndicator={false}
                            renderItem={this._renderItem}
                            // initialNumToRender = {50}
                            keyExtractor={(item, index) => index + item}
                            getItemLayout={(data, index) => this._getItemLayout(data, index)}
                        />

                        <View
                            style={{
                                position : 'absolute',
                                height : screenH - 93 + StatusBar.currentHeight,
                                alignItems : 'center',
                                justifyContent : 'center',
                                right : 0,
                            }}
                        >
                            <View style={{ height : 25 * 20 }}>
                                <FlatList
                                    initialNumToRender={25}
                                    data={this.state.listData}
                                    renderItem={this._flatRenderItem}
                                    keyExtractor={(item, index) => {
                                        return item + index
                                    }}
                                />

                            </View>
                        </View>
                    </View>
                ) : (
                    <FlatList
                        style={{ width : screenW }}
                        data={this.state.searchArray}
                        renderItem={this._searchRenderItem}
                        keyExtractor={(item, index) => {
                            return (index.toString());
                        }}
                    />
                )}

            </View>
        );
    }

    _flatRenderItem = (info) => {
        return (
            <TouchableOpacity onPress={() => this._moveAction(info)} style={{ width : CITYHEIGHT, alignItems : 'center', height : 20 }}>
                <Text>{info.item}</Text>
            </TouchableOpacity>
        )
    }

    _moveAction(info) {
        let item = info.item.length == 1 ? info.item : info.item + '城市';
        for (let i = 0;
            i < this.state.sections.length;
            i++) {
            if (this.state.sections[ i ].name == item) {
                this.refs.FlatList.scrollToIndex({ animated : false, index : i });
                break;
            }
        }
    }

    _renderItem = (info) => {
        var txt = '  ' + info.item.name;

        console.log(info)
        console.log(info.item.type)

        switch (info.item.type) {
            case 'city': {
                return (
                    <Text
                        style={{
                            height : CITYHEIGHT,
                            width : screenW - 70,
                            textAlignVertical : 'center',

                            color : '#5C5C5C',
                            fontSize : 15,
                            borderBottomColor : 'rgb(161,161,161)',
                            borderBottomWidth : 1,
                        }}
                    >
                        {txt}
                    </Text>
                )
            }
            case 'letter': { //头部字母
                return (
                    <Text
                        style={{
                            height : TITLEHEIGHT,
                            width : screenW - 70,
                            textAlignVertical : 'center',
                            // backgroundColor: "#0f0",
                            color : '#5C5C5C',
                            fontSize : 15,
                            borderBottomColor : 'rgb(161,161,161)',
                            borderBottomWidth : 1,
                        }}
                    >
                        {txt}
                    </Text>
                )
            }
            case 'desc': {
                return (
                    <Text
                        style={{
                            height : DESCHEIGHT,
                            width : screenW - 50,
                            textAlignVertical : 'center',

                            color : '#5C5C5C',
                            fontSize : 15,
                        }}
                    >
                        {txt}
                    </Text>
                )
            }
            case 'city2': {
                txt = txt.split(',');
                return (
                    <View style={{
                        flexDirection : 'row',
                    }}>
                        {
                            txt.map((element, index) => {
                                return <Text
                                    key={'info' + info.index + 'index' + index}
                                    style={{
                                        textAlignVertical : 'center',
                                        textAlign : 'center',
                                        width : 94.5,
                                        height : CITYHEIGHT2,
                                        borderColor : 'rgb(220,220,220)',
                                        borderWidth : 1,
                                        fontSize : 15,
                                        marginRight : 14,
                                    }}>
                                    {element}
                                </Text>
                            })
                        }
                    </View>
                )
            }
            case 'location': {
                return (
                    <Text
                        style={{
                            textAlignVertical : 'center',
                            textAlign : 'center',
                            width : 94.5,
                            height : CITYHEIGHT2,
                            backgroundColor : "#0f0",
                            borderColor : 'rgb(220,220,220)',
                            borderWidth : 1,
                            fontSize : 15,
                            marginRight : 14,
                            //marginTop:4
                        }}>
                        {txt}
                    </Text>
                )
            }
        }
    }

    _getItemLayout(data, index) {
        if (data[ index ].type == 'letter' || data[ index ].type == 'city') {
            let i;
            for (i = index;
                i > 0;
                i--) {
                if (data[ i ].type == 'letter') {
                    break;
                }
            }
            let offset = this.state.listData.indexOf(data[ i ][ 'name' ]) - this.letterDescNumber;
            return {
                index,
                offset : CITYHEIGHT * (this.titleCityArray[ offset ] + index - i) + (offset) * (TITLEHEIGHT)
                + this.city2number * CITYHEIGHT2 + this.descNumber * (DESCHEIGHT),
                length : i == index ? TITLEHEIGHT : CITYHEIGHT,
            }
        } else {
            let i;
            for (i = index;
                i > 0;
                i--) {
                if (data[ i ].type == 'desc') {
                    break;
                }
            }
            let offset = this.state.listData.indexOf(data[ i ][ 'name' ].slice(0, 2));
            return {
                index,
                offset : CITYHEIGHT2 * index + offset * (DESCHEIGHT - CITYHEIGHT2),
                length : i == index ? DESCHEIGHT : CITYHEIGHT2,
            }
        }

    }

    //查找
    onChangeText(text) {
        let Chinese = new RegExp('^[\u4e00-\u9fa5]+$');
        let English = new RegExp('^[a-zA-Z]+$');
        if (Chinese.test(text)) {
            let temp = [];
            this.state.cityBase.forEach(city => {
                if (city.name.indexOf(text) == 0) {
                    temp[ temp.length ] = city;
                }
            });
            this.setState({
                searchArray : temp,
                showFlag : false,
            })
        } else if (English.test(text)) {
            text = text.toLowerCase();
            let temp = [];
            this.state.cityBase.forEach(city => {
                if (city.name_en.indexOf(text) == 0) {
                    temp[ temp.length ] = city;
                }
            });
            this.setState({
                searchArray : temp,
                showFlag : false,
            })
        } else if (text.length == 0) {
            this.setState({
                searchArray : this.state.cityBase,
                showFlag : true
            });
        } else {
            this.setState({
                searchArray : [],
                showFlag : false
            });
        }
    }

    _searchRenderItem = (info) => {
        return (
            <View style={{ flexDirection : 'row', width : screenW, height : CITYHEIGHT, alignItems : 'center' }}>
                <Text>{info.item.name}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        backgroundColor : '#FFFFFF',
        paddingLeft : 25
    },
});
