
'use strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import PropTypes from 'prop-types'

/**
 *  <Row horizontalCenter>//居中
 * <Row verticalCenter>//水平
 */

export default class Row extends Component {

    static propTypes:{
      verticalCenter:PropTypes.bool,
      horizontalCenter:PropTypes.bool
    };

    render() {
        const {verticalCenter,horizontalCenter} = this.props;
        const style ={
            flexDirection:'row',
            alignItems:verticalCenter ? 'center':'stretch',
            justifyContent:horizontalCenter ? 'center':'flex-start'
        };
        return (
            <View style={StyleSheet.flatten([style,this.props.style])}>
                {this.props.children}
            </View>
        );
    }
}
