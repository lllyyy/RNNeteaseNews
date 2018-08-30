import React,{PureComponent} from 'react';

import {Root,Container,Text} from "native-base";
import {StatusBar} from "react-native";
// import AppPreLoader from "./application/components/AppPreLoader";

 import GuestNavigation from './application/navigations/Guest';
 import LoggedNavigation from './application/navigations/Logged';
  import OfflineBar from "./application/components/OfflineBar";

 // console.disableYellowBox = true;


export default class App extends PureComponent {


    render() {
         return (
            <Root>

                {/*<OfflineBar/>*/}
                {/*<StatusBar barStyle="light-content" backgroundColor="#ce8512"/>*/}

                <GuestNavigation/>
            </Root>
        );

    }
}


