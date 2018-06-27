import React,{PureComponent} from 'react';
import {StyleSheet} from 'react-native'
import Column from "./Column";
import Image from "./Image";
import Images from "../app/Images";
import Text from "./TextView";
import {px2dp} from "../utils/ScreenUtil";
import {Button} from 'teaset'
import PropTypes from "prop-types";
import Color from "../app/Color";

export default class EmptyView extends PureComponent{
    static propTypes = {
        retryClick: PropTypes.func.isRequired
    };
    render(){
        return(
            <Column style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Image source={Images.Common.empty} />
                <Text mediumSize text={'暂时木有内容呀~~'} style={{marginTop:px2dp(30)}}/>
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
                        重试
                    </Text>
                </Button>
            </Column>
        )
    }
}
const netStyles = StyleSheet.create({

    bt_retry: {
        backgroundColor: Color.gray,
        width: 100,
        marginTop:12,
        alignSelf: 'center',
        height: 30,
        borderWidth:0,
    }
});
