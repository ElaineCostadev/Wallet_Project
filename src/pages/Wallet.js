import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchCoinsThunk } from '../actions';
import Input from '../components/Input';
import ButtonTable from '../components/ButtonTable';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCoins } = this.props;
    fetchCoins();
  }

  render() {
    const { expensesWallet } = this.props;
    const headerTable = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];

    return (
      <div>
        <Header />
        Wallet pagina principal
        <Input />

        <table>
          <thead>
            <tr>
              {
                headerTable.map((eachHeader) => (
                  <th
                    scope="col"
                    key={ eachHeader }
                  >
                    { eachHeader }
                  </th>
                ))
              }
            </tr>
          </thead>

          <tboyd>

            {expensesWallet.map((eachLine) => (
              <tr
                key={ eachLine.id }
              >
                <td>{eachLine.description}</td>
                <td>{eachLine.tag}</td>
                <td>{eachLine.method}</td>
                <td>{Number(eachLine.value).toFixed(2)}</td>
                <td>{eachLine.exchangeRates[eachLine.currency].name}</td>
                <td>
                  {Number(eachLine.exchangeRates[eachLine.currency].ask)
                    .toFixed(2)}
                </td>
                <td>
                  {(Number(eachLine.value)
                  * Number(eachLine.exchangeRates[eachLine.currency].ask))
                    .toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <ButtonTable
                    nameButton="Excluir"
                    dataTest="delete-btn"
                    eachLine={ eachLine }
                  />
                </td>
              </tr>
            ))}

          </tboyd>
        </table>
      </div>
    );
  }
}
// <ButtonTable nameButton="Editar despesa" dataTest="edit-btn" />

const mapDispatchToProps = (dispatch) => ({
  fetchCoins: () => dispatch(fetchCoinsThunk()),
});

const mapStateToProps = (state) => ({
  expensesWallet: state.wallet.expenses,
});

Wallet.propTypes = {
  fetchCoins: PropTypes.func.isRequired,
  expensesWallet: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
