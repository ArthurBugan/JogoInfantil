import React, { Component } from 'react';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import { connect } from 'react-redux';
import { Thumbnail, Toast, Input, Item } from 'native-base';
import _ from 'lodash';
import Dimensions from 'Dimensions';
import ImageFull from 'react-native-scalable-image';
import Loader from 'Components/Loader';
import { isValidArray } from 'Util/isValidVariable';
import GameFinished from 'Components/GameFinished';
import * as licoesActions from 'Actions/Licoes';
import * as jogosActions from 'Actions/Jogos';
import {
  View,
  Image,
  Button,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from 'react-native';
import Tts from 'react-native-tts';
import SoundPlayer from 'react-native-sound-player'
import Emoji from 'react-native-emoji';

let timePortugues;
const talk = (title) => {
  clearTimeout(timePortugues);
  timePortugues = setTimeout(() => {
    Tts.setDefaultLanguage('pt-BR');
    Tts.getInitStatus().then(() => {
      Tts.speak(title);
    });
	}, 1500);
};

let timerIngles;
const talkEnglish = (sound) => {
  clearTimeout(timerIngles);
  timerIngles = setTimeout(() => {
    Tts.setDefaultLanguage('en');
    Tts.getInitStatus().then(() => {
      Tts.speak(sound);
    });
	}, 1500);
};

// Layout para fase com imagens nas alternativas
const GameText = (props) => {
  const { width, height } = Dimensions.get('window');
  return (
    <View style={{ display: 'flex', width, backgroundColor:'transparent', justifyContent: 'center', textAlignVertical: 'top', flexDirection: 'row', paddingTop: 30 }}>
      {
        props.disciplina === 'Inglês' &&
        <TouchableWithoutFeedback onPress={() => talkEnglish(props.sound)} >
          <Emoji name="sound" style={{ color: '#333', zIndex: 100000000, position: 'absolute', top: 20, left: width * 0.85, height, width: 50, fontSize: 30 }} />
        </TouchableWithoutFeedback>
      }
      <View>
        <View style={{ display: 'flex', backgroundColor:'transparent', justifyContent: 'center', alignItems: 'center', height: height * 0.4 }}>
          <ImageFull
            height={height * 0.4} // height will be calculated automatically
            source={{ uri: props.bodyImage }}
          />
        </View>
        <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, height: height * 0.6 }}>
          <TouchableWithoutFeedback onPress={() => talk(props.title)} >
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, color: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{props.title} {''}{''}<Emoji name="sound" style={{ fontSize: 30 }} /></Text>
            </View>
          </TouchableWithoutFeedback>
          <View>
            <RadioGroup
              selectedIndex={typeof props.answers !== 'undefined' && typeof props.answers.answer === 'number' ? props.answers.answer : null}
              onSelect={(index, value) => props.onSelect(index, value, props.pos, props.data)}
              style={{ display: 'flex', flexDirection: 'column' }}
              color='#ab54f2'
            >
              {
                isValidArray(props.data) &&
                props.data.map(d => (
                <RadioButton disabled={typeof props.answers !== 'undefined' && typeof props.answers.answer === 'number'} value={d.value}>
                  <Text style={{ color: '#333' }}>
                    {d.label}{''}{''}
                    {
                      props.disciplina === 'Inglês' &&
                      <Emoji name="sound" style={{ fontSize: 15 }} />
                    }
                  </Text>
                </RadioButton>
              ))}
            </RadioGroup>
          </View>
          <View>
            <Button
              onPress={() => {
                if (typeof props.answers !== 'undefined' && typeof props.answers.answer === 'number') {
                  successSound();
                  Toast.show({
                    text: 'Questão ja respondida',
                    type: 'success',
                    position: 'top'
                  });
                } else if (props.correctAnswer !== props.state[`lesson${props.pos}`]) {
                  errorSound();
                  Toast.show({
                    text: 'Resposta Errada',
                    type: 'danger',
                    position: 'top'
                  });
                } else {
                  successSound();
                  Toast.show({
                    text: 'Resposta Certa',
                    type: 'success',
                    position: 'top'
                  });
                  props.lessonCompleted(props.pos, props.state[`lesson${props.pos}`])
                }
              }}
              color="#295db2"
              title={props.count === 1 ? 'Finalizar' : 'Responder'}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
// Fim

// Layout para fase com imagens nas alternativas
const GameImage = (props) => {
  const { width, height } = Dimensions.get('window');

  return (
    <View style={{ width, display: 'flex', backgroundColor:'transparent', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingTop: 30 }}>
      <View>
        <View style={{ padding: 25, display: 'flex', backgroundColor:'transparent', justifyContent: 'center', alignItems: 'center', height: height * 0.2 }}>
          <TouchableWithoutFeedback onPress={() => talk(props.title)} >
            <Text style={{ fontSize: 20, color: '#333' }}>{props.title}<Emoji name="sound" style={{ fontSize: 30 }} /></Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, height: height * 0.8 }}>
          <View>
            <RadioGroup
              selectedIndex={typeof props.answers !== 'undefined' && typeof props.answers.answer === 'number' ? props.answers.answer : null}
              onSelect={(index, value) => props.onSelect(index, value, props.pos, props.data)}
              style={{ display: 'flex', flexDirection: 'column' }}
              color='#ab54f2'
            >
              {
                isValidArray(props.data) &&
                props.data.map(d => (
                <RadioButton disabled={typeof props.answers !== 'undefined' && typeof props.answers.answer === 'number'} value={d.value}>
                  <ImageFull
                    width={width * 0.7} // height will be calculated automatically
                    source={{ uri: d.label }}
                  />
                </RadioButton>
              ))}
            </RadioGroup>
          </View>
          <View>
            <Button
              onPress={() => {
                if (typeof props.answers !== 'undefined' && typeof props.answers.answer === 'number') {
                  successSound();
                  Toast.show({
                    text: 'Questão ja respondida',
                    type: 'success',
                    position: 'top'
                  });
                } else if (props.correctAnswer !== props.state[`lesson${props.pos}`]) {
                  errorSound();
                  Toast.show({
                    text: 'Resposta Errada',
                    type: 'danger',
                    position: 'top'
                  });
                } else {
                  successSound();
                  Toast.show({
                    text: 'Resposta Certa',
                    type: 'success',
                    position: 'top'
                  });
                  props.lessonCompleted(props.pos, props.state[`lesson${props.pos}`])
                }
              }}
              color="#295db2"
              title={props.count === 1 ? 'Finalizar' : 'Responder'}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
// Fim

// Layout para fase com Input para digitar uma resposta
const GameDigitation = (props) => {
  const { width, height } = Dimensions.get('window');
  return (
    <View style={{ width, display: 'flex', backgroundColor:'transparent', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
      <View>
        {
          props.disciplina === 'Inglês' &&
          <View style={{ position: 'absolute' }}>
            <TouchableWithoutFeedback style={{ height: 50, width: 50 }} onPress={() => talkEnglish(props.sound || props.correctAnswer)} >
              <Emoji name="sound" style={{ color: '#333', zIndex: 100000000, top: 20, left: width * 0.75, height, width: 50, fontSize: 30 }} />
            </TouchableWithoutFeedback>
          </View>
        }
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: height * 0.4, paddingTop: 20 }}>
          <ImageFull
            height={height * 0.4}
            source={{ uri: props.bodyImage }}
          />
        </View>
        <View style={{ height: height * 0.4, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column', paddingTop: 20, paddingRight: 20, paddingLeft: 20 }}>
          <View>
            <TouchableWithoutFeedback onPress={() => talk(props.title)}>
              <Text style={{ fontSize: 20, paddingBottom: 20, color: '#333' }}>
                {props.title}
                <Emoji name="sound" style={{ fontSize: 30 }} />
              </Text>
            </TouchableWithoutFeedback>
            <Item regular>
             <Input onChangeText={value => props.onChangeText(value, props.pos)} />
           </Item>
          </View>
          <View style={{ paddingTop: 10, width: width * 0.8 }}>
            <Button
              onPress={() => {
                if (typeof props.answers !== 'undefined' && typeof props.answers.answer === 'number') {
                  successSound();
                  Toast.show({
                    text: 'Questão ja respondida',
                    type: 'success',
                    position: 'top'
                  });
                } else if (typeof props.state[`lesson${props.pos}`] === 'undefined' || (typeof props.state[`lesson${props.pos}`] !== 'undefined' && props.state[`lesson${props.pos}`] === '' && props.correctAnswer.toLowerCase() !== props.state[`lesson${props.pos}`].toLowerCase())) {
                  errorSound();
                  Toast.show({
                    text: 'Resposta Errada',
                    type: 'danger',
                    position: 'top'
                  });
                } else if (props.correctAnswer.toLowerCase() === props.state[`lesson${props.pos}`].toLowerCase()) {
                  successSound();
                  Toast.show({
                    text: 'Resposta Certa',
                    type: 'success',
                    position: 'top'
                  });
                  props.lessonCompleted(props.pos, props.state[`lesson${props.pos}`])
                }
              }}
              color="#295db2"
              style={{ width: width * 0.8 }}
              title={props.count === 1 ? 'Finalizar' : 'Responder'}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
// Fim

const successSound = () => {
  try {
    // play the file tone.mp3
    SoundPlayer.playSoundFile('vitoria', 'mp3')
    // or play from url
  } catch (e) {
    console.log(`cannot play the sound file`, e)
  }
}

const errorSound = () => {
  try {
    // play the file tone.mp3
    SoundPlayer.playSoundFile('erro', 'mp3')
    // or play from url
  } catch (e) {
    console.log(`cannot play the sound file`, e)
  }
}

class Licoes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: []
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.renderDotIndicator = this.renderDotIndicator.bind(this);
  }

  handleSelect(index, value, pos, data) {
    if (this.props.title === 'Inglês') {
      talkEnglish(data[index].sound || data[index].label);
    }
    this.setState({ [`lesson${pos}`]: index });
  }

  onChangeText(value, pos) {
    this.setState({ [`lesson${pos}`]: value });
  }

  renderDotIndicator() {
    return <PagerDotIndicator pageCount={this.props.licoes.filter(g => typeof g.visible === 'undefined' || g.visible === true).length} />;
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.licoes !== 'undefined') {
      let answers = [];

      if (typeof nextProps.answers !== 'undefined' && nextProps.actual.length !== 1) {
        _.forEach(nextProps.answers, a => { // Pega as lições que ja foram respondidas pelo usuario
          if (a.title === nextProps.actual) {
            this.setState({ answers: a.licoes });
          }
        });
      }

      if (typeof nextProps.licoes !== 'undefined' && isValidArray(nextProps.licoes)) {
        if (this.props.licoes.filter(g => g.answered !== true).length !== nextProps.licoes.filter(g => g.answered !== true).length) {
          if (isValidArray(nextProps.answers)) {
            if (nextProps.fill !== this.props.fill) {
              const licoesCollection = nextProps.firebase.firestore().doc(`Licoes/${nextProps.name}`);
              licoesCollection
              .get()
              .then((data) => {
                let arr = [];
                _.forEach(data.data(), (d, i) => {
                  arr.push(i);
                });

                _.forEach(arr, (a, j) => {
                  if (a === nextProps.actual) {
                    nextProps
                    .firebase
                    .firestore()
                    .collection(nextProps.firebase.uniqueID)
                    .doc(nextProps.name)
                    .get()
                    .then(result => {
                      const resultado = result.data();
                      resultado[j] = { fill: nextProps.fill };
                      nextProps.addScore(resultado);
                      nextProps
                      .firebase
                      .firestore()
                      .collection(nextProps.firebase.uniqueID)
                      .doc(nextProps.name)
                      .set(resultado);
                    });
                  }
                });
              });
              // firestore.collection(props.firebase.uniqueID).doc(props.name).set();
            }
            const firestore = nextProps.firebase.firestore().collection(nextProps.firebase.uniqueID).doc(nextProps.name).collection(nextProps.actual).doc('game');
            firestore.set({ games: nextProps.answers });
          }
          // nextProps.firebase.firestore().collection(this.props.firebase.uniqueID).doc(this.props.name).set();
        }
      }
    }

    // if (nextProps.isFinished === true) {
    //   nextProps.navigation.push('Home');
    // }
  }

  render() {
    let count = 0;
    // Pega as dimensões de altura e largura do dispositivo
    const { width, height } = Dimensions.get('window');

    // Enquanto não recebe a resposta do servidor, mostra o loader
    if (typeof this.props.licoes === 'undefined' || this.props.isFetching === true) {
      return (<Loader />);
    }

    return (
            <View style={{ flex:1, height, width, backgroundColor: '#dee8f7' }}>
              {
                this.props.isFinished === true &&
                <GameFinished />
              }
              {
                typeof this.props.licoes !== 'undefined' && this.props.isFinished === false &&
                <IndicatorViewPager
                  style={{ height: height, width, flex: 1, display: 'flex', justifyContent: 'center' }}
                  indicator={this.renderDotIndicator()}
                  >
                    {
                      isValidArray(this.props.licoes) &&
                      this.props.licoes.map((g, i) => {
                        if (typeof g.visible === 'undefined' && typeof g.optionType === 'undefined') {
                          return (
                            <GameText
                              {...g}
                              pos={i}
                              firebase={this.props.firebase}
                              correctAnswer={this.props.licoes[i].correctAnswer}
                              count={count}
                              answers={this.state.answers[i]}
                              height={height}
                              state={this.state}
                              lessonCompleted={this.props.lessonCompleted}
                              onSelect={this.handleSelect}
                            />);
                        }

                        if (typeof g.visible === 'undefined' && typeof g.optionType !== 'undefined') {
                          switch (g.optionType) {
                            case 'text':
                              return (
                                <GameText
                                  {...g}
                                  pos={i}
                                  firebase={this.props.firebase}
                                  correctAnswer={this.props.licoes[i].correctAnswer}
                                  count={count}
                                  disciplina={this.props.title}
                                  answers={this.state.answers[i]}
                                  height={height}
                                  state={this.state}
                                  lessonCompleted={this.props.lessonCompleted}
                                  onSelect={this.handleSelect}
                                />);
                              break;

                            case 'image':
                              return (
                                <GameImage
                                  {...g}
                                  pos={i}
                                  firebase={this.props.firebase}
                                  correctAnswer={this.props.licoes[i].correctAnswer}
                                  count={count}
                                  disciplina={this.props.title}
                                  answers={this.state.answers[i]}
                                  height={height}
                                  state={this.state}
                                  lessonCompleted={this.props.lessonCompleted}
                                  onSelect={this.handleSelect}
                                />);
                              break;

                            case 'digitation':
                              return (
                                <GameDigitation
                                  {...g}
                                  pos={i}
                                  firebase={this.props.firebase}
                                  correctAnswer={this.props.licoes[i].correctAnswer}
                                  count={count}
                                  disciplina={this.props.title}
                                  answers={this.state.answers[i]}
                                  height={height}
                                  state={this.state}
                                  lessonCompleted={this.props.lessonCompleted}
                                  onChangeText={this.onChangeText}
                                />);
                              break;

                            default:
                            return <Text>Teste</Text>
                          }
                        }
                      })
                    }
                  </IndicatorViewPager>
              }
            </View>
        );
  }
}

const mapStateToProps = state => (
  {
    licoes: state.licoes.data,
    isFetching: state.licoes.isFetching,
    fill: state.licoes.fill,
    lastAnwered: state.licoes.lastAnwered,
    title: state.disciplinas.title,
    name: state.licoes.name,
    actual: state.licoes.actual,
    answers: state.licoes.answers,
    isFinished: state.licoes.isFinished,
    firebase: state.firebase.firebase,
    navigation: state.firebase.navigation
  }
);

export default connect(mapStateToProps, { ...licoesActions, ...jogosActions })(Licoes)
