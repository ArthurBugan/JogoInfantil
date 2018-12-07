import React from 'react';
import PropTypes from 'prop-types';
import {
  ImageBackground,
  View,
  TouchableOpacity
} from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
import { Form } from 'react-final-form';
import Input from 'Components/Form/Input';
import Style from './styles';

const onSubmit = (values) => {
  alert(JSON.stringify(values, 0, 2));
};
const SignUp = (props) => {
  const { goBack } = props.navigation;
  return (
    <Container style={Style.container}>
      <Content>
        <ImageBackground source={require('Assets/Imgs/bgAc.png')} style={Style.imageBackground}>
          <View style={Style.conteinerLogo}>
            <Text style={Style.titleSignUp}>Fazer Parte da Familia A.U</Text>
          </View>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, submitting, pristine, values }) => (
              <View style={Style.conteinerForm}>
                <Input
                  name="name"
                  label="Nome"
                  type="input"
                  placeholder="Nome"
                  rounded
                  required
                />
                <Input
                  name="email"
                  label="E-mail"
                  type="email"
                  placeholder="E-mail"
                  rounded
                  required
                />
                <Input
                  name="password"
                  label="Senha"
                  type="password"
                  placeholder="Senha"
                  rounded
                  required
                />
                <Input
                  name="confirm_password"
                  label="Confirmar Senha"
                  type="confirmPassword"
                  placeholder="Confirmar Senha"
                  confirm={values.password}
                  rounded
                  required
                />
                <Button
                  full
                  rounded
                  onPress={handleSubmit}
                  disabled={submitting || pristine}
                  style={submitting || pristine ? Style.btnRegisterDisabled : Style.btnRegister}
                >
                  <Text>Entrar</Text>
                </Button>
              </View>
            )}
          />
          <TouchableOpacity style={Style.conteinerLinkLogin} onPress={() => goBack()}>
            <Text style={Style.linkLogin}>Ja é da familia A.U? Então faça login</Text>
          </TouchableOpacity>
        </ImageBackground>
      </Content>
    </Container>
  );
};
SignUp.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignUp;
