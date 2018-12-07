import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Text,
  View,
  ImageBackground
} from 'react-native';

import styles from './styles';

class Wellcome extends Component {
  static navigationOptions = { header: null };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground style={styles.imageBackground} source={require('Assets/Imgs/bg.png')}>
        <View style={styles.container}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>Seja Bem Vindo 2</Text>
          </View>
          <View style={styles.groupButtons}>
            <Button
              title="Teste"
              onPress={() => navigate('Login', { user: 'Responsavel' })}
              color="#115E54"
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

Wellcome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Wellcome;
