var express = require('express');
var app = express();
require('dotenv').config();
var mongoose = require('mongoose');
var helpers = require('./lib/helpers.js');
var validator = require('validator')
var PORT = process.env.PORT || 3000;
var model = require('./models/model.js')

//TODO: get all this crap into a module
mongoose.connect(process.env.MLAB);
var db = mongoose.connection;
db.once('open', function(){
    console.log('connected to db');
});
//creating model
var Url = model(mongoose);

/*
    TODO: This is ugly, needs middleware and modulized.
    Needs to be changed to JSON output??
    */
app.post('/api/url/new/:url', function(req, res){
    //TODO: add blacklist and check for existing entries
    console.log(req.params.url);
    if (validator.isURL(req.params.url)){
        var encodedUrl = helpers.urlEncoder(req.params.url);
        console.log(encodedUrl);
        var newUrl = new Url({url: req.params.url, encoded: encodedUrl});
        newUrl.save(function(err){
            if (!err){
                res.send({newUrl:'https://evening-springs-61916.herokuapp.com/' + encodedUrl});
            };

        });
    } else {
        res.send({newUrl: 'invalid url'});
    };
    
});

//fetch urls
app.get('/:encoded', function(req, res){
    console.log(req.params.encoded)
    if (validator.isAlphanumeric(req.params.encoded)){
        Url.findOne({'encoded': req.params.encoded}, 'url encoded', function(err, url){
            if(err){
                res.send({url:'not found'});
            } else {
                res.send({url: url.url});
            };
        });
    } else {
        res.send('invalid url');
    }
});


//TODO: Add homepage with instructions
app.get('/', function(req, res){
    res.send('Hello');
});
//server
app.listen(PORT, function(){
    console.log('Server started on ' + PORT);
});