import React, {Component} from 'react'
import Card from './Card.jsx'
import io from 'socket.io-client'
const socket = io()
var db = {
	0: "Kitchen",
	1: "Livingroom",
	2: "Livingroom 2",
	3: "Livingroom 3",
	4: "Gallery",
	5: "Gallery 2",
	6: "Gallery 3",
	7: "Office",
	8: "Neekon's Bedroom",
	9: "Homework Room",
	10: "Dining Room",
	11: "Atrium",
	12: "Library",
	13: "Master Bedroom",
	14: "Master Bathroom",
	15: "Family Room",
	16: "Guest Bathroom",
	17: "Outdoor Wall",
	18: "Outdoor Strip",
	19: "Outdoor Trees & Fence"
}
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
            db.forEach((item, i) => {
              return (
                <div className={item == Object.keys(db).length ? 'link-wrapper else' : 'link-wrapper all'}>
                  <Room lumer={db[i]} key={i}>{item}</Room>
                </div>
              )
						})
						for (i = 0; i < Object.keys(db).length; i++) {
						console.log(db[i])
						}
          }
        </ul>
      </Card>
    )
  }
}
class Room extends Component {

  constructor(props) {
    super(props)
    this.state = { isToggleOn: false }
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    var room = this.props.lumer
    var state
    socket.emit('req', room)
    socket.on(`res`, (data) => {
      if (data.id == room) {
        state = data.data
        this.setState({
          isToggleOn: state
        })
      }
    })
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