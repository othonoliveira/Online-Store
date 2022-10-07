import React from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from './ProductCard';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      listProducts: false,
      request: [],
    };
  }

  onSearch = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleButton = async () => {
    const { inputValue } = this.state;
    const request = await getProductsFromCategoryAndQuery(null, inputValue);
    console.log(request);
    this.setState({
      request,
      listProducts: true,
    });
  };

  render() {
    const { request, listProducts } = this.state;
    return (
      <>
        <h1
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>

        <input data-testid="query-input" onChange={ this.onSearch } />

        <button type="button" onClick={ this.handleButton } data-testid="query-button">
          Buscar
        </button>
        {!listProducts ? <p />
          : <ProductCard data={ request } />}
      </>
    );
  }
}

export default Home;
