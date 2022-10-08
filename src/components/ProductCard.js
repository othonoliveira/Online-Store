import React from 'react';
import PropTypes from 'prop-types';

class ProductCard extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        {data.length === 0 ? <p>Nenhum produto foi encontrado</p>
          : data.map((item, index) => (
            <div data-testid="product" key={ index }>
              <h1>{item.title}</h1>
              <img src={ item.thumbnail } alt="Imagem do Produto" />
              <h2>{`R$${item.price}`}</h2>
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
  })).isRequired,
};
