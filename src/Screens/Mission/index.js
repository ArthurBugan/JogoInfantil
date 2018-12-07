import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'Components/Loader';
import {
  Container,
  Content,
  Button,
  Text,
  Header,
  Title,
  Left,
  Body,
  Right } from 'native-base';
import { SocialIcon } from 'react-native-elements'
import Fase from 'Components/Fase';
import {
  View,
  SafeAreaView
} from 'react-native';
import Dimensions from 'Dimensions';
import * as licoesActions from 'Actions/Licoes';
import Style from './styles';

const DoubleFase = (props) => (
  <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', flex: 1 }}>
    <View style={{ paddingRight: 10 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1 }}>
        <Fase right {...props.primeira} addLicoes={props.addLicoes} firebase={props.firebase} name={props.name} {...props.navigate} chave={props.chave} handlePopUp={props.handlePopUp} showDialog={props.showDialog} />
      </View>
    </View>
    <View style={{ paddingLeft: 10 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1 }}>
        <Fase left {...props.segunda} addLicoes={props.addLicoes} firebase={props.firebase} name={props.name} {...props.navigate} chave={props.chave + 1} handlePopUp={props.handlePopUp} showDialog={props.showDialog} />
      </View>
    </View>
  </View>
);

class Mission extends Component {
  constructor(props) {
    super(props);
    this.state = { showDialog: '' };
    this.handlePopUp = this.handlePopUp.bind(this);
  }

  handlePopUp(key) {
    this.setState({ showDialog: key });
  }

  render() {
    const { width, height } = Dimensions.get('window');
    let Arr = [];
    let active = {};
    const { data } = this.props.jogos;
    const { title } = this.props.disciplinas;
    if (data.length > 0) {
     for (let i = 0; i < data.length; i++) {
        if (i % 3 === 0 && typeof data[i + 1] !== 'undefined') {
          Arr.push(
            <DoubleFase
              primeira={data[i]}
              chave={i}
              segunda={data[i + 1]}
              addLicoes={this.props.addLicoes}
              name={title}
              firebase={this.props.firebase}
              handlePopUp={this.handlePopUp}
              showDialog={this.state.showDialog}
              navigate={this.props.navigation}
            />);
          i++;
        } else {
          Arr.push(
            <Fase
              {...data[i]}
              {...this.props.navigation}
              addLicoes={this.props.addLicoes}
              isLast={typeof data[i + 1] === 'undefined'}
              name={title}
              firebase={this.props.firebase}
              chave={i}
              handlePopUp={this.handlePopUp}
              showDialog={this.state.showDialog}
            />);
        }
      }
    }

    if (data.length === 0 || this.props.disciplinas.isFetching) {
      return <Loader />;
    }
    return (
      <>
      <Header>
        <Left/>
        <Body>
          <Title>{title.toUpperCase()}</Title>
        </Body>
        <Right />
      </Header>
      <Container style={{ height: height }}>
        <Content style={{ ...Style.gridItem, backgroundColor: '#dee8f7' }}>
          {Arr}
        </Content>
      </Container>
      </>
    );
  }
};

const mapStateToProps = state => (
  {
    disciplinas: state.disciplinas,
    jogos: state.jogos,
    firebase: state.firebase.firebase
  }
);

export default connect(mapStateToProps, licoesActions)(Mission);
