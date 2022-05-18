import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  render() {
    const { emailUser } = this.props;
    return (
      <header className="Header">
        <h5
          data-testid="email-field"
        >
          { emailUser }
        </h5>

        <p
          data-testid="total-field"
        >
          0
        </p>

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
});

Header.propTypes = {
  emailUser: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
