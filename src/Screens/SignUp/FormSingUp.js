import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Text,
  TextInput,
  View,
  ImageBackground
} from 'react-native';
import { connect } from 'react-redux';

import { modificaEmail, modificaSenha, modificaNome, singUpCreate } from 'Redux/Actions/authActions';

class FormSingUp extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Cadastro: ${navigation.state.params.user}`,
  });

  _singUpCreate() {
    const { nome, email, senha } = this.props;
    this.props.singUpCreate({ nome, email, senha });
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <ImageBackground style={{ flex: 1, width: null }} source={require('Assets/Imgs/bg-blue.png')}>
        <View style={{ flex: 1, padding: 10 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 25 }}>{state.params.user}</Text>
          </View>
          <View style={{ flex: 4 }}>
            <TextInput
              value={this.props.nome}
              style={{ fontSize: 20, height: 45 }}
              placeholderTextColor="#FFF"
              placeholder="Nome"
              onChangeText={texto => this.props.modificaNome(texto)}
            />
            <TextInput
              value={this.props.email}
              style={{ fontSize: 20, height: 45 }}
              placeholderTextColor="#FFF"
              placeholder="E-mail"
              onChangeText={texto => this.props.modificaEmail(texto)}
            />
            <TextInput
              secureTextEntry
              value={this.props.senha}
              style={{ fontSize: 20, height: 45 }}
              placeholderTextColor="#FFF"
              placeholder="Senha"
              onChangeText={texto => this.props.modificaSenha(texto)}
            />
            <Text style={{ color: '#FF0000' }}>{this.props.error_singUp}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Button title="Cadastrar" onPress={() => this._singUpCreate()} />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

FormSingUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
  }).isRequired,
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  senha: PropTypes.string.isRequired,
  error_singUp: PropTypes.string.isRequired,
  singUpCreate: PropTypes.func.isRequired,
  modificaNome: PropTypes.func.isRequired,
  modificaEmail: PropTypes.func.isRequired,
  modificaSenha: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    nome: state.authReducer.nome,
    email: state.authReducer.email,
    senha: state.authReducer.senha,
    error_singUp: state.authReducer.error_singUp
  }
);

export default connect(mapStateToProps, { modificaEmail, modificaSenha, modificaNome, singUpCreate })(FormSingUp);

