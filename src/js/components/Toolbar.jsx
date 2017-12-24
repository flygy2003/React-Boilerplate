import React, { Component } from 'react'
import classnames from 'classnames'
import {Link} from "react-router-dom"

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false
    }
  }

  renderMenu() {
    return (
      <div className='menuContainer'>{[
        <Link to="/lights" className='menuItem'>Lights</Link>,
        <Link to="/settings" className='menuItem'>Settings</Link>,
        <Link to="/heater" className='menuItem'>Heater</Link>
      ].map((item, index) => (
        <MenuItem key={index} animationDelay={100 * index}>{ item }</MenuItem>
      ))}
      </div>
    )
  }

  setMenuOpen(menuOpen) {
    const { onMenuToggle } = this.props
    if (onMenuToggle) {
      onMenuToggle(menuOpen)
    }
    this.setState({ menuOpen })
  }

  render() {
    const { menuOpen } = this.state
    return(
      <div className="toolbar">
        <Logo/>
        <DownArrow isDown={!menuOpen} onToggle={isDown => this.setMenuOpen(!isDown)} />
        <div className={classnames('dropdownMenu', { menuOpen })}>
          <div className='menuShade' onClick={() => this.setMenuOpen(false)}></div>
          { menuOpen ? this.renderMenu() : null }
        </div>
        <div id="footer"/>
      </div>
    )
  }
}

class MenuItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAnimated: false
    }

    const { animationDelay } = this.props
    setTimeout(() => {
      if (this.deleted) {
        return
      }
      this.setState({ isAnimated: true})
    }, animationDelay)
  }

  componentWillUnmount() {
    this.deleted = true
  }

  render() {
    const { children, animationDelay } = this.props
    const { isAnimated } = this.state
    return (
      <div className={classnames('menuItemContainer', { isAnimated })}>{children}</div>
    )
  }
}

class DownArrow extends Component {
  render() {
    const { onToggle, isDown } = this.props
    return (
      <img src="../static/downArrow.png" className={isDown ? "arrow down" : "arrow up"} onClick={() => onToggle(!isDown) }/>
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
