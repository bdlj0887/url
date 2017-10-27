module.exports = function(mongoose){
    var Schema = mongoose.Schema;
    var urlSchema = new Schema({
        url: 'string',
        encoded: 'string'
    });
    var Url = mongoose.model('Url', urlSchema);
    return Url;
};