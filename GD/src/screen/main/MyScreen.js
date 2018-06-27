import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import BaseScreen from "../BaseScreen";
import Images from "../../app/Images";
import {borderWidthLR, paddingLR, paddingTB, px2dp, wh, screenW, marginTB} from "../../utils/ScreenUtil";
import Image from '../../view/Image'
import Row from "../../view/Row";
import Color from "../../app/Color";
import Column from "../../view/Column";
import Text from '../../view/TextView'
import Divider from '../../view/Divider'
import {toDecimal2} from  '../../store/ShoppingCarStore'
import AuthApi from "../../api/AuthApi";
import ShareApi from "../../share/ShareApi";
import SharePlatform from '../../share/SharePlatform'
import DeviceStorage from "../../utils/DeviceStorage";

export default class MyScreen extends BaseScreen {

    /*支持手势返回，如果有页面不需要手势返回，则重写该方法，禁止掉手势 gesturesEnabled: false */
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.setTitle('我的');
        this.state = {
            avatar: '', //头像
            username: '15527832500', //用户名
            balance: 0, //余额
            gift_amount: 0, //优惠
            point: 0, //积分
        };
    }


    componentDidMount() {
        if (isLogin) this._fetchUserInfo()


    }
    _fetchUserInfo(){
        AuthApi.fetchUserInfo(UserInfo.user_id).then((res) => {
            UserInfo = res;
            DeviceStorage.save("User",UserInfo);
        })
    }

    //导航左边按钮
    renderGoBack(){
        return (
        <Image source={Images.My.notice} style={{...wh(40),marginLeft:px2dp(20)}}/>
        )
    }
    //导航右边按钮
    renderMenu() {
        return (
            <Image source={Images.My.setting} style={{...wh(40), marginRight: px2dp(20)}}/>
        )
    };
    //主体
    renderView() {
        return (
            <ScrollView style={styles.container}>
                <TouchableOpacity onPress={this._userInfoClick.bind(this)} activeOpacity={0.8}>
                    <Row verticalCenter style={styles.userInfoStyle}>
                        {/*用户信息*/}
                        <Row>
                            <Image source={isLogin ? UserInfo.avatar :Images.My.head} style={styles.headStyle}/>
                            <Column style={{justifyContent:'space-between'}}>
                                <Text largeSize white text={isLogin ? this.state.username : '登录/注册'} style={{fontWeight:'600',marginBottom:px2dp(10)}}/>
                                <Row verticalCenter>
                                    <Image source={Images.My.phone} style={{...wh(25, 30)}}/>
                                    <Text mediumSize white text={'暂无绑定手机号'}/>
                                </Row>
                            </Column>
                        </Row>
                        {/*前往登录*/}
                        <Image source={Images.Common.arrowRight} style={{...wh(30)}}/>
                    </Row>
                </TouchableOpacity>
                {/*三块数值*/}
                <Row verticalCenter style={{backgroundColor:Color.white,justifyContent:'space-between'}}>
                    {this._renderBalanceItem(isLogin ? toDecimal2(this.state.balance) : '0.00', Color.theme, '元', '我的余额')}
                    {this._renderBalanceItem(isLogin ? this.state.gift_amount : '0', Color.pink, '个', '我的优惠券')}
                    {this._renderBalanceItem(isLogin ? this.state.point : '0', Color.reseda, '分', '我的积分')}
                </Row>
                <Column style={{...marginTB(20),backgroundColor:Color.white}}>
                    {this._renderItem(Images.My.order, '我的订单')}
                    <Divider style={styles.dividerStyle}/>
                    {this._renderItem(Images.My.point, '积分商城')}
                    <Divider style={styles.dividerStyle}/>
                    {this._renderItem(Images.My.vip, '饿了么会员卡')}
                </Column>
                <Column style={{marginBottom: px2dp(20), backgroundColor: Color.white}}>
                    {this._renderItem(Images.My.service, '服务中心')}
                    {this._renderItem(Images.Main.homeTabClick, '下载饿了么APP')}
                </Column>
            </ScrollView>
        );
    }


    //三块数值
    _renderBalanceItem =(value , color,unit,label) => {
        let style = null;
        if (label === '我的优惠券') {
            style = styles.balanceLineStyle
        }
        return(
            <TouchableOpacity onPress={() => this._onBalanceItemClick(label)}>
            <Column style={[styles.balanceStyle,style]}>
                <Row style={{alignItems:'flex-end'}}>
                     <Text theme text={value} style={{fontSize:px2dp(50),color:color}}/>
                    <Text microSize text={unit} style={{marginBottom:px2dp(10)}}/>
                </Row>
                <Text text={label}/>
            </Column>
            </TouchableOpacity>
        )
    }

    /**
     * 分组列表
     * @private
     */
    _renderItem(img,label){
        return(
            <TouchableOpacity onPress={() => this._onItemClick(label)}>
                <Row verticalCenter style={styles.itemStyle}>
                <Row verticalCenter style={{justifyContent: 'space-between',...paddingTB(20), ...paddingLR(15)}}>
                    <Image source={img} style={{...wh(30),marginRight:px2dp(10)}}/>
                    <Text text={label}/>
                </Row>
                <Image source={Images.Common.arrowRight} style={{...wh(25),tintColor:Color.gray3}}/>
                </Row>
            </TouchableOpacity>
        )

    }
    //点击登录
    _userInfoClick(){

        if (isLogin) this.props.navigation.navigate('UserInfo',{callback:this._handleLogoutSuccess.bind(this)})
        else {
            this._toLogin()
        }
    }
    //跳转到登录
   _toLogin(){

       this.props.navigation.navigate('Login', {callback: (res) => {
               alert(res)
               this._handleLoginSuccess()
           }})
   }



    /*退出登录成功后回来刷新页面*/
    //登录之后查看个人信息  退出登录
    _handleLogoutSuccess() {
        this.setState({
            avatar: '',
            username: '',
            balance: 0,
            gift_amount: 0,
            point: 0,
        })
    }

    /*登录成功后回来刷新页面*/
    _handleLoginSuccess =() => {

        this.setState({
            avatar:UserInfo.avatar,
            username:UserInfo.username,
            balance:UserInfo.balance,
            gift_amount:UserInfo.gift_amount,
            point:UserInfo.point,
        })
    }


    //点击三块数值
    _onBalanceItemClick(label){
        if (!isLogin){
            this._toLogin();
            return;
        }

        if (label === '我的余额') {
            this.props.navigation.navigate('Balance')
        }else if (label === '我的优惠券'){
            this.props.navigation.navigate('Discount')
        }else {
            this.props.navigation.navigate('Point')
        }

    }

    //点击每个cell跳转
    _onItemClick(label){
        //分享
        if (label === '下载饿了么APP') {
            this._shareR();
            return;
        }
        if (!isLogin){
            this._toLogin();
            return;
        }
        if (label === '我的订单') {
            this.props.navigation.navigate('Order')
        } else if (label === '积分商城') {
            this.props.navigation.navigate('PointMall')
        } else if (label === '饿了么会员卡') {
            this.props.navigation.navigate('ElmVIP')
        } else if (label === '服务中心') {
            this.props.navigation.navigate('ServiceCenter')
        }
    }
    //分享
    _shareR() {
        ShareApi.share("AAA","BBBB","www.baidu.com","www.baidu.comAA",()=>{},()=>{})
     }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoStyle:{
        backgroundColor:Color.theme,
        ...paddingLR(20),
        ...paddingTB(25),
        justifyContent:'space-between'
    },
    headStyle: {
        ...wh(100),
        borderRadius: px2dp(50),
        marginRight: px2dp(10)
    },
    balanceLineStyle:{
        backgroundColor:Color.white,
       // ...borderWidthLR(1)
    },
    balanceStyle:{
        width: screenW / 3,
        justifyContent: 'center',
        alignItems: 'center',
        ...paddingTB(25)
    },
    dividerStyle: {
        marginLeft: px2dp(30)
    },
    itemStyle:{
        justifyContent:'space-between',
        ...paddingTB(15),
        ...paddingLR(25)
    }
});
