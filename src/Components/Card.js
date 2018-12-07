import React from 'react';
import { connect } from 'react-redux';
import { Image, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import { Card, CardItem, Text, Center, Body } from 'native-base';
import Dimensions from 'Dimensions';
import * as jogosActions from 'Actions/Jogos';
import * as licoesActions from 'Actions/Licoes';

const Cartao = (props) => {
  function onPressCard() { // Adiciona inicialmente dentro da collection do usuario os dados para as disciplinas
    const firestore = props.firebase.firestore();
    const fasesColletion = firestore.doc(`Fases/${props.name}`);

    fasesColletion
    .get()
    .then(query => {
      // Adiciona os jogos de acordo com o card da materia selecionada
      props.addJogos(query.data().data);
      // Verifica se deve ser iniciado as fases com score 0 ou entao pega e adiciona o score das fases da materia
      const scoreColletion = firestore.collection(props.firebase.uniqueID).doc(props.name);
      scoreColletion.get().then(data => {
        if (typeof data.data() !== 'undefined') {
           props.addScore(data.data());
        } else {
          // Cria as porcentagens de compelted para todas as fases da lição
          firestore.collection(props.firebase.uniqueID).doc(props.name).set(Array(query.data().data.length).fill({ fill: 0 }));
        }
      });
    }).catch(err => console.log(err));

    props.changeActive(props.name, props.index);
    props.navigate.push('Mission');
  }

  const { width, height } = Dimensions.get('window');

  return (
    <TouchableOpacity onPress={onPressCard}>
      <Card>
        <CardItem>
            <Body>
              <Text>{props.name}</Text>
              <Text note>{props.faixaEtaria}</Text>
            </Body>
        </CardItem>
        <CardItem cardBody>
          <Image resizeMode="stretch" source={{ uri: props.bodyImage }} style={{ width: width / 1.07, height: height / 2}}/>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
}

export default connect(null, { ...jogosActions, ...licoesActions })(Cartao)
