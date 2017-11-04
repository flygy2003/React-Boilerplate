import React, {Component} from 'react'
import Card from './Card.jsx'
const db = require('diskdb')
db.connect('../static', ['offline'])
class Lights extends Component {
  constructor() {super()}
  turnAllOn() {
    //turn all lights on via setting all db items to true
    var items = db.offline.find()
  }
  turnAllOff() {
    //turn all lights off via setting all db items to false
  }
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
          </div>
          {[
             'Atrium',
             'kitchen',
             'Living Room',
             'Living Room 2',
             'Living Room 3',
             'Office',
             'Office Bathroom',
             'Neekon\'s Bedroom',
             'Homework Room',
             'Ryan\'s Bathroom',
             'Ryan\'s Bedroom',
             'Dining Room',
             'Gallery',
             'Gallery 2',
             'Gallery 3',
             'Guest Bathroom',
             'Library',
             'Master Bedroom',
             'Master Bathrooms'
          ].sort().map((item, i) => {
            return(
              <div className={i == 17 ? "link-wrapper else" : "link-wrapper all"}>
                <Room lumer={(item != "All") ? "s" + item.replace(" ", "") : "all"} key={i}>{item}</Room>
              </div>
            )
          })
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
    ////////Migrate from fb to diskdb////////
    firebase.database()
            .ref()
            .child('/rooms/' + room)
            .once('value')
            .then( (snapshot) => {
      state = snapshot.val()
      ////////Migrate from fb to diskdb////////
      this.setState({
        isToggleOn: state
      })
    })
    ////////Migrate from fb to diskdb////////
    var listener = firebase.database().ref().child('/rooms/' + room)
    listener.on("value", (snapshot) => {
      state = snapshot.val()
      ////////Migrate from fb to diskdb////////
      this.setState({
        isToggleOn: state
      })
    })
    // console.log(this.props.lumer + ': mounted!' )
  }
  handleClick() {
    var room = this.props.lumer
    this.setState( prevState => ({
      isToggleOn: !prevState.isToggleOn
    }) )
    ////////Migrate from fb to diskdb////////
    firebase.database().ref().child('/rooms/' + this.props.lumer).set(!this.state.isToggleOn)
    ////////Migrate from fb to diskdb////////
    // console.log(this.props.lumer + ": " + !this.state.isToggleOn)
  }
  render() {
    return (
        <li onClick={this.handleClick} className={this.state.isToggleOn ? "room off" : "room on"}>
          {this.state.isToggleOn ? this.props.children : this.props.children}
        </li>
    )
  }
}
export default Lights