import { Link } from "react-router-dom";

export default function CartProductCard(props) {
  const hasDiscount = props.cartProduct.priceDiscount != null;
  const price = props.cartProduct.priceDiscount || props.cartProduct.price;

  return (
    <article className='box content'>
      <div className="columns">
        <div className="column is-3">
          <figure className="image">
            <img
              className="is-block"
              src={props.cartProduct.image}
              alt={ props.cartProduct.title }
            />
          </figure>
        </div>
        <div className="column is-3 has-text-centered buttons">
          <button
            type="button"
            className="button"
            onClick={() => {
              props.quantityMinus(props.cartProduct);
            }}
            >
            -
          </button>
          <span className="button is-static">
            { props.cartProduct.quantity }
          </span>
          <button
            type="button"
            className="button"
            onClick={() => {
              props.quantityPlus(props.cartProduct);
            }}
          >
            +
          </button>
        </div>
        <div className="column is-6">
          <h3>{ props.cartProduct.title }</h3>
          <p>
            {
              hasDiscount && (
                <span className="fullprice tag is-danger">
                  { props.cartProduct.price } {' '}
                </span>
              )
            }
            <span className="ml-3">
            { price }
            </span>
          </p>
          <p>
            <Link className="button" to={ '/produit/' + props.cartProduct.id }>
              Voir le produit
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
}
