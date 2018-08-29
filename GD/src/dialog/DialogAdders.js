import React from 'react';
import {View,TouchableOpacity} from "react-native";
import Text from "../view/TextView";
import Row from "../view/Row";
import {Button} from 'teaset'
import Color from "../app/Color";
import {px2dp, px2sp, wh} from "../utils/ScreenUtil";
import PropTypes from 'prop-types';
import DialogBase from "./DialogBase";
import AddressSelect from "../view/AddressSelect";

export default class DialogAdders extends DialogBase {

    // 根据需要设置默认属性
    // static defaultProps = {
    //   type: 'zoomOut',
    //   modal: true,
    // };

    static propTypes = {
        handleRightBth: PropTypes.func
    };

    renderContent() {
        return (
            <View style={{
                backgroundColor: 'white',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>


            </View>
        )
    }

    _onRightBtnClick = () => {
        this.hide();
        this.props.handleRightBth()
    }
}
