import React, { Component } from 'react'

class Toolbar extends Component {
  render() {
    return(
      <div>
        <Logo/>
        <div id="footer"/>
      </div>
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
