import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const hasDiscount = props.product.priceDiscount != null;
  const price = props.product.priceDiscount || props.product.price;

  return (
    <article className='box content has-text-centered'>
      <h3>{ props.product.title }</h3>
      <figure className="image is-128x128 mx-auto">
        <img
          className="is-square"
          src={props.product.images.photos[0]}
          alt={ props.product.title }
        />
      </figure>
      <p>
        {
          hasDiscount && (
            <span className="fullprice tag is-danger">
              { props.product.price } {' '}
            </span>
          )
        }
        <span className="ml-3">
        { price }
        </span>
      </p>
      <p>
        <Link className="button" to={ '/produit/' + props.product.id }>
          Voir le produit
        </Link>
      </p>
    </article>
  );
}
