const newWebpackMiddle = require('webpack-express-middleware'),
 config = require('./webpack.config.js'),
 compiler = require('webpack')(config),
 express = require('express'),
 colors = require('colors'),
 ip = require('ip'),
 app = express()

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