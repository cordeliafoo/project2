var express = require('express')
var app = express()

var port = process.env.PORT || 5000

// set up the ejs template
app.set('view engine', 'ejs')

var ejsLayouts = require('express-ejs-layouts')
app.use(ejsLayouts)


app.get('/', function(req, res){
  res.send('homepage')
})

app.use(function (req, res) {
  res.send('error found')
})


app.listen(port, function () {
  console.log('app is running at ' + port)
})
