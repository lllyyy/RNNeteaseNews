/**
 * 首页
 */

import React from 'react'
import {View, Platform, StatusBar, TouchableWithoutFeedback, StyleSheet, SafeAreaView, FlatList,
    TouchableOpacity, ScrollView
} from "react-native";
import {isIphoneX, marginLR, marginTB, paddingTB, px2dp, screenW, wh} from "../../utils/ScreenUtil";
import Color from "../../app/Color";
import Row from "../../view/Row";
import Images from "../../app/Images";
import BaseScreen from "../BaseScreen";
import LocationApi from "../../api/LocationApi";
import Text from "../../view/TextView";
import Image from "../../view/Image";
import Column from "../../view/Column";
import {inject, observer} from "mobx-react";
import Divider from "../../view/Divider";
import ShopListItem from "../../view/ShopListItem";
import EmptyView from '../../view/EmptyView'
import Swiper from 'react-native-swiper';


let imgdata = ['https://oss.zuimeimami.com/test/mami_admin/Ad/20170913/2649.png','https://oss.zuimeimami.com/test/mami_admin/Ad/20170913/2649.png','https://oss.zuimeimami.com/test/mami_admin/Ad/20170913/2649.png'];


@inject("homeStore")
@observer
export default class HomeScreen extends BaseScreen {

    /*支持手势返回，如果有页面不需要手势返回，则重写该方法，禁止掉手势 gesturesEnabled: false */
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    };

    constructor(props) {
        super(props);
        this.setNavBarVisible(false);// 默认不显示导航栏底下的分割线

        this.latitude = null;
        this.longitude = null;
        this.state = {
            curSelectPage: 0,
            refreshing: false
        }
     }

    componentWillUnmount(){
        this.setState = ()=>{
            return null;
        };
    }

    componentDidMount() {
       this._fetchLatitude()
    }


    /**
     * 下拉属性
     */
    onRefresh = () => {
        //设置刷新状态为正在刷新
        this.startLoading({
            refreshing: true,
        });

        this._fetchLatitude();
    };

    _fetchLatitude(){

        LocationApi.fetchCityGuess().then((res) => {
            Geohash = res.latitude + ',' + res.longitude;
            this.props.homeStore.setLocation(res.name);
            this.latitude = res.latitude;
            this.longitude = res.longitude;

            LocationApi.fetchFoodTypes(res.geohash).then((res) => {

                let temp = [];
                const itemCount = 8;//一页8搞分类
                const pageCount = res.length / itemCount;//有多少页
                const last = res.length % 8;//余下的个数，不满一页8个的，如果=0则刚刚被整除

                for (let i = 0;i< pageCount;i++) {
                    //slice方法可从已有的数组中返回选定的元素。
                    temp.push(res.slice(i * itemCount,(i+1)*itemCount))//每页的个数添加到数组
                }

                if (last > 0) {
                    temp.push(res.slice(itemCount * pageCount,res.length))
                }
                this.props.homeStore.categoryAddAll(temp);

                temp = null
            });
            this._fetchShop(res.latitude,res.longitude);
        })
    }
    //更具经纬度查商品
    _fetchShop(latitude,longitude){
        LocationApi.fetchShopList(latitude,longitude,0).then((res) => {
            this.stopLoading({
                refreshing: false,
            });
            this.props.homeStore.shopAddAll(res)
        }).catch((error) => {
            this.requestFailure();
            console.log(error);
        });
    }
    /**2.手动滑动分页实现 */
    _onAnimationEnd(e) {
        //求出偏移量

        let offsetX = e.nativeEvent.contentOffset.x;

        //求出当前页数
        let pageIndex = Math.floor(offsetX / screenW);
        this.setState({curSelectPage: pageIndex})

    }

    _onCategoryItemClick(category){
        this.props.navigation.navigate('Category',{data:category,latitude:this.latitude,longitude:this.longitude})
    }

    placeholderOnRefresh() {
        this._fetchLatitude();
    }
    renderView() {
        return (
            <View style={{flex: 1}}>
                {this._renderNavBar()}

                <FlatList
                    data={this.props.homeStore.getShopList}
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                    renderItem={this._renderListItem}
                    keyExtractor={(item, index) => index + item.name}
                    ItemSeparatorComponent={() => <Divider/>}
                    ListHeaderComponent={this._renderHeader()}
                    ListEmptyComponent={() =><EmptyView retryClick={()=>{
                        this._fetchLatitude()
                    }}/>}

                />
            </View>
        )
    }

    _renderListItem = ({item, index}) => {
        return (
              <ShopListItem data={item}  onClick={() => this.props.navigation.navigate('ShopInfo', {id: item.id})}/>
        )
    }

    /**
     * 分类
     * @private
     */
    _renderHeader (){
        return (
            <Column style={{backgroundColor:Color.white}}>
                <Swiper autoplay ={true} //为true页面自动跳转
                        height = {screenW*0.333}
                        dotColor ="white"
                        activeDotColor = "#ed6d00" //当前选择的点的颜色
                        autoplayTimeout={1}//设置轮播间隔时间
                        paginationStyle  = {[{ position:'absolute',bottom:5,},{bottom:10}]}

                >
                    {
                        imgdata.map((item,i)=>{

                            return <Image source={Images.Common.shopBg} style={{width:screenW,height:screenW*0.333,marginLeft:0, }} key={i}/>
                        })
                    }
                </Swiper>

                <ScrollView
                    contentContainerStyle={{width:screenW *this.props.homeStore.getCategoryList.length}}
                    bounces={false}
                    pagingEnabled={true}
                    horizontal={true}
                    //滑动完一贞

                    onMomentumScrollEnd={(e)=>{this._onAnimationEnd(e)}}
                    showsHorizontalScrollIndicator={false} >
                    {this.props.homeStore.getCategoryList.map((data,index) => this._renderPage(data, index))}
                </ScrollView>
                <Row horizontalCenter >
                    {this._renderAllIndicator()}
                </Row>
                <Divider style={{height:px2dp(20),backgroundColor:Color.background}}/>
                <Text text={'附近商家'} style={{margin:px2dp(20)}}/>
            </Column>
        )
    }

    /**3.页面指针实现 */
    _renderAllIndicator(){

        let indicatorArr = [];
        let style;
        let length = this.props.homeStore.getCategoryList.length;
        for (let i =0 ;i<length;i++){
            style = (i===this.state.curSelectPage) ? {backgroundColor:Color.theme}:{backgroundColor:Color.gray3};
            indicatorArr.push(<View key={i} style={[styles.bannerDotStyle,style]}/>)
        }
         return indicatorArr;
    }


    _renderPage(data, index) {

        return (
            <View key={index} style={styles.typesView}>
                {data.map((item,i) =>
                    <TouchableOpacity
                        key = {i}
                        onPress={() => this._onCategoryItemClick(item)}
                        style={{
                            width:screenW / 4,
                            justifyContent: 'center',
                            alignItems: 'center',
                            ...paddingTB(20)
                        }}>
                        <Image source={Image.cdn + item.image_url} style={{...wh(80)}} needBaseUrl={false}/>
                        <Text mediumSize text={item.title}/>
                    </TouchableOpacity>
                    )}
            </View>
        )
    }


    //导航栏
    _renderNavBar() {
        const top = Platform.OS === 'ios' ? 10 : StatusBar.currentHeight;
        const navHeight = isIphoneX() || Platform.OS === 'ios' ? 210 : 240;
        return (
            <SafeAreaView style={{backgroundColor: Color.theme}}>
                <View style={{height: px2dp(navHeight), backgroundColor: Color.theme, paddingTop: px2dp(30) + top}}>
                    <Row verticalCenter style={{justifyContent: 'space-between', ...marginLR(20)}}>
                        <Row verticalCenter>
                            <Image source={Images.Main.location} style={{...wh(30)}}/>
                            <Text white text={this.props.homeStore.getLocation}/>
                            <Image source={Images.Main.arrow} style={{...wh(18, 25)}}/>
                        </Row>
                        {/*天气*/}
                        <Row verticalCenter>
                            <View style={{marginRight: 5}}>
                                <Text microSize white style={{textAlign: "center"}} text={'3°'}/>
                                <Text microSize white style={{textAlign: "center"}} text={'多云'}/>
                            </View>
                            <Image source={Images.Main.weather} style={{...wh(25)}}/>
                        </Row>
                    </Row>
                    {/*搜索*/}
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Find')}>
                        <View style={[styles.searchBtn, {backgroundColor: "#fff"}]}>
                            <Image source={Images.Main.search} style={{...wh(30)}}/>
                            <Text gray style={{marginLeft: 5}} text={'输入商家，商品名称'}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </SafeAreaView>
        )
    }

    _renderItem = ({item, index}) => {
        alert(item)
        return (
            <ShopListItem data={item} onClick={() => this.props.navigation.navigate('ShopInfo', {id: item.id})}/>
        );
    }
 }


const styles = StyleSheet.create({
    searchBtn: {
        margin: px2dp(20),
        borderRadius: px2dp(4),
        height: px2dp(60),
        flexDirection: "row",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },
    bannerDotStyle: {
        ...wh(16),
        borderRadius:px2dp(8),
        ...marginTB(0,15),
        ...marginLR(6)
    },
    typesView: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",

    },
});

