import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import ProductCard from '../components/ProductCard';
import GoToCart from '../components/GoToCart';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo-main.png';

export default class PaginaInicial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      termoBusca: '',
      queryCategory: '',
      categoriesList: [],
      productList: [],
      searched: false,
      count: 0,
    };
  }

  componentDidMount() {
    this.getCategoriesBtn();
    const previousStorage = JSON.parse(localStorage.getItem('cart'));
    if (!previousStorage) localStorage.setItem('cart', JSON.stringify([]));
    this.addCount();
  }

  addCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    this.setState({ count: cart
      .reduce((acc, { quantity }) => acc + Number(quantity), 0) });
  };

  getCategoriesBtn = async () => {
    const categoriesList = await getCategories();
    this.setState({ categoriesList });
  };

  fetchQueryItems = async () => {
    const { termoBusca, queryCategory } = this.state;
    const products = await getProductsFromCategoryAndQuery(queryCategory, termoBusca);
    this.setState({ productList: products.results, searched: true });
  };

  handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      if (name === 'queryCategory') this.fetchQueryItems();
    });
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.fetchQueryItems();
    }
  };

  render() {
    const { termoBusca,
      queryCategory,
      categoriesList,
      productList,
      searched,
      count,
    } = this.state;
    const { history } = this.props;

    const listaCategorias = categoriesList.map(({ id, name }) => (
      <li key={ id }>
        <label data-testid="category">
          <input
            type="radio"
            name="queryCategory"
            value={ id }
            onChange={ this.handleChange }
            className="me-2"
          />
          {name}
        </label>
      </li>
    ));

    return (
      <div className="row justify-content-start align-items-start">

        <div className="col-md-12 d-flex flex-row align-items-center py-3">
          <div className="col-md-4 text-center">
            <img
              src={ logo }
              alt=""
              style={ { objectFit: 'cover',
                height: '70px' } }
            />
          </div>
          <div className="col-md-4 text-center">

            <label htmlFor="">
              <input
                type="text"
                name="termoBusca"
                data-testid="query-input"
                value={ termoBusca }
                placeholder="Digite o produto..."
                onChange={ this.handleChange }
                onKeyDown={ this.handleKeyPress }
              />
            </label>
            <button onClick={ this.fetchQueryItems } data-testid="query-button">
              Pesquisar
            </button>
          </div>
          <div className="col-md-4 text-center">
            <GoToCart history={ history } count={ count } />
          </div>
        </div>
        <div className="col-md-4">

          <ul className="py-2 px-5 rounded w-100">{listaCategorias}</ul>
        </div>
        <div className="col-md-8 h-100">

          {!searched ? (
            <p
              data-testid="home-initial-message"
              className="px-3 rounded"
              style={ { background: 'white' } }
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          ) : (
            <ul className="row justify-content-start align-items-start">
              {productList.length > 0 || queryCategory.length > 0
                ? productList.map((product) => (
                  <ProductCard
                    key={ product.id }
                    product={ product }
                    addCount={ this.addCount }
                    history={ history }
                  />
                )) : <h2>Nenhum produto foi encontrado</h2>}
              {}
            </ul>
          )}
        </div>
      </div>

    );
  }
}

PaginaInicial.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
