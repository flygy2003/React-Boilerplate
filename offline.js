const newWebpackMiddle = require('webpack-express-middleware'),
  compiler = require('webpack')(config),
  express = require('express'),
  colors = require('colors'),
  config = require('./webpack.config.js'),
  app = express(),
  io = require('socket.io')(http),
  ip = require('ip'),
  sw = require('rpi-gpio'),
  webpack = newWebpackMiddle(compiler, config)
  webpack(app)
  app.set('port', process.env.PORT || 80)
  
  app.use('*', express.static(__dirname + '/src/static'))
  
  app.get('*', (req, res) => {
    // send the html file
    res.sendFile(__dirname + '/src/index.html')
    console.log('[' + 'OK'.green + ']' + ' GET request was received and served!')
  })
  
  app.listen(app.get('port'), webpack.listen, () => {
    console.log('[' + 'OK'.green + ']' + ' WebApp listening @ ' + 'localhost'.red + ':' + ip.address().blue + ':' + app.get('port'))
  })
var rooms = {
  'kitchen': [7, 40, 36, 16],
  'livingroom': [31],
  'livingroom2': [15],
  'livingroom3': [38],
  'gallery': [35],
  'gallery2': [29],
  'gallery3': [12],
  'office': [22, 32],
  'neekonsbedroom': [18],
  'homeworkroom': [33],
  'diningroom': [13],
  'atrium': [11]
}
var states = {
  'kitchen': true,
  'livingroom': true,
  'livingroom2': true,
  'livingroom3': true,
  'gallery': true,
  'gallery2': true,
  'gallery3': true,
  'office': true,
  'neekonsbedroom': false,
  'homeworkroom': false,
  'diningroom': true,
  'atrium': true
}
function switchSingle(id, state) {
  rooms[id].forEach((value) => {
    sw.setup(value, sw.DIR_OUT, () => {
      sw.write(value, value, (err) => {if (err) {throw err}})
    })
  })
}
function master_network_if_manager() {
  require('dns').lookup('google.com', function (err) {
    if (err && err.code == "ENOTFOUND") {
      console.log('ok')
    } else {
      socket.broadcast.emit('=>online<=')
    }
  })
}
io.on('connection', (socket) => {
  setInterval(master_network_if_manager, 500)
  socket.on('req', (data) => {
    socket.emit(`res`, {id: data, data: states[data]})
  })
  socket.on('switchOn', (data) => {
    switchSingle(data, true)
    socket.broadcast.emit(`rt`, {id: data, data: true})
  })
  socket.on('switchOff', (data) => {
    switchSingle(data, false)
    socket.broadcast.emit(`rt`, {id: data, data: false})
  })
  socket.on('allOn', () => {
    rooms.forEach(item => {
      switchSingle(item, true)
      socket.broadcast.emit(`rt`, {id: 'all', data: true})
    })
  })
  socket.on('allOff', () => {
    rooms.forEach(item => {
      switchSingle(item, false)
      socket.broadcast.emit(`rt`, {id: 'all', data: false})
    })
  })
})