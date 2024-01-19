import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Rating extends Component {
  state = {
    email: '',
    message: '',
    rating: 0,
    evaluations: [],
    clicked: false,
    isValid: false,
  };

  componentDidMount() {
    const { id } = this.props;
    const evaluations = JSON.parse(localStorage.getItem(id));
    if (evaluations) {
      this.setState({
        evaluations,
      });
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  submitRating = () => {
    const { email, message, rating } = this.state;
    this.setState({ clicked: true });

    if (email === '' || rating === 0) return;
    this.setState({
      isValid: true,
    });

    const { id } = this.props;
    const previousEvaluations = JSON.parse(localStorage.getItem(id));
    if (previousEvaluations) {
      this.setState({
        evaluations: [...previousEvaluations, { email, message, rating }],
      }, () => {
        const { evaluations: updatedEvaluations } = this.state;
        localStorage
          .setItem(id, JSON.stringify(updatedEvaluations));
      });
    } else {
      this.setState({
        evaluations: [{ email, message, rating }],
      }, () => {
        const { evaluations: updatedEvaluations } = this.state;
        localStorage
          .setItem(id, JSON.stringify(updatedEvaluations));
      });
    }

    this.setState({
      email: '',
      message: '',
      rating: 0,
      isValid: false,
      clicked: false,
    });
  };

  renderCheckBoxRating = () => {
    const { rating } = this.state;
    const checkboxes = [];
    for (let index = 1; index <= Number('5'); index += 1) {
      checkboxes.push(
        <label key={ `rating_${index}` } data-testid={ `${index}-rating` }>
          <input
            checked={ rating >= index }
            onChange={ this.handleChange }
            value={ index }
            name="rating"
            type="checkbox"
            style={ { display: 'none' } }
          />
          {rating >= index
            ? <i className="fa-solid fa-star" style={ { color: '#ecd332' } } />
            : <i className="fa-regular fa-star" />}
        </label>,
      );
    }
    return checkboxes;
  };

  renderRating = (rating, key) => {
    const stars = [];
    for (let index = 0; index < rating; index += 1) {
      stars.push(<i
        key={ `${key}_rating_${index}` }
        className="fa-solid fa-star"
        style={ { color: '#ecd332' } }
      />);
    }
    return stars;
  };

  render() {
    const { email, message, evaluations, clicked, isValid } = this.state;
    return (
      <div>
        <label>
          <input
            onChange={ this.handleChange }
            type="email"
            placeholder="Email"
            value={ email }
            name="email"
            data-testid="product-detail-email"
          />
        </label>
        {this.renderCheckBoxRating()}

        <label>
          <textarea
            data-testid="product-detail-evaluation"
            placeholder="Mensagem(opcional)"
            cols="30"
            rows="10"
            name="message"
            value={ message }
            onChange={ this.handleChange }
          />
        </label>

        <button
          data-testid="submit-review-btn"
          onClick={ this.submitRating }
        >
          Enviar
        </button>
        {evaluations
          .map(({
            email: ratingEmail,
            rating: ratingRating, message: ratingMessage }, index) => (
            (
              <div key={ `${email}${index}` }>
                <p data-testid="review-card-email">{ratingEmail}</p>
                <p data-testid="review-card-rating">
                  {this
                    .renderRating(ratingRating, `${email}${index}`)}
                </p>
                <p data-testid="review-card-evaluation">{ratingMessage}</p>
              </div>)
          ))}
        { (clicked && !isValid) && <span data-testid="error-msg">Campos inválidos</span> }
      </div>
    );
  }
}

Rating.propTypes = {
  id: PropTypes.string.isRequired,
};
