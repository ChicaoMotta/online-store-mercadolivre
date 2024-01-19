import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class GoToCart extends Component {
  render() {
    const { history, count } = this.props;
    return (
      <label
        data-testid="shopping-cart-button"
        htmlFor="cart"
        style={ { position: 'relative' } }
      >
        <button
          id="cart"
          type="button"
          onClick={ () => history.push('/cart') }
          style={ { display: 'none' } }
        >
          |
        </button>
        <i
          className="fa-solid fa-cart-shopping"
          style={ {
            fontSize: '3em',
            color: '#1e2f50',
          } }
        />
        <span
          data-testid="shopping-cart-size"
          style={ {
            backgroundColor: 'yellow',
            right: '0px',
            position: 'absolute',
            fontSize: '0.75em',
            padding: '5px',
            borderRadius: '100%' } }
        >
          {count}

        </span>
      </label>
    );
  }
}

GoToCart.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  count: PropTypes.number.isRequired,
};
