
import React, {Component} from 'react'
import {TouchableNativeFeedback, StyleSheet, ViewPropTypes,View,Text,TouchableOpacity,Platform} from 'react-native'
import PropTypes from 'prop-types'




export default class SelectCityTabBar extends Component {
    //属性声名
    static propTypes = {
        goToPage: PropTypes.func,
        activeTab: PropTypes.number,
        tabs: PropTypes.array,
        backgroundColor: PropTypes.string,
        activeTextColor: PropTypes.string,
        inactiveTextColor: PropTypes.string,
        textStyle: Text.propTypes.style,
        tabStyle: ViewPropTypes.style,
        renderTab: PropTypes.func,
        underlineStyle: ViewPropTypes.style,
    };
    //默认属性
    static defaultProps = {
        activeTextColor: '#FA3D4F',
        inactiveTextColor: 'black',
        backgroundColor: null,
    };

    renderTab(name, page, isTabActive, onPressHandler) {
        const {activeTextColor, inactiveTextColor, textStyle,} = this.props;
        const textColor = isTabActive ? activeTextColor : inactiveTextColor;
        const fontWeight = isTabActive ? 'bold' : 'normal';
        const viewStyle = isTabActive ? [styles.tab, {borderBottomWidth: 1, borderColor: 'red'}] : styles.tab;

        if (Platform.OS !== 'ios') {
            return <TouchableNativeFeedback
                delayPressIn={0}
                background={TouchableNativeFeedback.SelectableBackground()}
                key={name + page}
                accessible={true}
                accessibilityLabel={name}
                accessibilityTraits='button'
                onPress={() => onPressHandler(page)}>

                <View style={viewStyle}>
                    <Text style={[{color: textColor, fontWeight,}, textStyle,]}>
                        {name}
                    </Text>
                </View>
            </TouchableNativeFeedback>
        }

        return <TouchableOpacity
            key={name + page}
            accessible={true}
            accessibilityLabel={name}
            accessibilityTraits='button'
            onPress={() => onPressHandler(page)}>

            <View style={viewStyle}>
                <Text style={[{color: textColor, fontWeight,}, textStyle,]}>
                    {name}
                </Text>
            </View>
        </TouchableOpacity>;
    }

    render() {
        return (
            <View style={{
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderColor: 'red'
            }}>
                {this.props.tabs.map((name, page) => {
                    const isTabActive = this.props.activeTab === page;
                    const renderTab = this.props.renderTab || this.renderTab;
                    return this.renderTab(name, page, isTabActive, this.props.goToPage);
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        marginLeft: 10,
    },
    tabs: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#ccc',
    },
});
