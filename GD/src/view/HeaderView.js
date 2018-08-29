import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'
import {px2dp} from "../utils/ScreenUtil";

/***
 * 使用方法
 *
 *   <HeaderView timeTitle={"限时抢购"} endTitle={"距离时间"} endTitleBool={false} onPressBool={false} onPress={()=>{
                alert("BBB")
              }}/>
 */
export default class HeaderView extends Component {
    static propTypes= {
        timeTitle: PropTypes.string,
        onPressBool:PropTypes.bool,
        endTitle:PropTypes.string,
        endTitleBool:PropTypes.bool,
        onPress: PropTypes.func
    }

    static defaultProps = {
        timeTitle: "限时抢购",
        endTitle:"距离时间",
        onPressBool:true,
        endTitleBool:true,
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态

    }
    //时间专递
    moreList(){
        this.props.onPress()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={{fontSize: px2dp(28), fontWeight: "bold"}}>{this.props.timeTitle}</Text>
                        {
                            this.props.endTitleBool &&  <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Text style={{fontSize: px2dp(22), color: "#aaa", marginLeft: 10}}>{this.props.endTitle}</Text>
                                <Text style={styles.time}>01</Text>
                                <Text style={{fontSize: px2dp(22), color: "#aaa"}}>:</Text>
                                <Text style={styles.time}>07</Text>
                                <Text style={{fontSize: px2dp(22), color: "#aaa"}}>:</Text>
                                <Text style={styles.time}>10</Text>
                            </View>
                        }

                    </View>
                    {
                        this.props.onPressBool && <TouchableOpacity onPress={this.moreList.bind(this)}>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Text style={{fontSize: px2dp(24), color: "#aaa", marginRight: 3}}>更多</Text>
                                <Icon name="ios-arrow-forward-outline" size={px2dp(26)} color="#bbb" />
                            </View>
                        </TouchableOpacity>
                    }

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: 10,
        paddingHorizontal: 16,
        paddingVertical: 16
    },
    time: {
        paddingHorizontal: 3,
        backgroundColor: "#333",
        fontSize: px2dp(22),
        color: "#fff",
        marginHorizontal: 3
    },
});
