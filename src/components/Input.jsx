import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Input.css';

class Input extends Component {
  render() {
    const { eachCoin } = this.props;
    return (
      <form>
        <label htmlFor="value-input">
          Valor
          <input
          // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number
            className="value-input"
            placeholder="0,01"
            id="value-input"
            type="number"
            step="0.01"
            inputMode="numeric"
            data-testid="value-input"
            required
          />
        </label>
        <label htmlFor="description-input">
          Descrição da Despesa
          <input
            type="text"
            id="description-input"
            name="description-input"
            placeholder="Descreva a Despesa"
            data-testid="description-input"
          />
        </label>

        <label htmlFor="moeda">
          Moeda
          <select
            id="moeda"
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
            data-testid="method-input"
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="cartão de crédito" selected>Cartão de crédito</option>
            <option value="cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag-input">
          Escolha a categoria
          <select
            name="tag-input"
            id="tag-input"
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  eachCoin: state.wallet.currencies,
});

Input.propTypes = {
  eachCoin: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Input);
