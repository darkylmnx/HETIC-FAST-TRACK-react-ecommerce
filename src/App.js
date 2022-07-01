import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Page404 from './pages/404';

function App() {
  return (
    <div className='has-background-light'>
      <nav className="navbar has-shadow is-fixed" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img src="https://via.placeholder.com/112x28" width="112" height="28"/>
          </a>

          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="/">
              Accueil
            </Link>

            <Link className="navbar-item" to="/panier">
              Panier
            </Link>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                More (example)
              </a>

              <div className="navbar-dropdown">
                <a className="navbar-item">
                  About
                </a>
                <a className="navbar-item">
                  Jobs
                </a>
                <a className="navbar-item">
                  Contact
                </a>
                <hr className="navbar-divider"/>
                <a className="navbar-item">
                  Report an issue
                </a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-primary">
                  <strong>Sign up</strong>
                </a>
                <a className="button is-light">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/produit/:id" component={Product} />
          <Route path="/panier">
            <Cart />
          </Route>
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </div>

    </div>
  );
}

export default App;
