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

class Lights extends Component {
  render() {
    return(
      <Card>
        <ul className="flex-container">
          {[
             'Atrium',
             'kitchen',
             'Living Room',
             'Living Room 2',
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
             'Master Bathrooms',
             'All'
          ].sort().map((item, i) => {
            return(
              <div className={i == 18 ? "link-wrapper else" : "link-wrapper all"}>
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
    var database = firebase.database().ref()
    if(room == "all") {
        database.child('/rooms/all').set(!this.state.isToggleOn)
        database.child('/rooms/sDiningRoom').set(!this.state.isToggleOn)
        database.child('/rooms/sFamilyRoom').set(!this.state.isToggleOn)
        database.child('/rooms/sGallery').set(!this.state.isToggleOn)
        database.child('/rooms/sGuestBathroom').set(!this.state.isToggleOn)
        database.child('/rooms/sHomeworkRoom').set(!this.state.isToggleOn)
        database.child('/rooms/skitchen').set(!this.state.isToggleOn)
        database.child('/rooms/sLibrary').set(!this.state.isToggleOn)
        database.child('/rooms/sLivingRoom').set(!this.state.isToggleOn)
        database.child('/rooms/sMasterBedroom').set(!this.state.isToggleOn)
        database.child('/rooms/sMasterBathrooms').set(!this.state.isToggleOn)
        database.child('/rooms/sNeekon\'sBedroom').set(!this.state.isToggleOn)
        database.child('/rooms/sOffice').set(!this.state.isToggleOn)
        database.child('/rooms/sAtrium').set(!this.state.isToggleOn)
        database.child('/rooms/sLivingRoom2').set(!this.state.isToggleOn)
        database.child('/rooms/sLivingRoom3').set(!this.state.isToggleOn)
        database.child('/rooms/sGallery2').set(!this.state.isToggleOn)
        database.child('/rooms/sGallery3').set(!this.state.isToggleOn)
        database.child('/rooms/sOfficeBathroom').set(!this.state.isToggleOn)
        database.child('/rooms/sRyan\'sBedroom').set(!this.state.isToggleOn)
        database.child('/rooms/sRyan\'sBathroom').set(!this.state.isToggleOn)
        this.setState(prevState => ({
          isToggleOn: !prevState.isToggleOn
        }))
    }
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

export default Lights