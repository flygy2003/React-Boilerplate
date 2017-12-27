import React, { Component } from 'react'
import Card, {Room} from "./Card.jsx"
import "./settings.scss"

class Settings extends Component {
  render() {
    return(
      <div>
        <Title>Settings</Title>
        <Card>
        <div className='row-wrapper'>
          <Row>
            <Text>Rename:</Text>
            <select className='rename from'>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
            <Text>To:</Text>
            <select className='rename to'>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
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
        </Card>
        <FAB/>
      </div>
    )
  }
}

class Title extends Component {
  render() {
    return(
      <div className='title'>{this.props.children}</div>
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
        <from className='form'>
          <input className='form input' type="text" placeholder={this.props.children}/>
        </from>
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