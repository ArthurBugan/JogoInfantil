import React, { Component } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Button
} from 'react-native';
import _ from 'lodash';
import { isValidObject } from 'Util/isValidVariable';
import PopupDialog, { FadeAnimation } from 'react-native-popup-dialog';
import { connect } from 'react-redux';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Container, Content, Thumbnail, Text  } from 'native-base';
import * as licoesActions from 'Actions/Licoes';
import Dimensions from 'Dimensions';

const Triangle = (props) => (
  <View style={{
    width: 0,
    height: 0,
    transform: [
      { rotate: props.left === true ? '90deg' : props.right ? '-90deg' : props.up === true ? '0deg' : props.down === true ? '180deg' : '0deg' }
    ],
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#99d4ff'
  }} />
);

class Fase extends Component {
  constructor(props) {
    super(props);
    this.press = this.press.bind(this);
    this.initiateLevel = this.initiateLevel.bind(this);
  }

  press() {
    this.props.handlePopUp(this.props.showDialog === this.props.chave ? '' : this.props.chave);
  }

  initiateLevel() {
    this.props.isFetchingLessons();
    const firestore = this.props.firebase.firestore();
    // Todas as lições da fase que o usuario entrou
    const licoesCollection = firestore.doc(`Licoes/${this.props.name}`);
    // Documento do jogador de acordo com  a fase clicada
    const playerDocument =  firestore.collection(this.props.firebase.uniqueID).doc(this.props.name).collection(this.props.title).doc('game');

    licoesCollection.get()
    .then(query => {
      _.forEach(query.data(), (f, i) => {
        playerDocument
        .get()
        .then((player) => {
          if (!isValidObject(player.data()) && (this.props.title === i)) {
            firestore
            .collection(this.props.firebase.uniqueID)
            .doc(this.props.name)
            .collection(i)
            .doc('game')
            .set(f)
            .then(() => {
              playerDocument
              .get()
              .then((returned) => {
                this.props.addAnswers(returned.data());
                this.props.addLicoes(query.data()[i], this.props.title, this.props.name);
              });
            });
          } else if (isValidObject(player.data()) && (this.props.title === i)) {
            this.props.addLicoes(query.data()[i], this.props.title, this.props.name);
            this.props.addAnswers(player.data());
          }
        })
      })
    }).catch(err => console.log(err));

      this.props.handlePopUp('');
      this.props.push('Licoes');
  }

  render() {
    const { width, height } = Dimensions.get('window');
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: 20 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <AnimatedCircularProgress
            size={95}
            width={7}
            fill={this.props.fill}
            tintColor="#e89420"
            backgroundColor="#d1d1d1">
            {
              (fill) => (
                <TouchableWithoutFeedback onPress={this.press}>
                  <Thumbnail large source={{ uri: this.props.bodyImage }} />
                </TouchableWithoutFeedback>
              )
            }
          </AnimatedCircularProgress>
          <Text style={{ fontSize: 12 }}>{this.props.title}</Text>
          <View style={
            { flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: typeof this.props.left === 'undefined' && typeof this.props.right === 'undefined' ? 'column' : 'row',
              position: 'absolute',
              top: typeof this.props.left !== 'undefined' || typeof this.props.right !== 'undefined' ? 0 : this.props.isLast === true ? -80 : 80,
              left: typeof this.props.left !== 'undefined' ? -210 : void 0,
              right: this.props.right ? -210 : void 0,
              width: width / 2,
              height: 80
            }
          }>
            {
              this.props.showDialog === this.props.chave &&
              <>
                {
                  (typeof this.props.right !== 'undefined') &&
                  <Triangle right />
                }
                {
                  this.props.isLast === false &&
                  <Triangle up />
                }
                <PopupDialog
                  containerStyle={{ zIndex: 10, position: 'relative', width: '100%', height: '100%', paddingTop: 40, paddingLeft: 110, paddingRight: 110, paddingBottom: 40 }}
                  show={this.props.showDialog === this.props.chave}
                  dialogAnimation={new FadeAnimation()}
                  >
                    <View style={{ flex: 1, zIndex: 12, elevation: 12, backgroundColor: '#99d4ff', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                      <Text style={{ display: 'flex', color: '#000', paddingBottom: 10, flexWrap: 'wrap', fontSize: 8 }}>{this.props.subTitle}</Text>
                      <Button onPress={this.initiateLevel} color="#000" title="Começar" />
                    </View>
                  </PopupDialog>
                  {
                    typeof this.props.left !== 'undefined' &&
                    <Triangle left={this.props.left}/>
                  }
                  {
                    this.props.isLast === true &&
                    <Triangle down />
                  }
              </>
            }
          </View>
        </View>
      </View>
    );
  }
}

export default connect(null, licoesActions)(Fase);
