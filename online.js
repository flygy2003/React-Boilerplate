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
var db = fb.database()
// var pins = 
//   /*closest to pi*/ [7, 35, 33, 31, 29, 15, 13, 11, 
//   40, 38, 36, 32, 22, 18, 16, 12]/* furthest from pi */
for (let relay = 0; relay <= 30; relay++) {
  db.ref(`VirtualDB/${relay}/pin`).on('value', (snapshot, err) => {
		if (snapshot.val() != null) {
			snapshot.val().forEach(pin => {
				io.setup(pin, io.DIR_OUT, () => {
					db.ref(`VirtualDB/${relay}`)
						.on('value', (snapshot) => {
							io.write(pin, snapshot.val().state, (err) => {
								if (err) {
									throw err
								} else {
									console.log(`[ ${chalk.blue('i')} ]: ${snapshot.val().name} set => ${snapshot.val().state}`)
								}
							})
						})
				})
			})
		} if (err) {
			return
		} else {
			console.log(`${relay} as id returned: null`)
		}
  })
}
let num_children = 0
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
        console.log(`[ ${chalk.blue('i')} ]: [${chalk.yellow(num_children)}] Child(ren) already spawned. Continuing`)
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