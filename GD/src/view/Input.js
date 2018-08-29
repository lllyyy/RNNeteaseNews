'use strict';
import React, {Component} from 'react'
import {TextInput, StyleSheet, ViewPropTypes} from 'react-native'
import PropTypes from 'prop-types'
import Row from "./Row";
import Color from "../app/Color";
import {px2dp, px2sp} from "../utils/ScreenUtil";
import Text from "./TextView";

/**
 *
 * 输入框
 * */

export default class Input extends Component {

    /**iOS 独有的属性
     *clearBUttonMode 是字符串类型属性 取值为：「never、wehile-editing、unless-editing、always」 右侧显示清除按钮
     *clearTextOnFocus 是布尔类型属性。当它为真时，当用户点击开始编辑时候 会自动清除文字区域
     *enablesReturnKeyAutomatically 是布尔类型的属性，默认false 当它为真是区域没有输入文字时，键盘回车会失效；而有文字时键盘回车生效
     *
     * Android 平台专属
     * inlineImageLeft 是字符属性 是一个图片资源的名称
     *inlineImagePadding 是数值型 它定义inlineImage 的padding与textinput组件自己的padding
     *underlineColorAndroid='transparent'// Android下划线的颜色
     *
     */


    static propTypes= {
        ...TextInput.propTypes,
        id: PropTypes.func,
        bgViewStyle: ViewPropTypes.style,
        label: PropTypes.string,
        labelStyle: Text.propTypes.style,
        selectionColor: PropTypes.string,
        secureTextEntry: PropTypes.bool,
        keyboardType: PropTypes.oneOf([
            'default', 'numeric', 'email-address',
            "ascii-capable", 'numbers-and-punctuation',
            'url', 'number-pad', 'phone-pad',
            'name-phone-pad', 'decimal-pad',
            'twitter', 'web-search']),
        placeholder: PropTypes.string,
        placeholderTextColor: PropTypes.string,
        value: PropTypes.string,
        onFocus: PropTypes.func,
        onEndEditing: PropTypes.func,
        onChangeText: PropTypes.func, //接收数据
        numberOfLines: PropTypes.number
    }

    static defaultProps = {
        ...TextInput.defaultProps,
        selectionColor: Color.theme,
        secureTextEntry: false,
        keyboardType: 'default',
        placeholder: null,
        placeholderTextColor: Color.gray3,
        value: null,
        numberOfLines: 1
    };

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            text:this.props.value
        };
      }

      _onChang = (text) =>{
          this.setState({text});
          this.props.onChangeText(text)
      }

    render() {
        return (
            <Row verticalCenter style={StyleSheet.flatten([{flex: 1},this.props.bgViewStyle])}>
                {this.props.label ?
                    <Text text={this.props.label} style={StyleSheet.flatten([{marginRight: px2dp(20)}, this.props.labelStyle])}/>
                    : null}
                <TextInput
                    ref={this.props.id}
                    style={StyleSheet.flatten([styles.inputStyle, this.props.style])}
                    selectionColor={this.props.selectionColor} //光标颜色
                    secureTextEntry={this.props.secureTextEntry}
                    keyboardType={this.props.keyboardType}
                    numberOfLines={this.props.numberOfLines}//指定行数 multiline={true}//准许多行
                    autoFocus={false} //自动获得焦点
                    underlineColorAndroid='transparent'// Android下划线的颜色
                    placeholder={this.props.placeholder}
                    placeholderTextColor={this.props.placeholderTextColor} //设置提示文字的颜色
                    value={this.state.text}

                    onChangeText={this._onChang}/>
                    {this.props.children}
            </Row>
        );
    }
}

const styles = StyleSheet.create({
    inputStyle:{
        flex: 1,
        fontSize: px2sp(28),
        color:Color.black,
        paddingVertical: 0
    },
});
