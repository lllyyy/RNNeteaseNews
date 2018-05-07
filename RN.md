


 Image

 const image = require('../../assets/images/logo.png');//加载本地图


  <Image
       resizeMode='contain'//三个取值分别是: contain, cover和stretch.默认值是cover.
       style={styles.logo}
       source={require('../../assets/images/logo.png')}
     />



Linking：调用系统的电话、短信、邮件、浏览器等功能
三方组件：react-native-communications
地址：https://github.com/anarchicknight/react-native-communications




// 重置登录之后跳转
start() {
          const resetAction = NavigationActions.reset({
              index: 0,
              actions: [

                  NavigationActions.navigate({routeName: 'Tab'}),

              ]
          })
           this.props.navigation.dispatch(resetAction)
       }

//跳转穿参数  返回回调传值      获取传值的方法：navigation.state.params.title,//获取上个页面转来的值     //this.props.navigation.state.params.xxx
 this.props.navigation.navigate('MsgPopPage',{
             title:item.title,
             callback: (data)=>{
                 console.log(data); // 打印值为：'回调参数'
             }
         })




//组件穿参数
export default MenuItem = ({
  source,
  title,
  description,
  price,
}) => (
  <View>
    <Image
      resizeMode='contain'
      source={source}
      style={styles.image}
    />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
    <Text style={styles.price}>{price}</Text>
  </View>
)
/////组件调用
<MenuItem
            title='Guacamole'
            price='$6'
            description='Prepared at tableside'
            source={require('../../../assets/images/guacamole.jpg')}
          />

///

根据 backgroundUrl  判断显示不同的UI
{this.state.backgroundUrl?(
                   <TouchableOpacity activeOpacity={0.5} onPress={this.imageup.bind(this)}>
                       <Image
                           source={{uri:this.state.backgroundUrl}}
                           style={styles.avatar}

                       />
                   </TouchableOpacity>
               ):null}


//子组件点击事件回调到主页面
//子页面点击
  itemView(title){
         if(this.props.onPress){
             this.props.onPress(title);
         }
     }
//主页调用
itemPush(title){
       alert(title)
    }
<DetailCell image={data.image} title={data.title} subtitle={data.subtitle} key={data.title}
                                           onPress={this.itemPush}/>



//数据存储
import {AsyncStorage} from 'react-native';
class DB {

    async save(key, value) {
        let result = value;
        if (value && typeof value === 'object') {
            result = JSON.stringify(value);
        }
        return await AsyncStorage.setItem(key, result);
    }

    async get(key) {
        const value = await AsyncStorage.getItem(key);
        let result;
        try {
            result = JSON.parse(value);
        } catch (e) {
            console.warn(e);
            result = value;
        } finally {
            return result;
        }
    }
    /**
     * [multiGet description]
     *        multiGet(['k1', 'k2'], cb) -> cb([['k1', 'val1'], ['k2', 'val2']])
     * @param  {[type]} keys [description]
     * @return {[type]}      [description]
     */
    async multiGet(keys) {
        const values = await AsyncStorage.multiGet(keys);
        const result = {};
        values.forEach((value) => {
            let newValue;
            try {
                newValue = JSON.parse(value[1]);
            } catch (e) {
                newValue = value[1];
            }
            result[value[0]] = newValue;
        });
        return result;
    }

    mergeItem(key, value) {
        let result = value;
        if (typeof value === 'object') {
            result = JSON.stringify(value);
        }
        return AsyncStorage.mergeItem(result);
    }

    remove(key) {
        return AsyncStorage.removeItem(key);
    }

    clear() {
        return AsyncStorage.clear();
    }

}
const instance = new DB();
export default instance;

//////////////////////////评价星星、////////////////////
import StarRating from 'react-native-star-rating'===========================

<View style={styles.swiper_children_rating_view}>
<StarRating
disabled={false}
rating={item.rating.average/2}
maxStars={5}
halfStarEnabled={true}
emptyStar={require('../../data/img/icon_unselect.png')}
halfStar={require('../../data/img/icon_half_select.png')}
fullStar={require('../../data/img/icon_selected.png')}
starStyle={{width: 20, height: 20}}
selectedStar={(rating)=>{}}/>
<Text style={styles.swiper_children_rating_text}>{item.rating.average.toFixed(1)}</Text>
</View>

1.调用方法
<View style={{ flexDirection: 'row',
alignItems: 'center',}}>
<StarRating
disabled={false}
rating={item.rating.average/2}
maxStars={5}
halfStarEnabled={true}
emptyStar={require('../../data/img/icon_unselect.png')}
halfStar={require('../../data/img/icon_half_select.png')}
fullStar={require('../../data/img/icon_selected.png')}
starStyle={{width: 14, height: 14}}
selectedStar={(rating)=>{}}/>
<Text style={{ fontSize: 12,
color: '#ffcc33',
fontWeight: '500',
marginLeft: 4,}} numberOfLines={1}>{item.rating.average.toFixed(1)}</Text>
</View>

///////////////////////公共类方法页面跳转和设置TabOptions//////////////////
import React from 'react'
import {
Image,
Dimensions
} from 'react-native'

const {width,height} = Dimensions.get('window');

const TabOptions = (labal,icon)=>{
return ({
tabBarLabel: labal,
tabBarIcon: ({tintColor}) => (
<Image
style={{
width: 26,
height: 26,
tintColor:tintColor
}}
source={icon}
/>
)
})
}

const jumpPager = (navigate,page,params) => {
if (params != null) {
navigate(page,{
data:params
})
} else {
navigate(page)
}
}
 export {TabOptions,jumpPager,width,height}

1调用方法
jumpPager(this.props.navigation.navigate,"Theme",this.onChangeTheme.bind(this))

///////////////////////////////////////组件刷新///////////////////////
_refreshControlView() {
return (
<RefreshControl
refreshing={this.state.refreshing}
onRefresh={() => this._refresh()}
colors={['#ff0000', '#00ff00', '#0000ff']}
/>
)
}

_refresh() {
this.setState({
refreshing: true
})
this.requestData()
}

调用方法
<ScrollView style={styles.scrollview_container}
showsVerticalScrollIndicator={false}
refreshControl={this._refreshControlView()}>
{this._getContentView()}
</ScrollView>

/////////////////////////////////////////////


























    第三方库
   "@remobile/react-native-toast": "^1.0.7", // 提示框
        "crypto-js": "^3.1.9-1", // JavaScript 加密库
        "moment": "^2.19.1", // JavaScript 日期处理类库
        "native-base": "^2.3.5", // 组件通用类，可以直接替代 react 组件
        "react": "16.0.0-beta.5",
        "react-native": "0.49.3",
        "react-native-audio": "^3.2.2", // 录音
        "react-native-blur": "^3.2.0", // 毛玻璃效果，底部一张图片，上面放一个view，毛玻璃效果
        "react-native-camera": "^0.10.0", // 自定义拍照页面、录制视频、扫描二维码
        "react-native-communications": "^2.2.1",// 电话、短信、邮件、浏览器
        "react-native-device-info": "^0.12.1", // 获取设备的信息
        "react-native-fetch-blob": "^0.10.8", // 上传（图片、视频等）
        "react-native-fs": "^2.8.1", // 文件的下载和保存
        "react-native-image-crop-picker": "^0.17.3", // 本地相册和照相机来采集图片，并且提供多选、图片裁剪等功能
        "react-native-image-picker": "^0.26.7", // 从相册、相机中选取、拍摄照片
        "react-native-image-zoom-viewer": "^2.0.10",// 大图预览(支持手势缩放)
        "react-native-img-cache": "^1.4.0",// 图片缓存
        "react-native-keyboard-aware-scroll-view": "^0.3.0", // 键盘遮挡输入框的问题
        "react-native-picker-custom": "^1.1.0", // 时间选择和城市选择
        "react-native-scrollable-tab-view": "^0.8.0", // Tab控制器，类似网易新闻首页tab效果
        "react-native-side-menu": "^1.1.3",// 侧栏效果
        "react-native-sound": "^0.10.4", // 播放音频
        "react-native-swipeout": "^2.2.2", // cell 左滑出现按钮
        "react-native-swiper": "^1.5.13", // 轮播图
        "react-native-video": "^2.0.0",// 播放视频
        "react-navigation": "^1.0.0-beta.15", // navigator and tabbar
        "react-redux": "^5.0.6",
        "react-router": "^4.2.0",
        "react_native_countdowntimer": "^1.0.5", // 秒杀倒计时
        "redux": "^3.7.2"                                         
