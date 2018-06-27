import React, {Component} from 'react';
import {
    StyleSheet,

    View,

} from 'react-native';
import BaseScreen from "../../BaseScreen";
import Column from "../../../view/Column";
import Row from "../../../view/Row";
import Text from '../../../view/TextView'
import {paddingLR, paddingTB, px2dp} from "../../../utils/ScreenUtil";
import Color from "../../../app/Color";

export default class PhoneMoblieScreen extends BaseScreen {
    constructor(props) {
        super(props);
        // 初始状态
        this.setTitle('手机号');
        this.state = {
            t:null
        };

    }
    renderView() {
        return (
                <View style={styles.container}>
                <Column style={styles.contern}>
                   <Row verticalCenter style={{justifyContent:'space-between'}}>
                       <Text largeSize text={'手机号'} style={styles.testStyle}/>
                       <Text largeSize gray style={styles.testStyle} text={this.props.navigation.state.params.phone} />
                   </Row>

                </Column>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contern:{

        marginTop: px2dp(20),
        backgroundColor: Color.white
    },
    testStyle:{
        ...paddingTB(20),
        ...paddingLR(15),
    }
});
