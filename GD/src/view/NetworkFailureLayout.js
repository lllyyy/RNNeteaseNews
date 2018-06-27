import React, {Component} from 'react';
import PropTypes from "prop-types";
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    Text,
} from 'react-native';

import {Button} from 'teaset'
import Images from '../app/Images'
import Color from "../app/Color";


/*
    没有网加载的页面
 */

export default class NetworkFailureLayout extends Component {
    static propTypes = {
        retryClick: PropTypes.func.isRequired
    };

    render() {
        return (
            <View style={netStyles.wrapper}>
                <Image
                    source={Images.Common.empty}
                    style={{width: 100, height: 100}}
                />
                <Text style={{
                    marginTop: 12, color: Color.gray,
                }}>
                    {"连接服务器异常，请重试"}
                </Text>

                <Button
                    onPress={() => {
                        if (this.props.retryClick != null) {
                            this.props.retryClick()
                        }
                    }}
                    style={netStyles.bt_retry}>
                    <Text style={{
                        flex: 1,
                        color: Color.white,
                        textAlign: 'center',
                    }}>
                        {"重试"}
                    </Text>
                </Button>
            </View>
        )
    }
}

const netStyles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        zIndex: 10,
    },
    bt_retry: {
        backgroundColor: Color.gray,
        width: 100,
        marginTop: 12,
        alignSelf: 'center',
        height: 30,
    }
});
