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
const RecoveryPass = (props) => {
  const { goBack } = props.navigation;
  return (
    <Container style={Style.container}>
      <Content>
        <ImageBackground source={require('Assets/Imgs/bgAc.png')} style={Style.imageBackground}>
          <View style={Style.conteinerLogo}>
            <Text style={Style.titleRecovery}>Recuperar Senha</Text>
          </View>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, submitting, pristine }) => (
              <View style={Style.conteinerForm}>
                <Input
                  name="email"
                  label="E-mail"
                  type="email"
                  placeholder="E-mail"
                  rounded
                  required
                />
                <Text style={Style.textRecoveryPass}>
                  Será enviado um e-mail para você com o codigo para alterar a
                  senha
                </Text>
                <Button
                  full
                  rounded
                  onPress={handleSubmit}
                  disabled={submitting || pristine}
                  style={submitting || pristine ? Style.btnSendDisabled : Style.btnSend}
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
RecoveryPass.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
export default RecoveryPass;
