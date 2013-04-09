var express = require('express');
var configurations = module.exports;
var app = express();
var server = require('http').createServer(app);
var nconf = require('nconf');
var settings = require('./settings')(app, configurations, express);
var nunjucks = require('nunjucks');
var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('views'));

env.express(app);
nconf.argv().env().file({ file: 'local.json' });

app.get('/', function (req, res) {
  res.render('index.html');
});

app.listen(process.env.PORT || nconf.get('port'));
