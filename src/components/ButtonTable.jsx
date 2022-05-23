import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense } from '../actions';

class ButtonTable extends Component {
  buttonTableDelete = (expense) => {
    const { remove } = this.props;
    remove(expense.id);
  }

  render() {
    const { nameButton, dataTest, eachLine } = this.props;
    return (
      <button
        type="button"
        onClick={ () => this.buttonTableDelete(eachLine) }
        data-testid={ dataTest }
      >
        { nameButton }
      </button>
    );
  }
}

ButtonTable.propTypes = {
  nameButton: PropTypes.string.isRequired,
  dataTest: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  remove: (expense) => dispatch(removeExpense(expense)),
});

const mapStateToProps = (state) => ({
  expensesTable: state.wallet.expenses,
});

ButtonTable.propTypes = {
  remove: PropTypes.func.isRequired,
  eachLine: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonTable);
