import * as LICOES from 'Actions/Licoes';
import _ from 'lodash';

const INITIAL_STATE = {
  data: [],
  actual: '',
  name: '',
  isFinished: false,
  isFetching: false,
  answers: [],
  fill: 0
};

export default (state = INITIAL_STATE, action) => {
  let jogo = {};
  let licoes = [];
  let index = -1;
  switch (action.type) {
    case LICOES.ADD_LICOES:
      licoes = [];
      _.forEach(action.data.games, (data, i) => {
        licoes.push(data);
      });

      return {
        ...state,
        actual: action.licao,
        name: action.name,
        fill: 0,
        data: licoes,
        isFetching: false,
        isFinished: false
      };

    case LICOES.LESSON_COMPLETED:
      jogo = state.answers;
      jogo[action.pos].answer = action.value;
      jogo[action.pos].answered = true;

      return {
        ...state,
        fill: (jogo.filter(l => l.answered === true).length / state.data.length) * 100,
        data: Object.assign([...state.data], { [action.pos]: Object.assign({}, state.data[action.pos], { answer: action.value, answered: true }) }),
        lastAnwered: action.pos,
        answers: jogo,
        isFinished: state.data.filter(g => g.answered === true).length === state.data.length -1
      };

    case LICOES.ADD_ANSWERS:
      _.forEach(typeof action.data.games === 'undefined' ? action.data.games : action.data, (data, i) => {
        licoes.push(...data);
      });
      return {
        ...state,
        answers: licoes,
        isFinished: false
      };

    case LICOES.IS_FETCHING_LESSONS:
      return {
        ...state,
        isFetching: true
      };

    default:
      return state;
  }
};
