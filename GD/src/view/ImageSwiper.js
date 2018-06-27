
//轮播图片封装
import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    Dimensions
} from 'react-native'
import Swiper from 'react-native-swiper'
import {screenW} from "../utils/ScreenUtil";
import Color from "../app/Color";


const styles = {
    container: {
        flex: 1,
        height: screenW / 3,
    },

    wrapper: {
    },

    slide: {
        width: screenW,
        height: screenW / 3,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        flex: 1,
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },

    image: {
        width: screenW,
        height: screenW / 3,
    }
}

export default class extends Component {
    state = {
        swiperVisible: false
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({swiperVisible: true})
        }, 100)
    }
    render () {
        const { swiperVisible } = this.state;
        const { banner } = this.props;
        return (
            <View style={styles.container}>
                {
                    swiperVisible && banner && banner.length > 0 && (
                        <Swiper style={styles.wrapper} height={screenW / 3}
                                dot={<View style={{backgroundColor: Color.white, width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                                activeDot={<View style={{backgroundColor: Color.theme, width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                                paginationStyle={{
                                    bottom: 0, left: null, right: 10
                                }}
                                loop
                                autoplay
                                removeClippedSubviews={false}
                        >
                            {
                                banner.map((v, i) => (
                                    <View style={styles.slide} key={i}>
                                        <TouchableOpacity onPress={this._indexImage(i)}>
                                            <Image resizeMode='stretch' style={styles.image} source={{uri: v.pic + '?param=500y200'}} />
                                        </TouchableOpacity>
                                    </View>
                                ))
                            }

                        </Swiper>
                    )
                }

            </View>
        )
    }

    _indexImage=(index)=> {
        alert(index)
    }

}
