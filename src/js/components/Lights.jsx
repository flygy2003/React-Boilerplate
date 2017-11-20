import React, {Component} from 'react'
import * as firebase from 'firebase'
import Card from './Card.jsx'

var config = {
  apiKey: "AIzaSyDJ31YrXt8JAPUZHYGNRS8WNjoHaz8ssuE",
  authDomain: "home-b7104.firebaseapp.com",
  databaseURL: "https://home-b7104.firebaseio.com",
  projectId: "home-b7104",
  storageBucket: "home-b7104.appspot.com",
  messagingSenderId: "42864256502"
}

firebase.initializeApp(config)
let database = firebase.database().ref()

class Lights extends Component {
  constructor() {
    super()
    
  }
  turnAllOn() {
    database.child('/rooms/all').set(false)
    database.child('/rooms/sDiningRoom').set(false)
    database.child('/rooms/sFamilyRoom').set(false)
    database.child('/rooms/sGallery').set(false)
    database.child('/rooms/sGuestBathroom').set(false)
    database.child('/rooms/sHomeworkRoom').set(false)
    database.child('/rooms/skitchen').set(false)
    database.child('/rooms/sLibrary').set(false)
    database.child('/rooms/sLivingRoom').set(false)
    database.child('/rooms/sMasterBedroom').set(false)
    database.child('/rooms/sMasterBathrooms').set(false)
    database.child('/rooms/sNeekon\'sBedroom').set(false)
    database.child('/rooms/sOffice').set(false)
    database.child('/rooms/sAtrium').set(false)
    database.child('/rooms/sLivingRoom 2').set(false)
    database.child('/rooms/sLivingRoom3').set(false)
    database.child('/rooms/sGallery2').set(false)
    database.child('/rooms/sGallery3').set(false)
    database.child('/rooms/sOfficeBathroom').set(false)
    database.child('/rooms/sRyan\'sBedroom').set(false)
    database.child('/rooms/sRyan\'sBathroom').set(false)
  }
  turnAllOff() {
    database.child('/rooms/all').set(true)
    database.child('/rooms/sDiningRoom').set(true)
    database.child('/rooms/sFamilyRoom').set(true)
    database.child('/rooms/sGallery').set(true)
    database.child('/rooms/sGuestBathroom').set(true)
    database.child('/rooms/sHomeworkRoom').set(true)
    database.child('/rooms/skitchen').set(true)
    database.child('/rooms/sLibrary').set(true)
    database.child('/rooms/sLivingRoom').set(true)
    database.child('/rooms/sMasterBedroom').set(true)
    database.child('/rooms/sMasterBathrooms').set(true)
    database.child('/rooms/sNeekon\'sBedroom').set(true)
    database.child('/rooms/sOffice').set(true)
    database.child('/rooms/sAtrium').set(true)
    database.child('/rooms/sLivingRoom 2').set(true)
    database.child('/rooms/sLivingRoom3').set(true)
    database.child('/rooms/sGallery2').set(true)
    database.child('/rooms/sGallery3').set(true)
    database.child('/rooms/sOfficeBathroom').set(true)
    database.child('/rooms/sRyan\'sBedroom').set(true)
    database.child('/rooms/sRyan\'sBathroom').set(true)
  }
  render() {
    return(
      <Card>
        <ul className="flex-container">
<<<<<<< HEAD
            
          {[
            {room: 'kitchen'},
            {room: 'Living Room'},
            {room: 'Office'},
            {room: 'Office Bathroom'},
            {room: 'Neekon\'s Bedroom'},
            {room: 'Homework Room'},
            {room: 'Ryan\'s Bathroom'},
            {room: 'Ryan\'s Bedroom'},
            {room: 'Dining Room'},
            {room: 'Gallery'},
            {room: 'Guest Bathroom'},
            {room: 'Library'},
            {room: 'Family Room'},
            {room: 'Master Bedroom'},
            {room: 'Master Bathrooms'},
          ].map((item, i) => {
=======
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
>>>>>>> 3e99c7219db5abec379f9bc76496feee0009c02b
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
    firebase.database()
            .ref()
            .child('/rooms/' + room)
            .once('value')
            .then( (snapshot) => {
      state = snapshot.val()
      this.setState({
        isToggleOn: state
      })
    })
    var listener = firebase.database().ref().child('/rooms/' + room)
    listener.on("value", (snapshot) => {
      state = snapshot.val()
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
    firebase.database().ref().child('/rooms/' + this.props.lumer).set(!this.state.isToggleOn)
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
<<<<<<< HEAD

class AllLights extends Component {
  render() {
    return(
      <div>
        <span className="room on">
          All On
        </span>
        <span className="room off">
        </span>
      </div>
    )
  }
}

=======
>>>>>>> 3e99c7219db5abec379f9bc76496feee0009c02b
export default Lights