import CardStackStyleInterpolator from "react-navigation/src/views/CardStack/CardStackStyleInterpolator";
import {StackNavigator} from "react-navigation";
import {Tabs} from "./TabNavigator";
import LoginScreen from "../screen/member/auth/LoginScreen";
import ShopInfoScreen from "../screen/shop/ShopInfoScreen";
import SplashScreen from "../screen/SplashScreen";
import CategoryScreen from "../screen/CategoryScreen";
import UserInfoScreen from "../screen/member/auth/UserInfoScreen";
import ModifyUserNameScreen from "../screen/member/auth/ModifyUserNameScreen";
import AddressScreen from "../screen/member/adders/AddressScreen";
import AddAddressScreen from "../screen/member/adders/AddAddressScreen";
import SearchAddressScreen from "../screen/member/adders/SearchAddressScreen";
import ModifyPwdScreen from "../screen/member/auth/ModifyPwdScreen";
import BalanceScreen from "../screen/member/BalanceScreen";
import PointScreen from "../screen/member/PointScreen";
import ElmVIPScreen from "../screen/member/ElmVIPScreen";
import PayOnLineScreen from "../screen/member/PayOnLineScreen";
import ExchangeVIPScreen from "../screen/member/ExchangeVIPScreen";
import BuyRecordScreen from "../screen/member/BuyRecordScreen";
import ServiceCenterScreen from "../screen/member/ServiceCenterScreen";
import DiscountScreen from "../screen/member/discount/DiscountScreen";
// import BalanceQuestionScreen from "../screen/member/BalanceQuestionScreen";
// import PointQuestionScreen from "../screen/member/PointQuestionScreen";
import PointMallScreen from "../screen/member/PointMallScreen";
import OrderConfirmScreen from "../screen/shop/OrderConfirmScreen";
// import VIPDesScreen from "../screen/member/VIPDesScreen";
import ChangeRedPacketScreen from "../screen/member/discount/ChangeRedPacketScreen";
import PhoneMoblie from '../screen/member/auth/PhoneMoblieScreen';
import GuidePage from '../view/GuidePage';
import FlotScreen from "../screen/main/FlotScreen";
import BrandPage from "../screen/main/BrandPage";
import LocationCity from "../screen/main/LocationCity";
import NotifPush from "../screen/main/NotifPush";


const initial = __DEV__
    ? "Splash" // 调试用
    : "Splash"; // 正式打包初始路径

/*需要注册的页面*/
const nav = {
    Home: {screen: Tabs},
    GuidePage: {screen: GuidePage},
    Login: {screen: LoginScreen},
    ShopInfo: {screen: ShopInfoScreen},
    Splash: {screen: SplashScreen},
    Category: {screen: CategoryScreen},
    UserInfo: {screen: UserInfoScreen},
    PhoneMoblie:{screen:PhoneMoblie},
    ModifyUserName: {screen: ModifyUserNameScreen},
    Address: {screen: AddressScreen},
    AddAddress: {screen: AddAddressScreen},
    SearchAddress: {screen: SearchAddressScreen},
    ModifyPwd: {screen: ModifyPwdScreen},
    Balance: {screen: BalanceScreen},
    Point: {screen: PointScreen},
    ElmVIP: {screen: ElmVIPScreen},
    PayOnLine: {screen: PayOnLineScreen},
    ExchangeVIP: {screen: ExchangeVIPScreen},
    BuyRecord: {screen: BuyRecordScreen},
    ServiceCenter: {screen: ServiceCenterScreen},
    Discount: {screen: DiscountScreen},
    // BalanceQuestion: {screen: BalanceQuestionScreen},
    // PointQuestion: {screen: PointQuestionScreen},
    PointMall: {screen: PointMallScreen},
    OrderConfirm: {screen: OrderConfirmScreen},
    // VIPDes: {screen: VIPDesScreen},
    ChangeRedPacket: {screen: ChangeRedPacketScreen},
    Flost:{screen:FlotScreen},
    BrandPage:{screen:BrandPage},
    LocationCity:{screen:LocationCity},
    NotifPush:{screen:NotifPush}
};

// 注册导航
export const Navigator = StackNavigator(
    nav,
    {
        initialRouteName: initial, // 默认显示界面
        mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
        headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
        transitionConfig: () => ({
            screenInterpolator: CardStackStyleInterpolator.forHorizontal,//让安卓实现push动画(右进右出)
        })
    }
);
