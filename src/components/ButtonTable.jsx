import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ButtonTable extends Component {
  buttonTableDelete = () => {
    console.log('buttonDelete');
  }

  render() {
    const { nameButton, dataTest } = this.props;
    return (
      <button
        type="button"
        onClick={ this.buttonTableDelete }
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

export default ButtonTable;
