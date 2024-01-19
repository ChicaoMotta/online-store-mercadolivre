import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ProductCard from '../components/ProductCard';
import { getProductById } from '../services/api';
import Rating from '../components/Rating';
import GoToCart from '../components/GoToCart';

export default class Details extends Component {
  state = {
    product: {},
    count: 0,
  };

  componentDidMount() {
    this.fetchProduct();
    this.addCount();
  }

  addCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    this.setState({ count: cart
      .reduce((acc, { quantity }) => acc + Number(quantity), 0) });
  };

  fetchProduct = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const product = await getProductById(id);
    this.setState({ product });
  };

  render() {
    const { product, count } = this.state;
    const { match: { params: { id } } } = this.props;
    const { history } = this.props;
    return (
      <>
        <GoToCart history={ history } count={ count } />
        {
          product.attributes
          && <ProductCard
            history={ history }
            addCount={ this.addCount }
            product={ product }
            isOnPreview
          />
        }
        <Rating id={ id } />
      </>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
