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

export class Room extends Component {
  constructor(props) {super(props)}
  render() {
    const { children } = this.props
    return (
      <li className="room">
        {children}
      </li>
    )
  }
}

export default Card