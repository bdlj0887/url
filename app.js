var express = require('express');
var app = express();
require('dotenv').config();
var mongoose = require('mongoose');
var helpers = require('./lib/helpers.js');
var validator = require('validator')
var PORT = process.env.PORT || 3000;



//db connect
//TODO: get all this crap into a module
mongoose.connect(process.env.MLAB);
var db = mongoose.connection;
db.once('open', function(){
    console.log('connected to db');
});
//creating model
var Schema = mongoose.Schema;
var urlSchema = new Schema({
    url: 'string',
    encoded: 'string'
});

var Url = mongoose.model('Url', urlSchema);





//routing
/*
    TODO: This is ugly, needs middleware and modulized.
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
                res.send('/' + encodedUrl);
            };

        });
    } else {
        res.send('invalid url');
    };
    
});

//fetch urls
app.get('/:encoded', function(req, res){
    console.log(req.params.encoded)
    if (validator.isAlphanumeric(req.params.encoded)){
        Url.findOne({'encoded': req.params.encoded}, 'url encoded', function(err, url){
            if(err){
                res.send('not found');
            } else {
                res.send(url.url);
            };
        });
    } else {
        res.send('invalid url');
    }
});

//server
app.listen(PORT, function(){
    console.log('Server started on ' + PORT);
});