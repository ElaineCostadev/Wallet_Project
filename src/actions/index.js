export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SET_CURRENCIES = 'SET_CURRENCIES';

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
      console.log('Deu erro');
    }
  };
};
