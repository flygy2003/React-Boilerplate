import React, {Component} from 'react'
import Card from './Card.jsx'
var mongojs = require('mongojs')
var db = mongojs('mongodb://10.0.0.159:27017/testdb', ['test']);
var clrChildren = {}
var init = {
  "all": false,
  "sAtrium": false,
  "sDiningRoom": false,
  "sFamilyRoom": false,
  "sGallery": false,
  "sGallery2": false,
  "sGallery3": false,
  "sGuestBathroom": true,
  "sHomeworkRoom": false,
  "sLibrary": false,
  "sLivingRoom": true,
  "sLivingRoom 2": false,
  "sLivingRoom 3": true,
  "sLivingRoom3": false,
  "sMasterBathrooms": false,
  "sMasterBedroom": false,
  "sNeekon'sBedroom": false,
  "sOffice": true,
  "sOfficeBathroom": true,
  "sRyan'sBathroom": false,
  "sRyan'sBedroom": false,
  "skitchen": true
}
db.test.insert(clrChildren)
db.test.insert(test)
class Lights extends Component {
  constructor() {super()}
  turnAllOn() {
    //turn all lights on via setting all db items to true
    db.test.findAndModify({
      query: {id: 1},
      update: {
        $set: {
          "all": true,
          "sAtrium": true,
          "sDiningRoom": true,
          "sFamilyRoom": true,
          "sGallery": true,
          "sGallery2": true,
          "sGallery3": true,
          "sGuestBathroom": true,
          "sHomeworkRoom": true,
          "sLibrary": true,
          "sLivingRoom": true,
          "sLivingRoom 2": true,
          "sLivingRoom 3": true,
          "sLivingRoom3": true,
          "sMasterBathrooms": true,
          "sMasterBedroom": true,
          "sNeekon'sBedroom": true,
          "sOffice": true,
          "sOfficeBathroom": true,
          "sRyan'sBathroom": true,
          "sRyan'sBedroom": true,
          "skitchen": true}},
      new: true
    }, (err, doc, lastErrorObject) => {
      if(err) {
        console.log(lastErrorObject)
        throw err
      } else {
        console.log(doc)
      }
    })
  }
  turnAllOff() {
    //turn all lights off via setting all db items to false
    db.test.findAndModify({
      query: { id: 1 },
      update: {
        $set: {
          "all": false,
          "sAtrium": false,
          "sDiningRoom": false,
          "sFamilyRoom": false,
          "sGallery": false,
          "sGallery2": false,
          "sGallery3": false,
          "sGuestBathroom": false,
          "sHomeworkRoom": false,
          "sLibrary": false,
          "sLivingRoom": false,
          "sLivingRoom 2": false,
          "sLivingRoom 3": false,
          "sLivingRoom3": false,
          "sMasterBathrooms": false,
          "sMasterBedroom": false,
          "sNeekon'sBedroom": false,
          "sOffice": false,
          "sOfficeBathroom": false,
          "sRyan'sBathroom": false,
          "sRyan'sBedroom": false,
          "skitchen": false
        }
      },
      new: true
    }, (err, doc, lastErrorObject) => {
      if (err) {
        console.log(lastErrorObject)
        throw err
      } else {
        console.log(doc)
      }
    })
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
    db.test.findOne({id:1}, (err, doc) => {
      state = doc[room]
      console.log(`component mounted & state of ${room} == ${state}`)
    })
    this.setState({
      isToggleOn: state
    })
    ///////////////////STREAM/LISTENER SECTION////////////////////
    ////////Migrate from fb to diskdb////////
    //set cursor for listener on event emitter
    var cursor = db.test.find({id: 1}, {}, { tailable: true, timeout: false })
    // since all cursors are streams we can just listen for data
    //listen for changes and function for consequent subroutine
    // cursor.on('data', function (doc) {
    //   console.log('new document', doc)
    //   this.setState({
    //     isToggleOn: state
    //   })
    // })
    ////////Migrate from fb to diskdb////////
    //set react state to synced global state

    // console.log(this.props.lumer + ': mounted!' )
    ///////////////////CLOSE STREAM/LISTENER SECTION////////////////////
  }
  handleClick() {
    //initialize procedurally generated object
    var room = this.props.lumer
    var obj = {}
    //toggle domestic state of button
    this.setState( prevState => ({
      isToggleOn: !prevState.isToggleOn
    }) )
    //save state in domestic variable
    var mState = !this.state.isToggleOn
    //set key to var room & value to var mState
    obj[room] = mState
    //find current collection
    //update current attribute via var obj (procedurally generated)
    db.test.findAndModify({
      query: {"id": 1},
      update: {$set: obj},
      new: true
    }, /*function callback with stats & err*/(err, doc, lastErrorObject) => {
      if (err) {
        console.log(lastErrorObject)
        throw err
      } else {
        console.log(doc)
      }
    })
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