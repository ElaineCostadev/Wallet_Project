import { SET_CURRENCIES, SET_FORM } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload };
  case SET_FORM:
    return { ...state,
      // preciso de um spread sempre para salvar o anterior e tbm acrescentar o novo
      // Mentoria ajuda do Pessini
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
}

export default walletReducer;
