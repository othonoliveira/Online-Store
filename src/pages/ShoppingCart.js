import React from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends React.Component {
  render() {
    const { cartProducts } = this.props;
    return (
      <div>
        {cartProducts.length === 0
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : cartProducts.map((item, index) => (
            <div data-testid="product-add-to-cart" key={ index }>
              <h1>{item.title}</h1>
              <img src={ item.thumbnail } alt="Imagem do Produto" />
              <h2>{`R$${item.price}`}</h2>
            </div>
          ))}
      </div>
    );
  }
}

export default ShoppingCart;

ShoppingCart.propTypes = {
  cartProducts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
};
