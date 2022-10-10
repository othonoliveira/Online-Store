import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React from 'react';

class ProductCard extends React.Component {
  render() {
    const { data, handleCartButton } = this.props;
    return (
      <div>
        {data.length === 0 ? <p>Nenhum produto foi encontrado</p>
          : data.map((item, index) => (
            <div data-testid="product" key={ index }>
              <Link
                to={ `/product/${item.id}` }
                data-testid="product-detail-link"
                onClick={ this.handleClick }
              >
                <h1>{item.title}</h1>
              </Link>
              <img src={ item.thumbnail } alt="Imagem do Produto" />
              <h2>{`R$${item.price}`}</h2>
              <button
                data-testid="product-add-to-cart"
                type="button"
                id={ index }
                item={ item }
                onClick={ handleCartButton }
              >
                Adiciona Carrinho
              </button>
            </div>
          ))}
      </div>
    );
  }
}

export default ProductCard;

ProductCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  handleCartButton: PropTypes.func.isRequired,
};
