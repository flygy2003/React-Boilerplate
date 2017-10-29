var io = require('rpi-gpio')
var fb = require('firebase')
var chalk = require('chalk')
const { spawn } = require('child_process')
var utilLog = require('util').log
var config = {
  apiKey: "AIzaSyDJ31YrXt8JAPUZHYGNRS8WNjoHaz8ssuE",
  authDomain: "home-b7104.firebaseapp.com",
  databaseURL: "https://home-b7104.firebaseio.com",
  projectId: "home-b7104",
  storageBucket: "home-b7104.appspot.com",
  messagingSenderId: "42864256502"
}
fb.initializeApp(config)

var db = fb.database().ref()
var pins = 
  /*closest to pi*/ [7, 35, 33, 31, 29, 15, 13, 11, 
  40, 38, 36, 32, 22, 18, 16, 12]/* furthest from pi */

// var pins = [7, 13, 15, 29, 31, 32, 33, 11, 40, 37, 32, 26, 22, 18, 16, 22]

var rooms = [
             'skitchen',
             'sLivingRoom',
             'sOffice',
             'sOfficeBathroom',
             'sNeekon\'sBedroom',
             'sHomeworkRoom',
             'sRyan\'sBathroom',
             'sRyan\'sBedroom',
             'sDiningRoom',
             'sGallery',
             'sGallery2',
             'sGallery3',
             'sLivingRoom 2',
             'sAtrium',
             'sLivingRoom 3']

function check_connection_status() {
  function checkInternet(cb) {
    require('dns').lookup('google.com', function (err) {
      if (err && err.code == "ENOTFOUND") {
        cb(false)
      } else {
        cb(true)
      }
    })
  }
  checkInternet(function(isConnected) {
    if (isConnected) {
      console.log(`[ ${chalk.green('OK')} ]: connection stable`)
    } else {
      console.log(`[ ${chalk.red('ERR')} ]: connection unstable: ping failed`)
      console.log(`[ ${chalk.yellow('EXEC')} ]: spawning offline mode`)
      var child_ = spawn('node offline.js')
    }
  })()
}
setInterval(check_connection_status, 10000)

io.setup(pins[0], io.DIR_OUT, () => {
  db.child(`rooms/${rooms[0]}`)
  .on('value', (snapshot) => { //kitchen0
    io.write(pins[0], snapshot.val(), (err) => {
      if (err) {
        throw err
      }
    })
  })
})
io.setup(pins[1], io.DIR_OUT, () => {
  db.child(`rooms/${rooms[9]}`)
  .on('value', (snapshot) => { //Gallery9
    io.write(pins[1], snapshot.val(), (err) => {
      if (err) {
        throw err
      }
    })
  })
})

io.setup(pins[2], io.DIR_OUT, () => {
  db.child(`rooms/${rooms[5]}`)
  .on('value', (snapshot) => { // Homework Room5
    io.write(pins[2], snapshot.val(), (err) => {
      if (err) {
        throw err
      }
    })
  })
})
io.setup(pins[3], io.DIR_OUT, () => {
  db.child(`rooms/${rooms[1]}`)
    .on('value', (snapshot) => { //Living room1
    io.write(pins[3], snapshot.val(), (err) => {
      if (err) {
        throw err
      }
    })
  })
})
io.setup(pins[4], io.DIR_OUT, () => {
  db.child(`rooms/${rooms[10]}`)
    .on('value', (snapshot) => { //Gallery 9:10:11
    io.write(pins[4], snapshot.val(), (err) => {
      if (err) {
        throw err
      }
    })
  })
})
io.setup(pins[5], io.DIR_OUT, () => {
  db.child(`rooms/${rooms[12]}`)
    .on('value', (snapshot) => { //Living Room 2:12
    io.write(pins[5], snapshot.val(), (err) => {
      if (err) {
        throw err
      }
    })
  })
})
io.setup(pins[6], io.DIR_OUT, () => {
  db.child(`rooms/${rooms[8]}`)
    .on('value', (snapshot) => { //Dining Room8
    io.write(pins[6], snapshot.val(), (err) => {
      if (err) {
        throw err
      }
    })
  })
})
io.setup(pins[7], io.DIR_OUT, () => {
  db.child(`rooms/${rooms[13]}`)
    .on('value', (snapshot) => { //Atrium13
    io.write(pins[7], snapshot.val(), (err) => {
      if (err) {
        throw err
      }
    })
  })
})
io.setup(pins[8], io.DIR_OUT, () => {
  db.child(`rooms/${rooms[0]}`)
    .on('value', (snapshot) => { //Kitchen0
    io.write(pins[8], snapshot.val(), (err) => {
      if (err) {
        throw err
      }
    })
  })
})
io.setup(pins[9], io.DIR_OUT, () => {
  db.child(`rooms/${rooms[14]}`)
    .on('value', (snapshot) => { //Living Room 3:14
    io.write(pins[9], snapshot.val(), (err) => {
      if (err) {
        throw err
      }
    })
  })
})
io.setup(pins[10], io.DIR_OUT, () => {
  db.child(`rooms/${rooms[0]}`)
    .on('value', (snapshot) => { //Kitchen Flourescent:0
    io.write(pins[10], snapshot.val(), (err) => {
      if (err) {
        throw err
      }
    })
  })
})
io.setup(pins[11], io.DIR_OUT, () => {
  db.child(`rooms/${rooms[3]}`)
    .on('value', (snapshot) => { // Open:none
    io.write(pins[11], snapshot.val(), (err) => {
      if (err) {
        throw err
      }
    })
  })
})
io.setup(pins[12], io.DIR_OUT, () => {
  db.child(`rooms/${rooms[2]}`)
    .on('value', (snapshot) => { //Office2
    io.write(pins[12], snapshot.val(), (err) => {
      if (err) {
        throw err
      }
    })
  })
})
io.setup(pins[13], io.DIR_OUT, () => {
  db.child(`rooms/${rooms[4]}`)
    .on('value', (snapshot) => { //Neekon's Bedroom4
    io.write(pins[13], snapshot.val(), (err) => {
      if (err) {
        throw err
      }
    })
  })
})
io.setup(pins[14], io.DIR_OUT, () => {
  db.child(`rooms/${rooms[0]}`)
    .on('value', (snapshot) => { //Kitchen0
    io.write(pins[14], snapshot.val(), (err) => {
      if (err) {
        throw err
      }
    })
  })
})
io.setup(pins[15], io.DIR_OUT, () => {
  db.child(`rooms/${rooms[11]}`)
    .on('value', (snapshot) => { //Gallery 3:11
    io.write(pins[15], snapshot.val(), (err) => {
      if (err) {
        throw err
      }
    })
  })
})
