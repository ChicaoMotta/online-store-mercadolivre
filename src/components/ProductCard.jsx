import PropTypes from 'prop-types';
import React, { Component } from 'react';
/* import { Link } from 'react-router-dom'; */
import AddToCart from './AddToCart';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ProductCard extends Component {
  render() {
    const { product, isOnPreview, addCount, history } = this.props;
    return (
      <div className="col-md-4 my-3 ">
        <div className="card p-3">

          <li
            data-testid="product "
            className="text-center"
          >
            <h3
              data-testid="product-detail-name text-start"
              className="fs-4"
              style={ { display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                WebkitLineClamp: 3 } }

            >
              {product.title}

            </h3>
            <img
              data-testid="product-detail-image"
              src={ product.thumbnail }
              alt={ product.title }
              className="my-3 mx-auto"
            />
            <h3 data-testid="product-detail-price ">
              R$
              { product.price.toFixed(2) }
            </h3>
            {isOnPreview && (
              <div style={ { maxHeight: '500px', overflowY: 'overlay' } }>
                { product
              && product.attributes.map(({ name,
                value_name: valueName, id }) => (
                (
                  <p key={ id }>
                    <strong>{`${name}: `}</strong>
                    {valueName}
                  </p>)))}
              </div>)}
            {product.shipping.free_shipping
              && <p
                className="text-success"
                data-testid="free-shipping"
              >
                Frete Grátis

              </p>}
          </li>
          {/* </Link> */}
          { !isOnPreview && (
            <button
              data-testid="product-detail-link"
              type="button"
              onClick={ () => history.push(`/product/${product.id}`) }
              className="mb-3 rounded"
            >
              Ver detalhes
            </button>)}
          <AddToCart
            product={ product }
            isOnPreview={ isOnPreview }
            addCount={ addCount }
            className="mb-3 rounded"

          />
        </div>
      </div>
    );
  }
}

ProductCard.propTypes = {
  addCount: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.string,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    attributes: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      value_name: PropTypes.string,
    }),
  }),
  isOnPreview: PropTypes.bool,
}.isRequired;

ProductCard.defaultProps = {
  isOnPreview: false,
};
