import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddToCart extends Component {
  addItemToCart = () => {
    const { product: { id,
      title,
      price,
      thumbnail,
      available_quantity: availableQuantity,
    } } = this.props;
    const previousStorage = JSON.parse(localStorage.getItem('cart'));
    const getItem = previousStorage.find(({ id: storageId }) => id === storageId);
    if (getItem && getItem.quantity === availableQuantity) return;
    if (getItem) {
      getItem.quantity += 1;
      localStorage.setItem('cart', JSON.stringify(previousStorage));
      return;
    }
    localStorage
      .setItem('cart', JSON.stringify([...previousStorage, { id,
        title,
        price,
        thumbnail,
        quantity: 1,
        availableQuantity,
      }]));
  };

  render() {
    const { isOnPreview, addCount } = this.props;
    return (
      <button
        data-testid={ !isOnPreview
          ? 'product-add-to-cart'
          : 'product-detail-add-to-cart' }
        onClick={ () => { this.addItemToCart(); addCount(); } }
      >
        Adicionar ao carrinho
      </button>
    );
  }
}

AddToCart.propTypes = {
  addCount: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.string,
    price: PropTypes.string,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }),
}.isRequired;
