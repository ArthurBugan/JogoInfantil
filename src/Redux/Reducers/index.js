import { combineReducers } from 'redux';
import disciplinasReducer from './disciplinas';
import firebaseReducer from './firebase';
import jogosReducer from './jogos';
import licoesReducer from './licoes';

export default combineReducers({
  disciplinas: disciplinasReducer,
  firebase: firebaseReducer,
  jogos: jogosReducer,
  licoes: licoesReducer
});
