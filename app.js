var newWebpackMiddle = require('webpack-express-middleware')
var config = require('./webpack.config.js')
var compiler = require('webpack')(config)
var express = require('express')
var colors = require('colors')
var path = require('path')
var fb = require('firebase')
var ip = require('ip')
var schedule = require('node-schedule');
var app = express()
var config = {
  apiKey: "AIzaSyDJ31YrXt8JAPUZHYGNRS8WNjoHaz8ssuE",
  authDomain: "home-b7104.firebaseapp.com",
  databaseURL: "https://home-b7104.firebaseio.com",
  projectId: "home-b7104",
  storageBucket: "home-b7104.appspot.com",
  messagingSenderId: "42864256502"
}

firebase.initializeApp(config)
var database = firebase.database().ref()

function turnAllOff() {
  database.child('/rooms/all').set(true)
  database.child('/rooms/sDiningRoom').set(true)
  database.child('/rooms/sFamilyRoom').set(true)
  database.child('/rooms/sGallery').set(true)
  database.child('/rooms/sGuestBathroom').set(true)
  database.child('/rooms/sHomeworkRoom').set(true)
  database.child('/rooms/skitchen').set(true)
  database.child('/rooms/sLibrary').set(true)
  database.child('/rooms/sLivingRoom').set(true)
  database.child('/rooms/sMasterBedroom').set(true)
  database.child('/rooms/sMasterBathrooms').set(true)
  database.child('/rooms/sNeekon\'sBedroom').set(true)
  database.child('/rooms/sOffice').set(true)
  database.child('/rooms/sAtrium').set(true)
  database.child('/rooms/sLivingRoom 2').set(true)
  database.child('/rooms/sLivingRoom3').set(true)
  database.child('/rooms/sGallery2').set(true)
  database.child('/rooms/sGallery3').set(true)
  database.child('/rooms/sOfficeBathroom').set(true)
  database.child('/rooms/sRyan\'sBedroom').set(true)
  database.child('/rooms/sRyan\'sBathroom').set(true)
}

var rule = new schedule.RecurrenceRule();
    rule.hour = 22;
    rule.minute = 45;
var j = schedule.scheduleJob(rule, function () {
  console.log('All lights off!');
  turnAllOff();
});

app.set('port', process.env.PORT || 80);

const webpack = newWebpackMiddle(compiler, config);
webpack(app)

app.use('*', express.static(__dirname + '/src/static'))

app.get('*', (req, res) => {
  // send the html file
  res.sendFile(__dirname + '/src/index.html')
  console.log('[' + 'OK'.green + ']' + ' GET request was received and served!')
})

app.listen(app.get('port'), webpack.listen, () => {
  console.log('[' + 'OK'.green + ']' + ' WebApp listening @ ' + 'localhost'.red + ':' + ip.address().blue + ':' + app.get('port'))
})
