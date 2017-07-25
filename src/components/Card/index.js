import React, { Component } from 'react';
import img from '../../images/610.jpg'
import './Card.css'

class Card extends Component {

  render() {

    const background =  this.props.bgImage || img

    return (
      // TODO: Pasar un 'nivel' para destacar tarjetas especiales, como PRs usando CSS
      // <section className={'SpecialCard SpecialCard-' + props.level}>

      <section className="cards">
        <article className="card">
          <a>
            <figure className="header" style={ {"backgroundImage": `url(${background})`}}>
              {this.props.h1 && <div className="card-h1"> {this.props.h1} </div>}
              {this.props.h2 && <div className="card-h2"> {this.props.h2} </div>}
              {this.props.h3 && <div className="card-h3"> {this.props.h3} </div>}
            </figure>
            <div className="card-content">
              {this.props.children}
            </div>
          </a>
        </article>
      </section>
    )
  }

}

export default Card
