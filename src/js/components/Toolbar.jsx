import React, { Component } from 'react'

class Toolbar extends Component {
  render() {
    return(
      <div className="toolbar">
        <Logo/>
        <DownArrow/>
        <div id="footer"/>
      </div>
    )
  }
}

class DownArrow extends Component {
  constructor() {
    super()
    this.state = {
      isDown: true
    }
  }
  spin() {
    this.setState({
      isDown: !this.state.isDown
    })
    console.log(this.state.isDown)
  }
  render() {
    return (
      <img src="../static/downArrow.png" id={this.state.isDown ? "downArrow" : "upArrow"} onClick={this.spin.bind(this)}/>
    )
  }
}

class Logo extends Component {
  render() {
    return(
      <img src="../static/react.png" id="logo"/>
    )
  }
}

export default Toolbar
