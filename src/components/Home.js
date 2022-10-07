import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import ProductCard from './ProductCard';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      listProducts: false,
      request: [],
      category: [],
    };
  }

  componentDidMount() {
    this.imputCategory();
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

  onInputChange = (event) => {
    const { name, type, checked } = event.target;
    const value = type === 'radio' ? checked : event.target.value;
    this.setState({
      [name]: value,
    });
  };

  imputCategory = async () => {
    const searchCategory = await getCategories();
    console.log(searchCategory);
    this.setState({
      category: searchCategory,
    });
  };

  render() {
    const { request, listProducts, category } = this.state;
    return (
      <div>

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

        <Link to="/shoppingcart" data-testid="shopping-cart-button">
          <button type="button">
            Carrinho de compras!
          </button>
        </Link>
        <div>
          <h2>Categorias</h2>
          {category.map((element, index) => (
            <div
              key={ index }
            >
              <label htmlFor="categorias" data-testid="category">
                <input
                  type="radio"
                  value={ element.name }
                  onChange={ this.onInputChange }
                />
                {' '}
                {element.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
