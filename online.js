const io = require('rpi-gpio'),
 fb = require('firebase'), 
 chalk = require('chalk'), 
 utilLog = require('util').log, 
 config = {
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
var num_children = 0
function master_network_if_manager() {
  require('dns').lookup('google.com', function (err) {
    if (err && err.code == "ENOTFOUND") {
      console.log(`[ ${chalk.red('ERR')} ]: connection unstable: ping failed`)
      console.log(`[ ${chalk.yellow('EXEC')} ]: spawning offline mode`)
      if (num_children == 0) {
        var spawn = require('child_process').spawn,
        child_ = spawn('node', ['offline.js'])
        num_children = 1
        console.log(`[ ${chalk.blue('i')} ]: Spawned Child Process @ PID: ${child_.pid}`)
      } else {
        console.log(`[ ${chalk.blue('i')} ]: [${chalk.orange(num_children)}] Child(ren) already spawned. Continuing`)
      }
    } else {
      console.log(`[ ${chalk.green('OK')} ]: connection stable`)
      if (num_children == 1){
        console.log(`[ ${chalk.yellow('EXEC')} ]: killing child_process`)
        child_.kill()
        num_children = 0
        console.log(`[ ${chalk.yellow('EXEC')} ]: child_process killed`)
      } else {
        console.log(`[ ${chalk.blue('i')} ]: Nothing to kill; continuing`)
      }
    }
  })
}
setInterval(master_network_if_manager, 1000)

io.setup(pins[0], io.DIR_OUT, () => {
  db.child(`rooms/${rooms[0]}`)
  .on('value', (snapshot) => { //kitchen0
    io.write(pins[0], snapshot.val(), (err) => {
      if (err) {
        throw err
      } else {
        console.log(`[ ${chalk.blue('i')} ]: ${rooms[0]} set => ${snapshot.val()}`)
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
      } else {
        console.log(`[ ${chalk.blue('i')} ]: ${rooms[9]} set => ${snapshot.val()}`)
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
      } else {
        console.log(`[ ${chalk.blue('i')} ]: ${rooms[5]} set => ${snapshot.val()}`)
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
      } else {
        console.log(`[ ${chalk.blue('i')} ]: ${rooms[1]} set => ${snapshot.val()}`)
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
      } else {
        console.log(`[ ${chalk.blue('i')} ]: ${rooms[10]} set => ${snapshot.val()}`)
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
      } else {
        console.log(`[ ${chalk.blue('i')} ]: ${rooms[12]} set => ${snapshot.val()}`)
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
      } else {
        console.log(`[ ${chalk.blue('i')} ]: ${rooms[8]} set => ${snapshot.val()}`)
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
      } else {
        console.log(`[ ${chalk.blue('i')} ]: ${rooms[13]} set => ${snapshot.val()}`)
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
      } else {
        console.log(`[ ${chalk.blue('i')} ]: ${rooms[0]} set => ${snapshot.val()}`)
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
      } else {
        console.log(`[ ${chalk.blue('i')} ]: ${rooms[14]} set => ${snapshot.val()}`)
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
      } else {
        console.log(`[ ${chalk.blue('i')} ]: ${rooms[0]} set => ${snapshot.val()}`)
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
      } else {
        console.log(`[ ${chalk.blue('i')} ]: ${rooms[3]} set => ${snapshot.val()}`)
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
      } else {
        console.log(`[ ${chalk.blue('i')} ]: ${rooms[2]} set => ${snapshot.val()}`)
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
      } else {
        console.log(`[ ${chalk.blue('i')} ]: ${rooms[4]} set => ${snapshot.val()}`)
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
      } else {
        console.log(`[ ${chalk.blue('i')} ]: ${rooms[0]} set => ${snapshot.val()}`)
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
      } else {
        console.log(`[ ${chalk.blue('i')} ]: ${rooms[11]} set => ${snapshot.val()}`)
      }
    })
  })
})