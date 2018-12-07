/* eslint-disable no-console */
import React, { Component } from 'react';
import Reactotron from 'reactotron-react-native'
import { BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation/src/react-navigation';
import { Provider } from 'react-redux';
import { Root } from 'native-base';
import DeviceInfo from 'react-native-device-info';
import configureStore from './store';
import Navigator from 'Root/navigator';
// import Tts from 'react-native-tts';
import firebase from 'react-native-firebase';

const store = configureStore();
let MyAppWithBenefits = Navigator;
// MyAppWithBenefits = console.tron.overlay(Navigator);
// console.tron = Reactotron;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { jogo: {} };
  }

  //firebase
  componentDidMount() {
    const config = {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGE_SENDER_ID,
      persistence: process.env.PERSISTENCE
    };

    const jogo = firebase.initializeApp(config);
    jogo.onReady().then((app) => {
      app.uniqueID = DeviceInfo.getUniqueID();

      const settings = { timestampsInSnapshots: true };

      jogo.firestore().settings(settings);
      this.setState({ jogo: app })
    });

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      NavigationActions.navigate({ routeName: 'Home' });
    });


  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    return (
      <Root>
        <Provider store={store}>
          <MyAppWithBenefits data={this.state.jogo} />
        </Provider>
      </Root>
    );
  }
}
export default Main;
