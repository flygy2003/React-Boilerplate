const newWebpackMiddle = require('webpack-express-middleware'),
  compiler = require('webpack')(config),
  express = require('express'),
  colors = require('colors'),
  config = require('./webpack.config.js'),
  app = express()
  io = require('socket.io')(80),
  ip = require('ip'),

app.set('port', process.env.PORT || 80);

const webpack = newWebpackMiddle(compiler, config);
webpack(app)
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

io.on('connection', (socket) => {
  socket.on('switch', function (data) {
    console.log(data);
  })
  socket.on('all', function (data) {
    console.log(data);
  })
})

app.use('*', express.static(__dirname + '/src/static'))

app.get('*', (req, res) => {
  // send the html file
  res.sendFile(__dirname + '/src/index.html')
  console.log('[' + 'OK'.green + ']' + ' GET request was received and served!')
})

app.listen(app.get('port'), webpack.listen, () => {
  console.log('[' + 'OK'.green + ']' + ' WebApp listening @ ' + 'localhost'.red + ':' + ip.address().blue + ':' + app.get('port'))
})