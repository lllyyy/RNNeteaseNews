import React, {Component} from 'react';
import ConfigApp from '../utils/ConfigApp';
// import { AdMobBanner } from 'expo';
import {View} from 'react-native'
class BannerAd extends React.Component {

  render () {

    return (
    <View />
// <AdMobBanner
//   bannerSize="banner"
//   adUnitID={ConfigApp.BANNER_ID}
//   testDeviceID={ConfigApp.TESTDEVICE_ID}
//   onDidFailToReceiveAdWithError={this.bannerError} />

    )
  }

}

export default BannerAd;
