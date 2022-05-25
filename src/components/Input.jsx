import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchExpensesThunk, editExpense, sendNewExpenseAction } from '../actions';
import './Input.css';

class Input extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'dinheiro',
      tag: 'Alimentação',
    };
  }

  onChangeExpense = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  onSubmitExpenses = (event) => {
    event.preventDefault();
    const { dispatchValue } = this.props;
    dispatchValue(this.state);
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
    }));
  }

  buttonSendGlobalState = () => {
    const { editState, sendNewExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    // queremos alterar o state global, apenas 1 item da lista que recebemos de despesas.
    // sabemos qual o item, pelo id
    // criando um novo objeto
    const newExpenseEdited = {
      id: editState.id,
      value,
      description,
      currency,
      method,
      tag,
    };
    // action para alterar a despesa, exceto exchangeRates e id
    sendNewExpense(newExpenseEdited);
  }

  render() {
    const { eachCoin, editState } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const result = editState ? editState.isOnEditMode : false;
    // { editState ? 'Formulario Edicao' : 'Formulario Inlcusao'}
    return (
      <form className="form">
        <label htmlFor="value-input">
          Valor
          <input
          // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number
            className="value-input"
            id="value-input"
            type="number"
            value={ value }
            name="value"
            // step é que aceita numeros com até 2 digitos
            step="0.01"
            placeholder="0,01"
            required
            data-testid="value-input"
            onChange={ this.onChangeExpense }
          />
        </label>

        <label htmlFor="description-input">
          Descrição da Despesa
          <input
            type="text"
            id="description-input"
            name="description"
            value={ description }
            placeholder="Descreva a Despesa"
            data-testid="description-input"
            onChange={ this.onChangeExpense }
          />
        </label>

        <label htmlFor="moeda">
          Moeda
          <select
            onChange={ this.onChangeExpense }
            id="moeda"
            name="currency"
            value={ currency }
            data-testid="currency-input"
          >
            {
              // pego do meu store as informações das moedas e faço o map
              eachCoin.map((coin, index) => (
                <option
                  key={ index }
                >
                  {coin}
                </option>
              ))
            }
          </select>
        </label>

        <label htmlFor="method-input">
          Forma de pagamento
          <select
            id="method-input"
            name="method"
            value={ method }
            data-testid="method-input"
            onChange={ this.onChangeExpense }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag-input">
          Escolha a categoria
          <select
            name="tag"
            value={ tag }
            id="tag-input"
            data-testid="tag-input"
            onChange={ this.onChangeExpense }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        {
          result ? (
            <button
              type="button"
              onClick={ this.buttonSendGlobalState }
            >
              Editar despesa
            </button>
          ) : (
            <button
              type="button"
              name="add-expense"
              onClick={ this.onSubmitExpenses }
            >
              Adicionar despesa
            </button>
          )
        }

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  eachCoin: state.wallet.currencies,
  editState: state.wallet.expenseEdit,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchValue: (expense) => dispatch(fetchExpensesThunk(expense)),
  edit: (expense) => dispatch(editExpense(expense)),
  sendNewExpense: (newObj) => dispatch(sendNewExpenseAction(newObj)),

});

Input.propTypes = {
  // https://pt-br.reactjs.org/docs/typechecking-with-proptypes.html
  eachCoin: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatchValue: PropTypes.func.isRequired,
  editState: PropTypes.string.isRequired,
  sendNewExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
