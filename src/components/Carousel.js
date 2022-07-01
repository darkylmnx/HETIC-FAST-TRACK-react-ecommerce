import React from "react";

export default class Carousel extends React.Component {
  state = {
    index: 0,
  };

  constructor(props) {
    super(props);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  prev() {
    if (this.state.index <= 0) {
      return;
    }

    this.setState((state) => {
      return {
        index: state.index - 1
      };
    });
  }

  next() {
    const end = this.props.product.images.photos.length - 1;

    if (this.state.index >= end) {
      return;
    }

    this.setState((state) => {
      return {
        index: state.index + 1
      };
    });
  }

  render() {
    return (
      <div className="block">
        <figure className="image w-400 mx-auto">
          <img
            className="is-square"
            src={this.props.product.images.photos[this.state.index]}
            alt={ this.props.product.title }
          />
        </figure>
        <div className="buttons is-centered">
          <button
            type="button"
            className="button is-text"
            disabled={this.state.index <= 0}
            onClick={this.prev}
          >
            Précédent
          </button>
          <button
            type="button"
            className="button is-text"
            disabled={this.state.index >= (this.props.product.images.photos.length - 1)}
            onClick={this.next}
          >
            Suivant
          </button>
        </div>
      </div>
    )
  }
}