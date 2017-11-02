const newWebpackMiddle = require('webpack-express-middleware')
const config = require('./webpack.config.js')
const compiler = require('webpack')(config)
const express = require('express')
const colors = require('colors')
const ip = require('ip')
const app = express()

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