const newWebpackMiddle = require('webpack-express-middleware'),
  compiler = require('webpack')(config),
  express = require('express'),
  colors = require('colors'),
  config = require('./webpack.config.js'),
  app = express(),
  io = require('socket.io')(8080),
  ip = require('ip'),
  sw = require('rpi-gpio'),
  webpack = newWebpackMiddle(compiler, config)
  webpack(app)

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
  function switchSingle(id, state) {
    if(rooms[id].length == 1) {
      sw.setup(rooms[id], sw.DIR_OUT, () => {
        sw.write(rooms[id], state, (err) => {
          if (err) {
            throw err
          }
        })
      })
    } if(rooms[id].length >= 1) {
      rooms[id].forEach(value => {
        sw.setup(rooms[id], sw.DIR_OUT, () => {
          sw.write(rooms[id], value, (err) => {
            if (err) {
              throw err
            }
          })
        })
      })
    }
  }
  
  io.on('connection', (socket) => {
    socket.on('switchOn', (data) => {
      console.log(data)
      switchSingle(data, true)
    })
    socket.on('switchOff', (data) => {
      console.log(data)
      switchSingle(data, false)
    })
    socket.on('allOn', (data) => {
      console.log(data)
      rooms.forEach(item => {
        switchSingle(item, true)
      })
    })
    socket.on('allOff', (data) => {
      console.log(data)
      rooms.forEach(item => {
        switchSingle(item, false)
      })
    })
})
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