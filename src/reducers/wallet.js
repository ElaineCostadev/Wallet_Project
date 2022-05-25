import {
  SET_CURRENCIES,
  SET_FORM, REMOVE_EXPENSE,
  EDIT_EXPENSE,
  SEND_NEW_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  expenseEdit: { isOnEditMode: false, id: 0 },
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

  case REMOVE_EXPENSE:
    return { ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload) };

  case EDIT_EXPENSE:
    return { ...state,
      expenseEdit: { isOnEditMode: action.payload.edit, id: action.payload.id },
    };
  case SEND_NEW_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((eachExpense) => {
        // procura a despesa pelo ID
        if (eachExpense.id === state.expenseEdit.id) {
          // entrega o que o usuario alterou
          return { ...action.payload, exchangeRates: eachExpense.exchangeRates };
        }
        return eachExpense;
      }),
      // volta ao normal
      expenseEdit: { isOnEditMode: false, id: 0 },
    };

  default:
    return state;
  }
}

export default walletReducer;
