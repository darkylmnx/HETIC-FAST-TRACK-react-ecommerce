import React from 'react';
import Carousel from '../components/Carousel';

export default class Product extends React.Component {
  state = {
    isLoading: false,
    product: null,
  };

  constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);
    this.getProduct = this.getProduct.bind(this);
  }

  addToCart() {
    if (this.state.isLoading) {
      return;
    }

    if (this.state.product.stock <= 0) {
      alert('Stock épuisé');
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let found = false;

    cart.forEach((cartProduct) => {
      if (cartProduct.id === this.state.product.id) {
        found = true;

        if (this.state.product.stock > cartProduct.quantity) {
          cartProduct.quantity += 1;
          alert('Ajouté !');
          return;
        }

        alert('Stock épuisé');
      }
    });

    if (found === false) {
      cart.push({
        id: this.state.product.id,
        title: this.state.product.title,
        price: this.state.product.price,
        priceDiscount: this.state.product.priceDiscount,
        stock: this.state.product.stock,
        image: this.state.product.images.photos[0],
        quantity: 1,
      });

      alert('Ajouté !');
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getProduct() {
    const id = this.props.match.params.id;

    this.setState({ isLoading: true });

    fetch('https://otakod.es/hetic/ecommerce-api/products/' + id)
      .then((res) => res.json())
      .then((json) => this.setState({
        isLoading: false,
        product: json
      }))
  }

  componentDidMount() {
    this.getProduct();
  }

  render() {
    return (
      <div className='section'>
        {
          this.state.isLoading === true && (
            <p className='notification is-info'>
              Chargement...
            </p>
          )
        }

        {
          this.state.product != null &&  (
            <article className='box content has-text-centered'>
              <h3>{ this.state.product.title }</h3>
              <Carousel product={ this.state.product } />
              <p>
                {
                  this.state.product.priceDiscount != null && (
                    <span className="fullprice tag is-danger">
                      { this.state.product.price } {' '}
                    </span>
                  )
                }
                <span className='ml-3'>
                  { this.state.product.priceDiscount || this.state.product.price }
                </span>
              </p>
              <p>
                Stock : { this.state.product.stock }
              </p>
              <p>
                <button
                  type='button'
                  className='button'
                  disabled={this.state.product.stock <= 0}
                  onClick={this.addToCart}>
                  Ajouter au panier
                </button>
              </p>
              <p>
                { this.state.product.description }
              </p>
            </article>
          )
        }
      </div>
    );
  }
}
