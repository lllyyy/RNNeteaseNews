
/**
 * 商品详情页面
 */
import React from 'react';
import {
    StyleSheet,
    Animated,
    Platform,
    View,
    findNodeHandle,
    ImageBackground,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import Color from "../../app/Color";
import BaseScreen from "../BaseScreen";
import LocationApi from "../../api/LocationApi";

import Column from "../../view/Column";
import Images from "../../app/Images";
import {isIphoneX, marginTB, paddingLR, paddingTB, px2dp, screenW,wh} from "../../utils/ScreenUtil";
import Image from '../../view/Image'
import Text from  '../../view/TextView'
import Row from "../../view/Row";
import ScrollableTabView from "react-native-scrollable-tab-view";
import TabBar from "../../view/TabBar";
import ShopInfoList from "./ShopInfoList";
import ShopInfoEvaluation from './ShopInfoEvaluation'
import {BlurView} from "react-native-blur";
import ShopAip from "../../api/ShopApi";

export default class ShopInfoScreen extends BaseScreen {

    // 构造
    constructor(props) {
        super(props);
        this.setNavBarVisible(false);
        // 初始状态
        this.state = {
            headOpacity: 1,
            bgY: 0,
            bgScale: 1,
            //店铺信息
            shopImg: '',
            shopName: '',
            shopPromotion: '',
            viewRef: 0
        };
    }

    //获取上个页面的传过来商品id
    _shopID(){
        return this.props.navigation.state.params.id
    }




    componentDidMount() {
        LocationApi.fetchCityGuess().then((res) => {
            ShopAip.fetchShopDetails(this._shopID(),res.latitude,res.longitude).then((res) =>{
                this.setState({
                    shopImg:res.image_path,
                    shopName:res.name,
                    shopPromotion:res.promotion_info
                })
            });
        })
    }
    //背景图片
    imageLoaded(){
        this.setState({
            viewRef:findNodeHandle(this.refs.backgroundImage)
        });
    }

    renderView() {
        let props = Platform.OS === 'ios' ? {
            blurType:'light',
            blurAmount:25
        }:{
            viewRef:this.state.viewRef,
            downsampleFactor:10,
            overlayColor:'rgb(255,255,255,.1)'
        };
        return (
           <Column style={{flex:1}}>
               {/*模糊存*/}
               <Animated.View style={{
                   transform:[{translateY:this.state.bgY},{scale:this.state.bgScale}]
               }}>
                <ImageBackground
                    source={Images.Common.shopBg}
                    style={styles.bg}
                    ref={'backgroundImage'}
                    onLoadEnd={this.imageLoaded.bind(this)}
                />
                <BlurView {...props} style={styles.blur}/>
               </Animated.View>

                 {/*状态栏*/}
                 <View style={styles.head}>
                    <TouchableOpacity style={{width:px2dp(70)}} onPress={()=> this.props.navigation.goBack()}>
                        <Image source={Images.Common.goBack} style={{...wh(20,30),margin:px2dp(25)}}/>
                    </TouchableOpacity>
                     {/*模糊层上的内容*/}
                     <Animated.View style={{flexDirection:'row',paddingHorizontal:16,opacity:this.state.headOpacity}}>
                         <Image source={this.state.shopImg} style={styles.logo}/>
                         <Column style={{marginLeft:14,flex:1}}>
                             <Column>
                                 <Text white text={this.state.shopName}/>
                                 <Row verticalCenter>
                                     <View style={{...paddingTB(2),...paddingLR(4),...marginTB(4),backgroundColor: Color.theme}}>
                                        <Text white microSize text={'蜂鸟专送'}/>
                                     </View>
                                     <Text white microSize text={'30分钟送达'}/>
                                 </Row>
                             </Column>
                             <Text white microSize numberOfLines={1} text={this.state.shopPromotion}/>
                         </Column>
                     </Animated.View>
                     {/*活动内容*/}
                     {this._renderActivitiesItem()}
                 </View>
               {/*主要内容*/}
               <ScrollableTabView renderTabBar={()=><TabBar/>}>
                   <ShopInfoList shopID={this._shopID()} tabLabel="商品" navigation={this.props.navigation}/>
                   <ShopInfoEvaluation shopID={this._shopID()} tabLabel="评价"/>
               </ScrollableTabView>
           </Column>
        );
    }

    //活动内容
    _renderActivitiesItem(){
        return(
            <Column style={{margin:px2dp(30)}}>
                <Row verticalCenter>
                   <View style={{padding:px2dp(2),marginRight:px2dp(5),backgroundColor:'#f07373'}}>
                    <Text white microSize text={'减'}/>
                   </View>
                   <Text white microSize text={'满20减2，满30减3，满40减4（不与美食获得同享）'}/>
                </Row>
                <Row verticalCenter style={{marginTop:px2dp(20)}}>
                    <View style={{padding:px2dp(2),marginRight:px2dp(5),backgroundColor:'#f07373'}}>
                        <Text white microSize text={'特'}/>
                    </View>
                      <Text white microSize text={'双人餐特惠'}/>
                </Row>
            </Column>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Color.red
    },
    bg:{
        width:screenW,
        height:screenW / 2,
        resizeMode:"stretch"
    },
    blur:{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        width: screenW,
        height: screenW / 2,
    },
    head:{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom:0,
        paddingTop: Platform.OS === 'ios' ? isIphoneX() ? 30:20 : StatusBar.currentHeight,
       // backgroundColor:"rgb(0,0,0,1)",
    },
    logo:{
        ...wh(100),
        resizeMode: "cover"
    }
});
