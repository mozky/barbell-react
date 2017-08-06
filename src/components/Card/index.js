import React, { Component } from 'react';
import img from '../../images/610.jpg'
import './Card.css'

// Helper component to create a card easily, in order to format the header,
// has a default background with the option to give a custom one,
// also has support for titles {h1 h2 & h3} as side buttons {left & right}
class Card extends Component {

  render() {

    const background =  this.props.background || img

    return (
      <section className="cards">
        <article className="card">
            <figure className="header" style={ {"backgroundImage": `url(${background})`}}>
              <div className="left">
                {this.props.left}
              </div>
              <div className="center">
                {this.props.h1 && <div className="card-h1"> {this.props.h1} </div>}
                {this.props.h2 && <div className="card-h2"> {this.props.h2} </div>}
                {this.props.h3 && <div className="card-h3"> {this.props.h3} </div>}
              </div>
              <div className="right">
                {this.props.right}
              </div>
            </figure>
            <div className="card-content">
              {this.props.children}
            </div>
        </article>
      </section>
    )
  }

}

export default Card
