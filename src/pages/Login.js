import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loginButtonDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => {
      this.validateButton();
    });
  }

  validateButton = () => {
    const { email, password } = this.state;
    const SIX = 6;
    const regexEmail = /\S+@\S+\.\S+/;
    const enable = false;
    const disable = true;
    // se for tudo true = valida o botao
    // esse .test foi feito na aula do Yuri - nosso colega - repositorio: https://github.com/yuri-rc/trybe-login/blob/main/src/App.js
    this.setState({
      loginButtonDisabled: regexEmail.test(email)
      && password.length >= SIX ? enable : disable });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { history, sendEmail } = this.props;
    const { email } = this.state;
    sendEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, loginButtonDisabled } = this.state;
    return (
      <div className="div-login">
        <form onSubmit={ this.onSubmit } className="login">
          <label htmlFor="email">
            Email
            <input
              type="email"
              value={ email }
              name="email"
              id="email"
              placeholder="Digite seu email"
              onChange={ this.handleChange }
              data-testid="email-input"
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              type="password"
              id="password"
              value={ password }
              name="password"
              placeholder="Senha acima de 6 caracteres"
              onChange={ this.handleChange }
              data-testid="password-input"
            />
          </label>
          <button
            type="submit"
            name="login-button"
            disabled={ loginButtonDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (email) => dispatch(saveEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  sendEmail: PropTypes.func.isRequired,
};
