/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,

} from 'react-native';
import Home from "./APP/Home/Home";
import GDSetting from "./APP/Setting/GDSetting";
import GDht from "./APP/GDHt/GDht";
import  ScrollableTabView from 'react-native-scrollable-tab-view'


type Props = {};
export default class App extends Component<Props> {

  // 构造
    constructor(props) {
      super(props);
      // 初始状态
      this.state = {

      };
    }



  render() {
    return (

        <ScrollableTabView>
            <Home tabLabel="React" />
            <GDSetting tabLabel="Flow" />
            <GDht tabLabel="Jest" />
        </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
