import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchExpensesThunk } from '../actions';
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

  render() {
    const { eachCoin } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form onSubmit={ this.onSubmitExpenses }>
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

        <button
          type="submit"
          name="add-expense"
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  eachCoin: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchValue: (expense) => dispatch(fetchExpensesThunk(expense)),
});

Input.propTypes = {
  // https://pt-br.reactjs.org/docs/typechecking-with-proptypes.html
  eachCoin: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatchValue: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
