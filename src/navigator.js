// In App.js in a new project

import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import Home from 'Screens/Home';
import Mission from 'Screens/Mission';
import Licoes from 'Screens/Licoes';
// TODO:
//  Add transition
import transitionConfig from 'Util/RightTransition';

const Stack = createStackNavigator(
  {
    Home: { screen: Home },
    Mission: { screen: Mission },
    Licoes: { screen: Licoes }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'screen',
    navigationOptions: {
      header: null
    }
  }
);


export default class Navigator extends Component {
  render() {
    return <Stack screenProps={this.props.data} />
  }
}
