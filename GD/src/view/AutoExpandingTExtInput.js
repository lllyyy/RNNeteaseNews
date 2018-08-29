import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput
} from 'react-native';


/***
 * 高度自增长的扩展TextInput
 * <AutoExpandingTExtInput onChangeText={this._onChangetext}/>
 *
 */
export default class AutoExpandingTExtInput extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            text:'',
            height:0
        };
        this._onChange = this._onChange.bind(this);
      }

    _onChange(event){
          this.setState({
              text:event.nativeEvent.text,
              height:event.nativeEvent.contentSize.height,
    })
    }

    render() {
        return (
            <TextInput
                {...this.props}
                multiline={true}
                onChange={this._onChange}
                style={[styles.textInputStyle,{height:Math.max(35,this.state.height)}]}
                value={this.state.text}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInputStyle:{
        fontSize:20,
        width:300,
        height:30,
        backgroundColor:'grey',
        paddingTop:0,
        paddingBottom:0,
    }
});
