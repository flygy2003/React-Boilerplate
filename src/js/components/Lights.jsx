import React, {Component} from 'react'
import Card from './Card.jsx'
var io = require('socket.io'),
    socket = io()
class Lights extends Component {
  constructor() {super()}
  turnAllOn() {socket.emit('allOn')}
  turnAllOff() {socket.emit('allOff')}
  render() {
    return(
      <Card>
        <ul className="flex-container">
          <div className='link-wrapper all'>
            <div className='allLights'>
              <div className='on' onClick={this.turnAllOn.bind(this)}>
                All
              </div>
              <div className='off' onClick={this.turnAllOff.bind(this)}>
                None
              </div>
            </div>
            <room Name={'kitchen'}>
              Kitchen
            </room>
          </div>
        </ul>
      </Card>
    )
  }
}
class room extends Component {
  constructor(props){
    super(props)
  }
  on() {socket.emit('switchOn', this.props.Name)}
  off() {socket.emit('switchOff', this.props.Name)}
  render() {
    return(
      <div className='room'>
        <div className='text title'>
          {this.props.children}
        </div>
        <div className='text on' onClick={this.on.bind(this)}>
          On
        </div>
        <div className='text off' onClick={this.off.bind(this)}>
          Off
        </div>
      </div>
    )
  }
}
export default Lights