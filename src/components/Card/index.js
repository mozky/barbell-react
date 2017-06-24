import React, { Component } from 'react';
import img from '../../images/610.jpg'
import './Card.css'

class Card extends Component {

  render() {
    return (
      // TODO: Pasar un 'nivel' para destacar tarjetas especiales, como PRs usando CSS
      // <section className={'SpecialCard SpecialCard-' + props.level}>

      <section className="cards">
        <article className="card">
          <a>
            <figure className="thumbnail">
            <img src={img} alt="meow"></img>
            </figure>
            <div className="card-content">
              <h2>Whiskey</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum explicabo consequatur consectetur fugit molestias perferendis, sint error iste ut, facilis sunt natus optio dolor nesciunt laboriosam obcaecati corporis numquam.</p>
            </div>
          </a>
        </article>
      </section>
    )
  }

}

export default Card
