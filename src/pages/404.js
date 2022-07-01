import React from 'react';
import { Link } from 'react-router-dom';

export default class Page404 extends React.Component {
  render() {
    return (
      <section className='section has-text-centered'>
        <h1 className='title'>
          Vous êtes perdu...
        </h1>
        <p>
          Veuillez retourner vers l'accueil en {' '}
          <Link to="/">
            cliquant ici
          </Link>
        </p>
      </section>
    );
  }
}
