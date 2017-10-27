module.exports = function(mongoose){
    var urlSchema = mongoose.Schema({
        url: String,
        urlEncoded: String
    });
};