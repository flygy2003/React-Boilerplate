// firebase = require('firebase')
// var config = {
//   apiKey: "AIzaSyDJ31YrXt8JAPUZHYGNRS8WNjoHaz8ssuE",
//   authDomain: "home-b7104.firebaseapp.com",
//   databaseURL: "https://home-b7104.firebaseio.com",
//   projectId: "home-b7104",
//   storageBucket: "home-b7104.appspot.com",
//   messagingSenderId: "42864256502"
// }
// firebase.initializeApp(config)
// let database = firebase.database()
// // for (var i = 0; i<=30; i++) {
// //   database.ref(`VirtualDB/${i}`)
// //     .once('value')
// //     .then(snapshot => {
// //       console.log(`The name is: ${snapshot.val().name}`)
// //       console.log(`The state is: ${snapshot.val().state}`)
// //     })
// // }
// var range = [0, 1, 2, 3, 4, 5, 6, 7, 8,
//   9, 10, 11, 12, 13, 14, 15,
//   16, 17, 18, 19, 20, 21, 22,
//   23, 24, 25, 26, 27, 28, 29, 30]
// range.forEach(item => {
//   database.ref(`VirtualDB/${item}`)
//     .once('value')
//     .then(snapshot => {
//       console.log(snapshot.val())
//     })
// })