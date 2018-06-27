'use strict';
import React, {PureComponent} from 'react';

type Props = {
    visible: boolean
}

/**
 *visible={true}//表示显示  否则隐藏
 *页面 view
 */
export default class VisibleView extends PureComponent<Props> {

    render() {
        return this.props.visible ? this.props.children : null
    }
}
