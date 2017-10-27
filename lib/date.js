var Base62 = require('base62');
var time = Date.now();
var encoded = Base62.encode(time);
var altEncoded = Base62.encode(time - 1487897500000);
console.log(time);
console.log(encoded);
console.log(altEncoded);

