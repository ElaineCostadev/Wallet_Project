import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

const TWO = 2;
class Header extends Component {
  // mentoria Carlos - expenses é meu objeto inteiro
  calculateExpense = (expenses) => {
    const result = expenses.reduce((total, eachExpense) => {
      const expenseValue = eachExpense.value; // peguei a chave value do meu objeto digitado
      // eachExpense.exchangeRates.ask - entro na chave exchange e entro na ask
      // [eachExpense.currency] é a chave currency do meu objeto digitado - é eu BRL, ou USD, ou EUR...
      const quotation = eachExpense.exchangeRates[eachExpense.currency].ask;
      // salvo na variavel - a conversao - multiplico o value digitado * cotação encontrada
      const conversion = expenseValue * quotation;
      // pego o valor convertido e somo com o total anterior
      return conversion + total;
    }, 0); // inicio o calculo com zero - o valor do total é 0
    return result.toFixed(TWO);
  }

  render() {
    const { emailUser, askTotal } = this.props;

    return (
      <header className="Header">
        <h5
          data-testid="email-field"
        >
          { emailUser }
        </h5>

        <h4
          data-testid="total-field"
        >
          { this.calculateExpense(askTotal) }
        </h4>

        <p
          data-testid="header-currency-field"
        >
          BRL
        </p>

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
  askTotal: state.wallet.expenses,
});

Header.propTypes = {
  emailUser: PropTypes.string.isRequired,
  askTotal: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Header);
