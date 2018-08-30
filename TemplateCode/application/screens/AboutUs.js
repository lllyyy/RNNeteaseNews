import React, {Component} from 'react';

import AppPreLoader from '../components/AppPreLoader';

import{TouchableOpacity, Dimensions, View, Image, FlatList, ScrollView} from 'react-native';

import { Container, Text} from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import HTML from 'react-native-render-html';

import Strings from '../utils/Strings';


var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class AboutUs extends Component {
static navigationOptions = {
  title: `${Strings.ST9}`,
};


constructor(props) {

    super(props);

    this.state = {
      isLoading: true
    }

  }

  componentDidMount() {

       return fetch(ConfigApp.URL+'json/data_strings.php')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             dataSource: responseJson
           }, function() {
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }


  render () {

      if (this.state.isLoading) {
      return (
        <AppPreLoader/>
      );
    }

    return (

<Container style={styles.background_general}>
<ScrollView>

<View style={{padding: 20}}>

<FlatList
          data={ this.state.dataSource }
          refreshing="false"
          renderItem={({item}) =>
<HTML html={item.st_aboutus} />
}
        keyExtractor={(item, index) => index.toString()}


        />

</View>
</ScrollView>

</Container>

    )
  }

}
