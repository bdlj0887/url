var base62 = require('base62');


module.exports = {
    urlEncoder: function() {
        var time = Date.now();
        var encoded = base62.encode(time - 1487897500000);
        return encoded;
    },
    

};