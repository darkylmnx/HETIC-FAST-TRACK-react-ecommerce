import React from 'react';
import ProductCard from '../components/ProductCard';

export default class Home extends React.Component {

  state = {
    isLoading: false,
    searchQuery: '',
    data: {},
  };

  constructor() {
    super();
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.getPages = this.getPages.bind(this);
    this.getProducts = this.getProducts.bind(this);
  }

  handleSearchChange(event) {
    this.setState({
      searchQuery: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getProducts(1)
  }

  clearSearch() {
    this.setState({ searchQuery: '' }, () => {
      this.getProducts();
    });
  }

  prev() {
    if (this.state.isLoading) {
      return;
    }

    if (this.state.data.page <= 1) {
      alert('Pas de page précédente');
      return;
    }

    this.getProducts(this.state.data.page - 1);
  }

  next() {
    if (this.state.isLoading) {
      return;
    }

    if (this.state.data.page >= this.state.data.total_pages) {
      alert('Plus de produits');
      return;
    }

    this.getProducts(this.state.data.page + 1);
  }

  getPages() {
    const pages = [];

    if (this.state.isLoading) {
      return pages;
    }

    const start = Math.max(this.state.data.page - 2, 1);
    const end = Math.min(start + 4, this.state.data.total_pages);

    for (let i = start; i <= end; i++) {
      let btnClass = 'button';

      if (i === this.state.data.page) {
        btnClass += ' is-primary';
      }

      pages.push(
        <button
          key={i}
          type='button'
          className={ btnClass }
          onClick={ () => {
            this.getProducts(i)
          } }>
          { i }
        </button>
      );
    }

    return pages;
  }

  getProducts(page) {
    if (page == null) {
      page = 1;
    }

    let url = 'https://otakod.es/hetic/ecommerce-api/products?limit=12&page=' + page;
    
    if (this.state.searchQuery !== '') {
      url += ('&search=' + this.state.searchQuery)
    }

    this.setState(() => {
      return {
        isLoading: true,
        data: {}
      };
    });

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        this.setState(() => {
          return {
            isLoading: false,
            data: json
          };
        });
      });
  }

  componentDidMount() {
    this.getProducts();
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

        <form className='columns' onSubmit={this.handleSubmit}>
          <div className="column is-9">
            <div className="control">
              <input
                className="input"
                type="search"
                placeholder='Rechercher'
                value={this.state.searchQuery}
                onChange={this.handleSearchChange}
              />
            </div>
          </div>
          <div className='column is-3'>
            <button
              type='button'
              className='button'
              onClick={this.clearSearch}
            >
              Effacer
            </button>
          </div>
        </form>

        <div className='columns is-multiline'>
          {
            this.state.data.products != null && (
              this.state.data.products.map((value) => {
                return (
                  <div key={value.id} className='column is-4'>
                    <ProductCard product={ value } />
                  </div>
                );
              })
            )
          }
        </div>
        <div className='buttons'>
          <button
            type='button'
            className='button is-primary'
            disabled={this.state.isLoading === true || this.state.data.page <= 1}
            onClick={this.prev}>
            Précédent
          </button>
          <button
            type='button'
            className='button is-primary'
            disabled={
              this.state.isLoading === true ||
              this.state.data.page >= this.state.data.total_pages
            }
            onClick={this.next}>
            Suivant
          </button>
        </div>
        <div className='buttons'>
          { this.getPages() }
        </div>
      </div>
    );
  }
}
