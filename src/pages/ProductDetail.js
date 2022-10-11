import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

export default class ProductDetail extends Component {
  state = {
    response: {},
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getProductById(id);
    this.setState({ response });
  }

  render() {
    const { response } = this.state;
    const { location: { state: { handleCartButton, cartProducts } } } = this.props;
    return (
      <>
        <Link
          to={ {
            pathname: '/shoppingcart',
            state: { cartProducts },
          } }
        >
          <button data-testid="shopping-cart-button" type="button">
            Carrinho de compras!
          </button>
        </Link>
        <div>
          <h1 data-testid="product-detail-name">
            {response.title}
          </h1>
          <img
            data-testid="product-detail-image"
            src={ response.thumbnail }
            alt={ response.id }
          />
          <h2 data-testid="product-detail-price">
            {`R$: ${response.price}`}
          </h2>
          <button
            type="button"
            data-testid="product-add-to-cart"
            onClick={ () => handleCartButton(response) }
          >
            Add to Cart
          </button>
        </div>
      </>
    );
  }
}

ProductDetail.propTypes = {
  cartProducts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  location: PropTypes.shape().isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
