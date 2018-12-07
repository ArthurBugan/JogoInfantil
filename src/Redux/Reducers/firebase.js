import { ADD_FIREBASE } from 'Actions/Jogos';
const INITIAL_STATE = {
  firebase: {},
  navigation: {}
};

export default (state = INITIAL_STATE, action) => {
  let jogo = {};
  switch (action.type) {

    case ADD_FIREBASE:
      return {
        firebase: action.firebase,
        navigation: action.navigation
      };

    default:
      return state;
  }
};
