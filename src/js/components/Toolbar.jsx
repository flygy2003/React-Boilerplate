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
      <div>
        <img src="../static/downArrow.png" className={this.state.isDown ? "arrow down" : "arrow up"} onClick={this.spin.bind(this)}/>
        <div className={this.state.isDown ? "list down" : "list up"}>
          <div className='item'>hello there</div>
          <div className='item'>I am a list</div>
          <div className='item'>I am supposed to work</div>
          <div className='item'>But obiously I won't.</div>
        </div>
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
