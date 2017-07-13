import React, { Component } from 'react'

class Card extends Component {
  render() {
    return(
      <div className="cardContainer">
        {this.props.children}
      </div>
    )
  }
}

export default Cards
