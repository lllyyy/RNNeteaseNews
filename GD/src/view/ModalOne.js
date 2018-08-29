/**
 * 作者：请叫我百米冲刺 on 2018/4/4 下午1:24
 * 邮箱：mail@hezhilin.cc
 */

'use strict';
import React, {Component} from "react";
import {View, Text, Dimensions, Button,TouchableOpacity,DeviceEventEmitter} from "react-native";
import ModalView from './ModalView'
const {width} = Dimensions.get('window')
import AddressSelect from "../view/AddressSelect";
import {screenH} from "../utils/ScreenUtil";
import PropTypes from 'prop-types';
export default class ModalOne extends Component {
    static propTypes = {
        handleRightBth: PropTypes.func
    };


    render() {
        return (
            <ModalView ref={(c) => this.modalView = c} animationType="slide"  >
                <View style={{flex: 1, width: width, backgroundColor: 'rgba(0,0,0,0.5)'}} >
                    <View style={{width: width,top:screenH/2 - 80}}>

                            <Button title="关闭ModalOne" onPress={() => this._postMsgByListener()}/>
                            <Text>地址选择</Text>
                            <AddressSelect
                                commitFun={(area) => this.onSelectArea(area)}
                                dissmissFun={() => {
                                }}
                            />

                        {/*<Button title="关闭ModalOne" onPress={() => this.disMiss()}/>*/}
                    </View>
                </View>
            </ModalView>
        )
    }
    onSelectArea=(area)=>{
        this.props.handleRightBth(area)
   }
    show = () => {
        this.modalView && this.modalView.show()
    }

    disMiss = () => {
         this.modalView && this.modalView.disMiss()
    }

    //DeviceEventEmitter传值使用
    _postMsgByListener=()=>{
        DeviceEventEmitter.emit('Msg','此消息来自于子组件，DeviceEventEmitter父组件进行修改和状态变化');
    }
}
