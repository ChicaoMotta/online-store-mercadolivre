import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Cart extends Component {
  state = {
    itens: [],
  };

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    this.setState({ itens: [...cart] });
  }

  handleQuantity = ({ target: { name } }, action) => {
    const { itens } = this.state;

    if (action === 'add') {
      const item = itens.find((product) => product.id === name);
      if (item.quantity === item.availableQuantity) return;
      item.quantity += 1;
      this.setState({ itens }, () => {
        localStorage.setItem('cart', JSON.stringify(itens));
      });
    }
    if (action === 'remove') {
      const item = itens.find((product) => product.id === name);
      item.quantity -= 1;
      this.setState({ itens }, () => {
        localStorage.setItem('cart', JSON.stringify(itens));
      });
    }
  };

  render() {
    const { itens } = this.state;
    const { history } = this.props;
    return (
      <div>
        {itens.length === 0
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : (
            <ol>
              {itens.filter(({ quantity }) => quantity > 0).map((item) => (
                <li key={ item.id }>
                  <h3 data-testid="shopping-cart-product-name">
                    {item.title}
                  </h3>
                  <img src={ item.thumbnail } alt={ item.title } />
                  <p>{(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    name={ item.id }
                    onClick={ (evt) => this.handleQuantity(evt, 'remove') }
                    data-testid="product-decrease-quantity"
                    disabled={ item.quantity === 1 }
                  >
                    -
                  </button>
                  {' '}
                  <span
                    data-testid="shopping-cart-product-quantity"
                  >
                    {item.quantity}
                  </span>
                  {' '}
                  <button
                    name={ item.id }
                    onClick={ (evt) => this.handleQuantity(evt, 'add') }
                    data-testid="product-increase-quantity"
                  >
                    +
                  </button>
                  <button
                    data-testid="remove-product"
                    onClick={ () => {
                      const index = itens.indexOf(item);
                      itens.splice(index, 1);
                      this.setState({ itens }, () => {
                        localStorage.setItem('cart', JSON.stringify(itens));
                      });
                    } }
                  >
                    remove
                  </button>
                </li>))}
            </ol>)}
        <button
          data-testid="checkout-products"
          type="button"
          onClick={ () => history.push('/checkout') }
        >
          finalizar compra
        </button>
      </div>
    );
  }
}

Cart.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
