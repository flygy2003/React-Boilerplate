firebase = require('firebase')
var config = {
  apiKey: "AIzaSyDJ31YrXt8JAPUZHYGNRS8WNjoHaz8ssuE",
  authDomain: "home-b7104.firebaseapp.com",
  databaseURL: "https://home-b7104.firebaseio.com",
  projectId: "home-b7104",
  storageBucket: "home-b7104.appspot.com",
  messagingSenderId: "42864256502"
}
firebase.initializeApp(config)
let database = firebase.database()
for (var i = 0; i<=30; i++) {
  database.ref(`VirtualDB/${i}`)
    .once('value')
    .then(snapshot => {
      console.log(`The name is: ${snapshot.val().name}`)
      console.log(`The state is: ${snapshot.val().state}`)
    })
}