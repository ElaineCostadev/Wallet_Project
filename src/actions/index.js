export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const SET_FORM = 'SET_FORM';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SEND_NEW_EXPENSE = 'SEND_NEW_EXPENSE';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

export const setCurrencies = (initialCoin) => ({
  type: SET_CURRENCIES,
  payload: initialCoin,
});

export function fetchCoinsThunk() {
  return async (dispatch) => {
    try {
      const url = 'https://economia.awesomeapi.com.br/json/all';
      const apiResponse = await fetch(url);
      const result = await apiResponse.json();
      // peguei os resultado que são objetos
      // transformo todas as informações em array
      const code = Object.entries(result);
      // https://www.horadecodar.com.br/2020/01/28/javascript-como-remover-um-elemento-de-um-array/
      // retiro a informação do USDT que nao quero - indice 1, apenas 1 elemento
      code.splice(1, 1);
      // faco um map para rodar todos os elementos de indice 1 do array para entrar nos detalhes e conseguir pegar o code.
      const codeCoin = code.map((element) => (element[1].code));
      // const codeCoin = code.map((element) => (element[1]));
      dispatch(setCurrencies(codeCoin));
    } catch (error) {
      console.log('Deu erro no fetchCoinsThunk');
    }
  };
}

export const setForm = (expenses) => ({
  type: SET_FORM,
  payload: expenses,
});

export function fetchExpensesThunk(expenses) {
  return async (dispatch) => {
    try {
      const url = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(url);
      const result = await response.json();
      dispatch(setForm({ ...expenses, exchangeRates: result }));
    } catch (error) {
      console.log('Deu erro no fetchExpensesThunk');
    }
  };
}

export const removeExpense = (expense) => ({
  type: REMOVE_EXPENSE,
  payload: expense,
});

export const editExpense = (edit, id) => ({
  type: EDIT_EXPENSE,
  payload: { edit, id },
});

export const sendNewExpenseAction = (obj) => ({
  type: SEND_NEW_EXPENSE,
  payload: obj,
});
