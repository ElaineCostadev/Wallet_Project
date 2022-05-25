import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense, editExpense } from '../actions';

class ButtonTable extends Component {
  buttonTableDelete = (expense) => {
    const { remove } = this.props;
    remove(expense);
  }

  buttonTableEdit = (expense) => {
    console.log('botao editar');
    const { edit } = this.props;
    edit(true, expense.id);
  // esse botao precisa avisar que é para editar - ele muda o state expenseEdit do reducer para true?
  // crio um novo objeto aqui ou no Input?
  // e entao, se estiver true, uso o input para edição?
  // dispacho o novo objeto
  }

  render() {
    const { nameButton, eachLine } = this.props;
    return (
      <>
        <button
          type="button"
          data-testid="edit-btn"
          onClick={ () => this.buttonTableEdit(eachLine) }
        >
          Editar
        </button>

        <button
          type="button"
          onClick={ () => this.buttonTableDelete(eachLine.id) }
          data-testid="delete-btn"
        >
          { nameButton }
        </button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  remove: (expense) => dispatch(removeExpense(expense)),
  edit: (expense, id) => dispatch(editExpense(expense, id)),
});

const mapStateToProps = (state) => ({
  expensesTable: state.wallet.expenses,
});

ButtonTable.propTypes = {
  remove: PropTypes.func.isRequired,
  eachLine: PropTypes.arrayOf(PropTypes.shape).isRequired,
  nameButton: PropTypes.string.isRequired,
  edit: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonTable);
