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
      selectedCategory: false,
      checked: '',
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
    const { checked } = this.state;
    const { inputValue } = this.state;
    if (checked !== '') {
      const radioCleaner = document.querySelector(`#${checked}`);
      radioCleaner.checked = false;
    }
    const request = await getProductsFromCategoryAndQuery(null, inputValue);
    this.setState({
      request,
      selectedCategory: false,
      listProducts: true,
    });
  };

  onInputChange = async (event) => {
    const { id } = event.target;
    const request = await getProductsFromCategoryAndQuery(id, undefined);
    this.setState({
      checked: id,
      listProducts: false,
      selectedCategory: true,
      request,
    });
  };

  imputCategory = async () => {
    const searchCategory = await getCategories();
    this.setState({
      category: searchCategory,
    });
  };

  render() {
    const { request, listProducts, category, selectedCategory } = this.state;
    return (
      <div>
        <h1
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <div>
          <input data-testid="query-input" onChange={ this.onSearch } />
          <button type="button" onClick={ this.handleButton } data-testid="query-button">
            Buscar
          </button>
          <Link to="/shoppingcart" data-testid="shopping-cart-button">
            <button type="button">
              Carrinho de compras!
            </button>
          </Link>
          <h2>Categorias</h2>
          {category.map((element, index) => (
            <div
              key={ index }
            >
              <label htmlFor="categorias" data-testid="category">
                <input
                  id={ element.id }
                  name="category"
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
        {!listProducts ? <p />
          : <ProductCard data={ request } />}

        {!selectedCategory ? <p />
          : <ProductCard data={ request } />}
      </div>
    );
  }
}

export default Home;
