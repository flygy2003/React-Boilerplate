import React, { Component } from 'react'
import * as firebase from 'firebase'
import classnames from 'classnames'
import Card from './Card.jsx'
import { Route, Switch, Link } from 'react-router-dom'


var db = firebase.database()
var room = [0,3,9,10,12,26]
db.ref('fav/laleh').on('value', snapshot => {
  snapshot.val().forEach(item => {
    room.push(item)
  })
})
class Laleh extends Component {
  constructor(props) {
    super(props)
  }
  turnAllOn() {
    console.log(room)
    room.forEach(item => {
      db.ref("VirtualDB/" + item + "/state").set(true)
    })
  }
  turnAllOff() {
    room.forEach(item => {
      db.ref("VirtualDB/" + item + "/state").set(false)
    })
  }
  render() {
    return (
      <div className='wrapper'>
        <div className='title'>Lights</div>
        <div className='tabsLayout'>
          <Link to="/lights" className='tabItem'>Main</Link>
          <div className='tabSpacer' />
          <Link to="/lights/dad" className='tabItem'>Dad</Link>
          <div className='tabSpacer' />
          <Link to="/lights/mom" className='tabItem'>Mom</Link>
          <div className='tabSpacer' />
          <Link to="/lights/ryan" className='tabItem'>Ryan</Link>
          <div className='tabSpacer' />
          <Link to="/lights/neekon" className='tabItem'>Neekon</Link>
        </div>
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
            {room.map(item => {
              return (<Room lumer={item} key={item} />)
            })
            }
          </ul>
        </Card>
      </div>
    )
  }
}

class Room extends Component {

  constructor(props) {
    super(props)
    this.state = {
      toggle: false,
      name: "Loading..."
    }
    console.log(this.props.lumer)
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const { lumer } = this.props
    var listener = db.ref(`VirtualDB/${lumer}`)
    listener.on("value", (snapshot) => {
      this.setState({
        toggle: snapshot.val().state,
        name: snapshot.val().name
      })
    })
  }
  handleClick() {
    db.ref(`VirtualDB/${this.props.lumer}/state`).set(!this.state.toggle)
  }
  render() {
    const { toggle, name } = this.state
    const { lumer } = this.props
    return (
      <div className={lumer == room[room.length - 1] ? "link-wrapper else" : 'link-wrapper all'}>
        <li onClick={this.handleClick} className={toggle ? "room on" : "room off"}>
          {name}
        </li>
      </div>
    )
  }
}
export default Laleh