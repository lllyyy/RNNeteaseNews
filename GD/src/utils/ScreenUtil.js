/**
 * 屏幕工具类 以及一些常用的工具类封装
 * ui设计基准,iphone 6
 * width:750px
 * height:1334px
 */
import React from 'react';
import {
    PixelRatio,
    Dimensions,
    Platform,
} from 'react-native';
import { Toast } from 'teaset'
import XPay from 'react-native-puti-pay'

export let screenW = Dimensions.get('window').width;
export let screenH = Dimensions.get('window').height;
const fontScale = PixelRatio.getFontScale();
export let pixelRatio = PixelRatio.get();
//像素密度
export const DEFAULT_DENSITY = 2;

//px转换成dp
//以iphone6为基准,如果以其他尺寸为基准的话,请修改下面的750和1334为对应尺寸即可.
const w2 = 750 / DEFAULT_DENSITY;
//px转换成dp
const h2 = 1334 / DEFAULT_DENSITY;

// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

/**
 * 设置字体的size（单位px）
 * @param size 传入设计稿上的px
 * @returns {Number} 返回实际sp
 */
export function px2sp(size: number) {
    let scaleWidth = screenW / w2;
    let scaleHeight = screenH / h2;
    let scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale + 0.5));
    return size / DEFAULT_DENSITY;
}

// export default barContentPad = {
//
//     barContentPad: (Platform.OS === 'android' ? 0 : (isIphoneX() ? 42 : 20)),
//     bottomPadding: isIphoneX() ? 18 : 0,
//     // 常用颜色
//     primaryColor: '#EE0000',
//     lightGray: '#f5f5f5',
//     darkGray: '#e5e5e5',
//     lightBlack: '#333333'
// };

/**
 * 屏幕适配,缩放size
 * @param size
 * @returns {number}
 */
export function px2dp(size: number) {
    let scaleWidth = screenW / w2;
    let scaleHeight = screenH / h2;
    let scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale + 0.5));
    return size / DEFAULT_DENSITY;
}

/**
 * 同时设置宽高
 * @param width
 * @param height
 * @returns {{width: Number, height: Number}}
 */
export function wh(width: number, height: number = width) {
    return {
        width : px2sp(width),
        height : px2sp(height)
    }
}

/**
 * 同时设置垂直方向的padding
 * @param top
 * @param bottom
 * @returns {{paddingTop: Number, paddingBottom: Number}}
 */
export function paddingTB(top: number, bottom: number = top) {
    return {
        paddingTop : px2sp(top),
        paddingBottom : px2sp(bottom)
    }
}

/**
 * 同时设置水平方向的padding
 * @param left
 * @param right
 * @returns {{paddingLeft: Number, paddingRight: Number}}
 */
export function paddingLR(left: number, right: number = left) {
    return {
        paddingLeft : px2sp(left),
        paddingRight : px2sp(right)
    }
}

/**
 * 同时设置垂直方向的margin
 * @param top
 * @param bottom
 * @returns {{marginTop: Number, marginBottom: Number}}
 */
export function marginTB(top: number, bottom: number = top) {
    return {
        marginTop : px2sp(top),
        marginBottom : px2sp(bottom)
    }
}

/**
 * 同时设置水平方向的padding
 * @param left
 * @param right
 * @returns {{paddingLeft: Number, paddingRight: Number}}
 */
export function marginLR(left: number, right: number = left) {
    return {
        marginLeft : px2sp(left),
        marginRight : px2sp(right)
    }
}

/**
 * 同时设置垂直方向的边线宽度
 * @param top
 * @param bottom
 * @returns {{borderTopWidth: number, borderBottomWidth: number}}
 */
export function borderWidthTB(top: number, bottom: number = top) {
    return {
        borderTopWidth : px2dp(top),
        borderBottomWidth : px2dp(bottom)
    }
}

/**
 * 同时设置水平方向的边线宽度
 * @param left
 * @param right
 * @returns {{borderLeftWidth: number, borderRightWidth: number}}
 */
export function borderWidthLR(left: number, right: number = left) {
    return {
        borderLeftWidth : px2dp(left),
        borderRightWidth : px2dp(right)
    }
}

/**
 * 判断是否为iphoneX
 * @returns {boolean}
 */
export function isIphoneX() {
    return (
        Platform.OS === 'ios' &&
        ((screenH === X_HEIGHT && screenW === X_WIDTH) ||
            (screenH === X_WIDTH && screenW === X_HEIGHT))
    )
}

/**
 * 根据是否是iPhoneX返回不同的样式
 * @param iphoneXStyle
 * @param iosStyle
 * @param androidStyle
 * @returns {*}
 */
export function ifIphoneX(iphoneXStyle, iosStyle = {}, androidStyle) {
    if (isIphoneX()) {
        return iphoneXStyle;
    } else if (Platform.OS === 'ios') {
        return iosStyle
    } else {
        if (androidStyle) {
            return androidStyle;
        }
        return iosStyle
    }
}

//验证手机号11位1开头
export function checkMobile(str) {
    var re = /^1\d{10}$/
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
}

//验证电话
export function checkPhone(str) {
    var re = /^\d{3,4}-?\d{7,8}$/;
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
}

//验证邮箱
export function checkEmail(str) {
    var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
}

export function parseTime(time) {
    var now = new Date(time);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}

/**
 *
 *微信支付
 */


export function wxPay() {

    // const res =   fetch('http://wxpay.wxutil.com/pub_v2/app/app_pay.php').then((res) =>{
    //     console.log('支付参数res', res.json());
    //     const params =  res.json();
    //     console.log('支付参数', params);
    //     const {partnerid, noncestr, timestamp, prepayid, sign} = params;
    XPay.wxPay({
            partnerId : '1900006771',
            prepayId : 'wx01144703514263564950e0e01706395905',
            packageValue : 'Sign=WXPay',
            nonceStr : '670d137278e23d14599f654084253094',
            timeStamp : '1527835623',
            sign : '335362BED4925618D8B3AEA4F7DCAB4B'
        },
        res => {
            console.log('回调', res);
            const { errCode } = res;
            if (errCode === 0 || errCode === '0') {
                Toast.success('充值成功')
            } else {
                Toast.fail('充值失败')
            }
        })
    // });

}

/***、
 * 支付宝
 */

export function aliPay() {
    XPay.alipay(
        'app_id=2015052600090779&biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%220.01%22%2C%22subject%22%3A%221%22%2C%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%22%2C%22out_trade_no%22%3A%22IQJZSRC1YMQB5HU%22%7D&charset=utf-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fdomain.merchant.com%2Fpayment_notify&sign_type=RSA2&timestamp=2016-08-25%2020%3A26%3A31&version=1.0&sign=cYmuUnKi5QdBsoZEAbMXVMmRWjsuUj%2By48A2DvWAVVBuYkiBj13CFDHu2vZQvmOfkjE0YqCUQE04kqm9Xg3tIX8tPeIGIFtsIyp%2FM45w1ZsDOiduBbduGfRo1XRsvAyVAv2hCrBLLrDI5Vi7uZZ77Lo5J0PpUUWwyQGt0M4cj8g%3D',
        res => {
            console.log('回调', res);
            const { result, memo, resultStatus } = res;
            if (resultStatus === '9000') {
                Toast.success('充值成功')
            } else {
                Toast.fail('充值失败')
            }
        })

}

let isCalled = false, timer;

/**防止快速重复点击
 *  callOnceInInterval(() => this.props.navigation.navigate('Profile'))//用法
 * @param functionTobeCalled 被包装的方法
 * @param interval 时间间隔，可省略，默认600毫秒
 */
export default callOnceInInterval = (functionTobeCalled, interval = 600) => {
    if (!isCalled) {
        isCalled = true;
        clearTimeout(timer);
        timer = setTimeout(() => {
            isCalled = false;
        }, interval);
        return functionTobeCalled();
    }
};

//获取时间差 current:1497235409744 当前时间  start:1497235419744 开始时间
export function getRemainingime(current: Number, start: Number) {

    let time = start - current;
    if (time < 0) {
        return [ "0", "0", "0", "0", "0", "0" ];
    }
    let year = Math.floor(time / (365 * 30 * 24 * 3600 * 1000));//年

    let month = Math.floor(time / (30 * 24 * 3600 * 1000));//月

    let days = Math.floor(time / (24 * 3600 * 1000));//日
    let temp1 = time % (24 * 3600 * 1000);
    let temp2 = temp1 % (3600 * 1000);
    let minutes = Math.floor(temp2 / (60 * 1000));//分
    let hours = Math.floor(temp1 / (3600 * 1000));//时
    let temp3 = temp2 % (60 * 1000);
    let seconds = Math.round(temp3 / 1000);//秒

    let strs = [ year, toNormal(month), toNormal(days), toNormal(hours), toNormal(minutes), toNormal(seconds) ];
    return strs;//["0", "0", "2", "7", "33", "30"]0年0月2日 7时33分30秒
}

//1497235419
export function getRemainingimeDistance(distance: Number) {
    let time = distance * 1000;
    if (time < 0) {
        return [ "0", "0", "0", "0", "0", "0" ];
    }

    let year = Math.floor(time / (365 * 30 * 24 * 3600 * 1000));//年

    let month = Math.floor(time / (30 * 24 * 3600 * 1000));//月

    let days = Math.floor(time / (24 * 3600 * 1000));//日
    let temp1 = time % (24 * 3600 * 1000);
    let hours = Math.floor(temp1 / (3600 * 1000));//时
    let temp2 = temp1 % (3600 * 1000);
    let minutes = Math.floor(temp2 / (60 * 1000));//分
    let temp3 = temp2 % (60 * 1000);
    let seconds = Math.round(temp3 / 1000);//秒

    let strs = [ year, toNormal(month), toNormal(days), toNormal(hours), toNormal(minutes), toNormal(seconds) ];
    // strs.splice(0, 1, String(Number(strs[0]) - 1970));//年
    // strs.splice(1, 1, String(Number(strs[1]) - 1));
    // strs.splice(2, 1, (Number(strs[2]) - 1) < 10 ? '0' + (Number(strs[2]) - 1) : String(Number(strs[2]) - 1));
    // strs.splice(3, 1, (Number(strs[3]) - 8) < 10 ? '0' + (Number(strs[3]) - 8) : String(Number(strs[3]) - 8));
    // strs.splice(4, 1, Number(strs[4]) < 10 ? '0' + Number(strs[4]) : String(Number(strs[4])));
    // strs.splice(5, 1, Number(strs[5]) < 10 ? '0' + Number(strs[5]) : String(Number(strs[5])));
    return strs;//["0", "0", "2", "7", "33", "30"]0年0月2日 7时33分30秒
}

export function toNormal(time: Number) {
    return time >= 10 ? time : '0' + time;
}

//转换成日期
export function toDate(timestamp: Number, format1 = 'yyyy-MM-dd hh:mm:ss') {
    try {
        if (timestamp > 10000) {
            let date = new Date();
            date.setTime(timestamp);
            return date.format(format1);//2014-07-10 10:21:12
        } else {
            return '';
        }
    } catch (erro) {
        return '';
    }
    return '';
}

//转换成时间搓
export function toTimestamp(date: String) {
    let timestamp = Date.parse(date);
    return timestamp / 1000;  // 1497233827569/1000
}

//CST时间=>转换成日期yyyy-MM-dd hh:mm:ss
export function getTaskTime(strDate) {
    if (null == strDate || "" == strDate) {
        return "";
    }
    let dateStr = strDate.trim().split(" ");
    let strGMT = dateStr[ 0 ] + " " + dateStr[ 1 ] + " " + dateStr[ 2 ] + " " + dateStr[ 5 ] + " " + dateStr[ 3 ] + " GMT+0800";
    let date = new Date(Date.parse(strGMT));
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    let second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;

    return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
};

//1497235419
export function getRemainingimeDistance2(distance: Number) {
    let time = distance;
    let days = Math.floor(time / (24 * 3600 * 1000));
    let temp1 = time % (24 * 3600 * 1000);
    let hours = Math.floor(temp1 / (3600 * 1000));
    let temp2 = temp1 % (3600 * 1000);
    let minutes = Math.floor(temp2 / (60 * 1000));
    if (time <= 60 * 1000) {
        minutes = 1;
    }
    let temp3 = temp2 % (60 * 1000);
    let seconds = Math.round(temp3 / 1000);
    return [ hours, minutes ];//["0", "0", "2", "7", "33", "30"]0年0月2日 7时33分30秒
}

export function isEmpty(str) {
    return str === null || str === '' || str === undefined;
}

//
// /
// /**
//  * 根据是否是iPhoneX返回不同的样式
//  * @param iphoneXStyle
//  * @param iosStyle
//  * @param androidStyle
//  * @returns {*}
//  */
// export function ifIphoneX(iphoneXStyle, iosStyle = {}, androidStyle) {
//     if (isIphoneX()) {
//         return iphoneXStyle;
//     } else if (Platform.OS === 'ios') {
//         return iosStyle
//     } else {
//         if (androidStyle) return androidStyle;
//         return iosStyle
//     }
// }
/**
 *
 * @param timestamp  时间戳
 * @returns {string}
 */
export function getFormattedTime(timestamp) {
    let curTime = Date.parse(new Date()) / 1000;
    let delta = curTime - timestamp;
    const hour = 60 * 60;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 12 * month;
    if (delta < hour) {
        // 显示多少分钟前
        let n = parseInt(delta / 60);
        if (n == 0) {
            return "刚刚";
        }
        return n + '分钟前';
    } else if (delta >= hour && delta < day) {
        return parseInt(delta / hour) + '小时前';
    } else if (delta >= day && delta < month) {
        return parseInt(delta / day) + '天前';
    } else if (delta >= month && delta < year) {
        return parseInt(delta / month) + '个月前';
    }
}

/**
 *
 * @param date   new Date
 * @param fmt   "yyyy-MM-dd hh:mm:ss"
 * @returns {*}
 */
export function format(date, fmt) {
    var o = {
        "M+" : date.getMonth() + 1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth() + 3) / 3), //季度
        "S" : date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in
        o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[ k ]) : (("00" + o[ k ]).substr(("" + o[ k ]).length)));
        }
    }
    return fmt;
}

/**
 *
 * @param timestamp 时间戳
 * @returns {MM月dd日 hh:mm}
 */
//时间 月份
export function formatChatTime(timestamp) {
    return format(new Date(timestamp * 1000), 'MM月dd日 hh:mm');
}

/**
 *
 * @returns {number}
 */
export function currentTime() {
    return Date.parse(new Date()) / 1000;
}


