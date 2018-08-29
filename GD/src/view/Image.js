'use strict';
import React from 'react'
import {Image} from 'react-native'
import PropTypes from 'prop-types'

/**
 * 网络图片加载
 *
 */
export default class ImageView extends Image {

    static cdn = 'https://fuss10.elemecdn.com'; //分类的图片用这个域名，搞不到原作为什么用两个图片基础域名

    constructor(props) {
        super(props);
        this.baseUrl = 'http://cangdu.org:8001/img/'

    }
    // state = {
    //     width: 0,
    //     height: 0
    // }

    // componentDidMount () {
    //     Image.getSize(this.props.source, (width, height) => {
    //      let h = 330 * height / width
    //      this.setState({height: h})
    //   })
    //  }

static propTypes = {
        ...Image.propTypes,
        needBaseUrl: PropTypes.bool,
        source: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
    };
    static defaultProps = {
        ...Image.defaultProps,
        needBaseUrl: true
    };

    render() {
        let {source, needBaseUrl, ...others} = this.props;

        if (typeof source !== 'number' && needBaseUrl) {
            source = {uri: this.baseUrl + source}
        } else if (typeof source !== 'number' && !needBaseUrl) {
            source = {uri: source}

            console.log(source)
        }

        // styles = {width: 330, height: this.state.height}

        this.props = {source, ...others};

        return super.render();
    }
}

// state = {
//     width: 0,
//     height: 0
// }
//
// componentDidMount () {
//     Image.getSize(this.props.uri, (width, height) => {
//         let h = 330 * height / width
//         this.setState({height: h})
//     })
// }
//
// render () {
//     return (
//         <Image source={{uri: this.props.uri}} style={[{width: 330, height: this.state.height}, this.props.style]} />
//     )
// }
// }
