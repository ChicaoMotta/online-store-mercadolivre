import PropTypes from 'prop-types';
import React, { Component } from 'react';
import GoToCart from '../components/GoToCart';

export default class Checkout extends Component {
  state = {
    itens: [],
    fullname: '',
    email: '',
    phone: '',
    cep: '',
    cpf: '',
    address: '',
    payment: '',
    valid: false,
    clicked: false,
  };

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    this.setState({ itens: [...cart] });
  }

  handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validate);
  };

  validate = () => {
    const { payment, fullname, email, phone, cep, address, cpf } = this.state;
    const validate1 = payment.length > 0;
    const validate2 = fullname.length > 0;
    const validate3 = email.length > 0;
    const validate4 = phone.length > 0;
    const validate5 = cep.length > 0;
    const validate6 = address.length > 0;
    const validate7 = cpf.length > 0;
    this.setState({
      valid: (validate1
        && validate2 && validate3 && validate4 && validate5 && validate6 && validate7) });
  };

  checkout = (evt) => {
    evt.preventDefault();
    const { valid } = this.state;
    const { history } = this.props;
    this.setState({ clicked: true });
    if (valid) {
      localStorage.setItem('cart', JSON.stringify([]));
      history.push('/');
    }
  };

  render() {
    const {
      itens, fullname, email, phone, cep, address, clicked, valid, cpf } = this.state;
    const { history } = this.props;
    return (
      <div>
        <GoToCart history={ history } />
        <div>
          <h3>Verifique se todos os itens da sua compra estão corretos:</h3>
          {itens.length === 0
            ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            : (
              <ol>
                {itens.map(({ id, thumbnail, title, quantity, price }) => (
                  <li key={ id } className="checkout-list">
                    <h3>
                      {title}
                    </h3>
                    <p>{`${quantity} unidade${quantity > 1 ? 's' : ''}`}</p>
                    <img src={ thumbnail } alt={ title } />
                    <p>
                      Total: R$
                      { (quantity * price).toFixed(2) }
                    </p>
                  </li>))}
              </ol>)}
        </div>
        <form>
          <label>
            Nome Completo:
            <input
              name="fullname"
              type="text"
              data-testid="checkout-fullname"
              value={ fullname }
              onChange={ this.handleChange }
            />
          </label>
          <label>
            Email:
            <input
              name="email"
              type="text"
              data-testid="checkout-email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label>
            CPF:
            <input
              name="cpf"
              type="text"
              data-testid="checkout-cpf"
              value={ cpf }
              onChange={ this.handleChange }
            />
          </label>
          <label>
            Telefone:
            <input
              name="phone"
              type="text"
              data-testid="checkout-phone"
              value={ phone }
              onChange={ this.handleChange }
            />
          </label>
          <label>
            CEP:
            <input
              name="cep"
              type="text"
              data-testid="checkout-cep"
              value={ cep }
              onChange={ this.handleChange }
            />
          </label>
          <label>
            Endereço:
            <input
              name="address"
              type="text"
              data-testid="checkout-address"
              value={ address }
              onChange={ this.handleChange }
            />
          </label>
          <label>
            Metodo de pagamento:
            <label>
              <input
                name="payment"
                type="radio"
                data-testid="ticket-payment"
                value="ticket"
                onChange={ this.handleChange }
              />
              Boleto
            </label>
            <label>
              <input
                name="payment"
                type="radio"
                data-testid="visa-payment"
                value="visa"
                onChange={ this.handleChange }
              />
              Visa
            </label>
            <label>
              <input
                name="payment"
                type="radio"
                data-testid="master-payment"
                value="master"
                onChange={ this.handleChange }
              />
              MasterCard
            </label>
            <label>
              <input
                name="payment"
                type="radio"
                data-testid="elo-payment"
                value="elo"
                onChange={ this.handleChange }
              />
              Elo
            </label>
          </label>
          <button
            data-testid="checkout-btn"
            onClick={ this.checkout }
          >
            Finalizar compra
          </button>
        </form>
        {clicked && !valid && <p data-testid="error-msg">Campos inválidos</p>}
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
