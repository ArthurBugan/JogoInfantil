import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as disciplinasActions from 'Actions/Disciplinas';
import * as jogosActions from 'Actions/Jogos';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Container, Content, Button, Text } from 'native-base';
import { SocialIcon } from 'react-native-elements'
import Loader from 'Components/Loader';
import Card from 'Components/Card';
import GridView from 'react-native-super-grid';

import {
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { Form } from 'react-final-form';
import Style from './styles';
import Dimensions from 'Dimensions';

class Login extends Component {
  constructor (props) {
    super(props);
    this.firebase = 0;
  }

  componentDidMount() {
    this.firebase = 0;
  }

  componentWillReceiveProps(nextProps) { // Seleciona todas as disciplinas e adicionar no Reducer
    if (_.size(nextProps.screenProps) > 0 && (nextProps.disciplinas.data.length === 0)) {
      const firestore = nextProps.screenProps.firestore();
      if (typeof nextProps.firebase !== 'undefined' && typeof nextProps.firebase.firestore === 'undefined' && this.firebase === 0) {
        nextProps.addFirebase(nextProps.screenProps, nextProps.navigation);
        this.firebase = 1;
      }

      const gameCollection = firestore.collection('jogos'); // Adiciona os cards inciais
      gameCollection.get()
      .then(query => {
        query.forEach((q) => {
        nextProps.addDisciplinas(q.data());
        })
      }).catch(err => console.log(err));
    }
  }

  render() {
    const { width, height } = Dimensions.get('window');
    return (

      <Container>
        {
          this.props.disciplinas.data.length === 0 &&
          <Loader />
        }
        {
          this.props.disciplinas.data.length > 0 &&
          <Content>
            <SafeAreaView>
              <GridView
                itemDimension={width / 2}
                items={this.props.disciplinas.data}
                renderItem={(item, index) => (
                  <View>
                    <Card {...item} index={index} firebase={this.props.screenProps} navigate={this.props.navigation} />
                  </View>
                )}
              />
            </SafeAreaView>
          </Content>
        }
      </Container>
    );
  }
};

const mapStateToProps = state => (
  {
    disciplinas: state.disciplinas,
    firebase: state.firebase
  }
);


export default connect(mapStateToProps, { ...disciplinasActions, ...jogosActions })(Login);
