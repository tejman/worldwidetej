
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var frontControl = require("./controls/frontControl.js")
var phantomControl = require("./controls/phantomControl.js")
var mongoose = require("mongoose");
var stylus = require("stylus");
var nib = require("nib");
var sendgrid = require("sendgrid")

var app = express();

console.log(path.dirname());

// all environments
var compile = function(str, path){
  return stylus(str)
    .set('filename', path)
    .set("compress", false)
    .use(nib())
    .import("nib");
}

app.set('port', process.env.PORT || 3010);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(stylus.middleware({
  src: path.join(__dirname, 'public'),
  compile: compile
}));
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect("mongodb://localhost/wwt");


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get("/", frontControl.landing);
app.get("/loadImages", phantomControl.getDataUrl)


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
