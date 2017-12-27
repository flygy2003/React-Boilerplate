import React, {Component} from 'react'
import * as firebase from 'firebase'
import classnames from 'classnames'
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
var database = firebase.database()
var range = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 
              9, 10, 11, 12, 13, 14, 15, 
              16, 17, 18, 19, 20, 21, 22, 
              23, 24, 25, 26, 27, 28, 29, 30 ]

class Lights extends Component {
  constructor(props) {
    super(props)
  }
  turnAllOn() {
    range.forEach(item => {
      database.ref("VirtualDB/" + item + "/state").set(true)
    })
  }
  turnAllOff() {
    range.forEach(item => {
      database.ref("VirtualDB/" + item + "/state").set(false)
    })
  }
  render() {
    return(
      <div className='wrapper'>
        <div className='title'>Lights</div>
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
             {range.map(item => {
                return(<Room lumer={item} key={item}/>)
             })}
          </ul>
        </Card>
      </div>
    )
  }
}

class Room extends Component {

  constructor(props) {
    super(props)
    this.state = { toggle: false,
                   name: "Loading..." }
    console.log(this.props.lumer)
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const { lumer } = this.props
    var listener = database.ref(`VirtualDB/${lumer}`)
    listener.on("value", (snapshot) => {
      this.setState({
        toggle: snapshot.val().state,
        name: snapshot.val().name
      })
    })
  }
  handleClick() {
    database.ref(`VirtualDB/${this.props.lumer}/state`).set(!this.state.toggle)
  }
  render() {
		const { toggle, name } = this.state
		const { lumer } = this.props
    return (
        <div className={lumer == range[range.length - 1] ? "link-wrapper else" : 'link-wrapper all'}>
          <li onClick={this.handleClick} className={toggle ? "room on" : "room off"}>
            {name}
          </li>
        </div>
    )
  }
}
export default Lights