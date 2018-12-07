import * as DISCIPLINAS from 'Actions/Disciplinas';
import { CHANGE_ACTIVE, ADD_JOGOS } from 'Actions/Jogos';
const INITIAL_STATE = {
  title: '',
  data: [],
  isFetching: false
};

export default (state = INITIAL_STATE, action) => {
  let jogo = {};
  switch (action.type) {
    case DISCIPLINAS.ADD_DISCIPLINAS:
      if (state.data.length > 0 && (state.data.findIndex(d => d.name === action.data.name) !== -1)) {
        return state;
      }
      return { title: '', data: state.data.concat([action.data]) };
      break;

    case CHANGE_ACTIVE:
      state.data.forEach(o => o.active = false);
      return {
        isFetching: true,
        title: state.data[action.index].name,
        data: Object.assign([...state.data], { [action.index]: Object.assign({}, state.data[action.index], { active: true }) })
      };

    case ADD_JOGOS:
      return {
        ...state,
        isFetching: false
      };

    default:
      return state;
  }
};
