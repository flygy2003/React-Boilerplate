import React, { Component } from 'react'
import Card, {Room} from "./Card.jsx"
import "./settings.scss"
import * as firebase from 'firebase'
var db = firebase.database()

var range = [0, 1, 2, 3, 4, 5, 6, 7, 8,
  9, 10, 11, 12, 13, 14, 15,
  16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30]
class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listActive: false
    }
  }
  onClick() {
    this.setState(prevState => ({listActive: !prevState.listActive}))
    console.log(this.state.listActive)
  }
  render() {
    return(
      <div>
        <Title>Settings</Title>
        <Card>
        <div className='row-wrapper'>
          <Row>
            <Text>Rename:</Text>
            <DropDown>Old Name</DropDown>
            <Text>To:</Text>
            <Input>New Name</Input>
          </Row>
          <Footer/>
        </div>
        <div className='row-wrapper'>
          <Row>
            <Text>Add Light Named:</Text>
            <Input>New Name</Input>
          </Row>
          <Footer/>
        </div>
        <div className='row-wrapper'>
          <Row>
            <Text>Set Timers: Soon To Come...</Text>
          </Row>
        </div>
          <FAB/>
        </Card>
      </div>
    )
  }
}
class DropDown extends Component {
	constructor(props) {
		super(props)
		this.state = {
			active: false,
			name: ''
		}
	}
	componentDidMount() {
		this.setState({name: this.props.children})
	}
	onClick() {
		this.setState({active: !this.state.active})
	}
	render() {
		return(
			<div onClick={this.onClick.bind(this)} className='dropdown-container'>	
				<span onClick={this.onClick.bind(this)} className='dropdown-init-text'><u>{this.state.name}</u></span>
				<div className={this.state.active ? 'settings-shader active' : 'settings-shader'}/>
				<div className={this.state.active ? 'dropdown-list-container active' : 'dropdown-list-container'}>
				<ul>	
					<li>Item 1</li>
					<li>Item 2</li>
					<li>Item 3</li>
				</ul>
				</div>
			</div>
		)
	}
}
class Title extends Component {
  render() {
    return(
      <div className='settings-title'>{this.props.children}</div>
    )
  }
}
export class Row extends Component {
  render() {
    return (
      <div className='row'>
        {this.props.children}
      </div>
    )
  }
}
class Text extends Component {
  render() {
    return (
      <span className='text'>{this.props.children}</span>
    )
  }
}
class Input extends Component {
  render() {
    return (
      <div className='form-wrapper'>
        <form className='form'>
          <input className='form input' type="text" placeholder={this.props.children}/>
        </form>
      </div>
    )
  }
}
export class Footer extends Component {
  render() {
    return (
      <div className='footer'/>
    )
  }
}
export class FAB extends Component {
  render() {
    return(
      <div className='fab'>
        <img src="../../static/fab.png" className='fab'/>
      </div>
    )
  }
}

export default Settings