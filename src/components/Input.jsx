import React, { Component } from 'react';
import './Input.css';

class Input extends Component {
  render() {
    /* posso tentar fazer um map para colocar as moedas aqui nas options
    posso pegar as informações do store e colocar aqui tbm
    */
    return (
      <form>
        <label htmlFor="input-value">
          Valor
          <input
          // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number
            className="input-value"
            placeholder="0,01"
            id="input-value"
            type="number"
            step="0.01"
            inputMode="numeric"
            data-testid="value-input"
            required
          />
        </label>
        <label htmlFor="input-expense">
          Descrição da Despesa
          <input
            type="text"
            id="input-expense"
            name="input-expense"
            placeholder="Descreva a Despesa"
            data-testid="description-input"
          />
        </label>

        <label htmlFor="Moeda">
          Selecionar a Moeda
          {/* <select /> */}
        </label>

        <label htmlFor="input-payment">
          Forma de pagamento
          <select
            id="input-payment"
            data-testid="method-input"
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="cartão de crédito" selected>Cartão de Crédito</option>
            <option value="cartão de débito">Cartão de Débito</option>
          </select>
        </label>

        <label htmlFor="input-category-expense">
          Escolha a categoria
          <select
            name="input-category-expense"
            id="input-category-expense"
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

export default Input;
