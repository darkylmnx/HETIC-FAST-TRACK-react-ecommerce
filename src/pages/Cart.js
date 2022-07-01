import React from 'react';
import CartProductCard from '../components/CartProductCard';

export default class Cart extends React.Component {

  state = {
    cart: [],
  };

  constructor() {
    super();
    this.getTotalPrice = this.getTotalPrice.bind(this);
    this.quantityPlus = this.quantityPlus.bind(this);
    this.quantityMinus = this.quantityMinus.bind(this);
  }

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    this.setState({ cart: cart });
  }

  quantityPlus(cartProduct) {
    const cart = [...this.state.cart];

    cart.forEach((value) => {
      if (cartProduct.id === value.id) {
        if (value.stock > value.quantity) {
          value.quantity += 1;
          return;
        }

        alert('Stock épuisé');
      }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    this.setState({ cart: cart });
  }

  quantityMinus(cartProduct) {
    let cart = [...this.state.cart];

    cart.forEach((value) => {
      if (cartProduct.id === value.id) {
        value.quantity -= 1;
      }
    });

    cart = cart.filter((value) => {
      return value.quantity > 0;
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    this.setState({ cart: cart });
  }

  getTotalPrice() {
    let total = 0;

    this.state.cart.forEach((val) => {
      let price = val.priceDiscount == null ? val.price : val.priceDiscount;
      price = parseFloat(price);
      total += (price * val.quantity);
    });

    return total.toFixed(2) + '€';
  }

  render() {
    return (
      <div className='section'>
        <h1 className='title'>Panier</h1>
        <p>
          Vous êtes sur le panier et
          vous avez <strong> { this.state.cart.length }</strong> produits.
        </p>
        <p className='mt-5 has-text-weight-bold'>
          TOTAL : { this.getTotalPrice() }
        </p>
        <div className='mt-5'>
          {
            this.state.cart.map((value) => {
              return (
                <div key={value.id}>
                  <CartProductCard
                    cartProduct={ value }
                    quantityPlus={ this.quantityPlus }
                    quantityMinus={ this.quantityMinus }
                  />
                </div>
              );
            })
          }
        </div>
        <p className='mt-5 has-text-weight-bold'>
          TOTAL : { this.getTotalPrice() }
        </p>
      </div>
    );
  }
}
