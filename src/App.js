import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import ShoppingCart from './pages/ShoppingCart';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/shoppingcart" component={ ShoppingCart } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
