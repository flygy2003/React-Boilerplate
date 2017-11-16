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
// var pins = 
//   /*closest to pi*/ [7, 35, 33, 31, 29, 15, 13, 11, 
//   40, 38, 36, 32, 22, 18, 16, 12]/* furthest from pi */
var combo = {
  'skitchen': [7, 40, 36, 16],
  'sLivingRoom': [31],
  'sOffice': [22, 32],
  'sNeekon\'sBedroom': [18],
  'sHomeworkRoom': [33],
  'sDiningRoom': [13],
  'sGallery': [35],
  'sGallery2': [29],
  'sGallery3': [12],
  'sLivingRoom 2': [15],
  'sAtrium': [11],
  'sLivingRoom 3': [38]},
  rooms = [
    'skitchen',
    'sLivingRoom',
    'sOffice',
    'sNeekon\'sBedroom',
    'sHomeworkRoom',
    'sDiningRoom',
    'sGallery',
    'sGallery2',
    'sGallery3',
    'sLivingRoom 2',
    'sAtrium',
    'sLivingRoom 3'],
    num_children = 0
    rooms.forEach(item => {
      io.setup(combo[item], io.DIR_OUT, () => {
        db.child(`rooms/${item}`)
        .on('value', (snapshot) => {
          io.write(combo[item], snapshot.val(), (err) => {
            if (err) {
              throw err
            } else {
              console.log(`[ ${chalk.blue('i')} ]: ${item} set => ${snapshot.val()}`)
            }
          })
        })
      })
  })
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
