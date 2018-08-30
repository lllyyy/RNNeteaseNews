 import React, {Component} from 'react';

import AppPreLoader from '../components/AppPreLoader';
import{ ImageBackground, Dimensions, View, Image, SafeAreaView, FlatList, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


import { Container, Text} from 'native-base';

import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class WLevels extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${Strings.ST11}`,
    headerRight: <Icon name="md-search" style={{marginRight: 20}} size={27} color="white" onPress={() => navigation.navigate('WorkoutSearchScreen')}/>

 });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {

       return fetch(ConfigApp.URL+'json/data_levels.php')
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

ListWorkoutsByLevel=(level_id, level_title)=>
{
      this.props.navigation.navigate('WorkoutsByLevelScreen', { IdLevel: level_id, TitleLevel: level_title });
}

  render() {

    if (this.state.isLoading) {
      return (
        <AppPreLoader/>
      );
    }

    return (

<Container style={styles.background_general}>

        <FlatList
          data={ this.state.dataSource }
          refreshing="false"
          renderItem={({item}) =>
                <TouchableOpacity onPress={this.ListWorkoutsByLevel.bind(this, item.level_id, item.level_title)} activeOpacity={1}>
                <ImageBackground source={{uri: ConfigApp.URL+'images/'+item.level_image}} style={styles.background_categories}>

                    <View style={styles.title_categories_border}/>

                            <Text style={styles.title_categories}>{item.level_title}</Text>

                </ImageBackground>
                </TouchableOpacity>
}
        keyExtractor={(item, index) => index.toString()}


        />

</Container>
    );
  }
}
