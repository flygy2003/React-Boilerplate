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
            {room: 'All'}
          ].map((item, i) => {
            return(
              <div className={item.room == "All" ? "link-wrapper else" : "link-wrapper all"}>
                <Room lumer={(item.room != "All") ? "s" + item.room.replace(" ", "") : "all"} key={i}>{item.room}</Room>
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
        database.child('/rooms/sKitchen').set(!this.state.isToggleOn)
        database.child('/rooms/sLivingRoom').set(!this.state.isToggleOn)
        database.child('/rooms/sMasterBedroom').set(!this.state.isToggleOn)
        database.child('/rooms/sNeekonBedroom').set(!this.state.isToggleOn)
        database.child('/rooms/sOffice').set(!this.state.isToggleOn)
        database.child('/rooms/sOfficeBathroom').set(!this.state.isToggleOn)
        database.child('/rooms/sRyanRoom').set(!this.state.isToggleOn)
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