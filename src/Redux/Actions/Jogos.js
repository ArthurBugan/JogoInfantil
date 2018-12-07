export const ADD_JOGOS = 'ADD_JOGOS';
export const ADD_SCORE = 'ADD_SCORE';
export const CHANGE_ACTIVE = 'CHANGE_ACTIVE';
export const ADD_FIREBASE = 'ADD_FIREBASE';

export const addJogos = data => (
  {
    type: 'ADD_JOGOS',
    data
  }
);


export const changeActive = (data, index) => (
  {
    type: 'CHANGE_ACTIVE',
    data,
    index
  }
);

export const addFirebase = (firebase, navigation) => (
  {
    type: 'ADD_FIREBASE',
    firebase,
    navigation
  }
)

export const addScore = (jogos) => (
  {
    type: 'ADD_SCORE',
    jogos
  }
)
