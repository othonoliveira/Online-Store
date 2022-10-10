import PropTypes from 'prop-types';
import React from 'react';

class ShoppingCart extends React.Component {
  render() {
    const { location: { state: { cartProducts } } } = this.props;
    return (
      <div>
        {cartProducts.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        )
          : cartProducts.map((item, index) => (
            <div data-testid="product-add-to-cart" key={ index }>
              <h1 data-testid="shopping-cart-product-name">{item.title}</h1>
              <img src={ item.thumbnail } alt="Imagem do Produto" />
              <h2>{`R$${item.price}`}</h2>
              <p data-testid="shopping-cart-product-quantity">1</p>
            </div>
          ))}
      </div>
    );
  }
}

export default ShoppingCart;

ShoppingCart.propTypes = {
  location: PropTypes.shape().isRequired,
  cartProducts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
};
