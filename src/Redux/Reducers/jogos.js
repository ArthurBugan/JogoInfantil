import * as JOGOS from 'Actions/Jogos';

const INITIAL_STATE = {
  data: []
};

export default (state = INITIAL_STATE, action) => {
  let jogos = [];
  switch (action.type) {
    case JOGOS.ADD_JOGOS:
      return {
        data: action.data
      };

    case JOGOS.ADD_SCORE:
      state.data.forEach((j, i) => {
        j.fill = action.jogos[i].fill;
        jogos.push(j)
      });
      return {
        data: jogos
      };

    default:
      return state;
  }
};
