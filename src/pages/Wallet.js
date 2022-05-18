import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchCoinsThunk } from '../actions';
import Input from '../components/Input';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCoins } = this.props;
    fetchCoins();
  }

  render() {
    return (
      <div>
        <Header />
        Wallet pagina principal
        <Input />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCoins: () => dispatch(fetchCoinsThunk()),
});

Wallet.propTypes = {
  fetchCoins: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
