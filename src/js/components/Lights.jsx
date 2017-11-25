import React, {Component} from 'react'
import Card from './Card.jsx'
import io from "socket.io-client"
const socket = io()
class Lights extends Component {
  constructor() {
    super()
    socket.on('=>online<=', () => {
      window.location.href = 'http://54.153.103.41'
    })
  }
  turnAllOn() {socket.emit('allOn')}
  turnAllOff() {socket.emit('allOff')}
  render() {
    var dbnames = 
    [
      'kitchen',
      'livingroom',
      'livingroom2',
      'livingroom3',
      'gallery',
      'gallery2',
      'gallery3',
      'office',
      'neekonsbedroom',
      'homeworkroom',
      'diningroom',
      'atrium'
    ].sort()
    var roomies = 
      [
        'Atrium',
        'kitchen',
        'Living Room',
        'Living Room 2',
        'Living Room 3',
        'Office',
        'Neekon\'s Bedroom',
        'Homework Room',
        'Dining Room',
        'Gallery',
        'Gallery 2',
        'Gallery 3'
      ].sort()
    return(
      <Card>
        <ul className='flex-container'>
          <div className='link-wrapper all'>
            <div className='allLights'>
              <div className='on' onClick={this.turnAllOn.bind(this)}>
                All
              </div>
              <div className='off' onClick={this.turnAllOff.bind(this)}>
                None
              </div>
            </div>
          </div>
          {
            roomies.forEach((item, i) => {
              return (
                <div className={item == roomies.slice(-1)[0] ? 'link-wrapper else' : 'link-wrapper all'}>
                  <Room lumer={dbnames[i]} key={i}>{item}</Room>
                </div>
              )
            })
          }
        </ul>
      </Card>
    )
  }
}
class room extends Component {

  constructor(props) {
    super(props)
    this.state = { isToggleOn: false }
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    var room = this.props.lumer
    var state
    ////////Migrate from fb to diskdb////////
    // firebase.database()
    //   .ref()
    //   .child('/rooms/' + room)
    //   .once('value')
    //   .then((snapshot) => {
    //     state = snapshot.val()
    //     ////////Migrate from fb to diskdb////////
    //   })
    socket.emit('req', room)
    socket.on(`res`, (data) => {
      if (data.id == room) {
        state = data.data
        this.setState({
          isToggleOn: state
        })
      }
    })
    ////////Migrate from fb to diskdb////////
    // var listener = firebase.database().ref().child('/rooms/' + room)
    // listener.on('value', (snapshot) => {
    //   state = snapshot.val()
    //   ////////Migrate from fb to diskdb////////
    //   this.setState({
    //     isToggleOn: state
    //   })
    // })
    socket.on(`rt`, (data) => {
      if (data.id == room || data.id == 'all') {
        state = data.data
        this.setState({
          isToggleOn: state
        })
      }
    })
    // console.log(this.props.lumer + ': mounted!' )
  }
  handleClick() {
    var room = this.props.lumer
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }))
    ////////Migrate from fb to diskdb////////
    // firebase.database().ref().child('/rooms/' + this.props.lumer).set(!this.state.isToggleOn)
    ////////Migrate from fb to diskdb////////
    // console.log(this.props.lumer + ': ' + !this.state.isToggleOn)
    if(this.state.isToggleOn) {
      socket.emit('switchOn', room)
    } if(!this.state.isToggleOn) {
      socket.emit('switchOff', room)
    }
  }
  render() {
    return (
      <li onClick={this.handleClick} className={this.state.isToggleOn ? 'room on' : 'room off'}>
        {this.props.children}
      </li>
    )
  }
}
export default Lights
