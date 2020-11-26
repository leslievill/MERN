var mongoose = require('mongoose');

var tokenSchema = new mongoose.Schema({
 current:String 
}); // Must have this in order to use push with this version of mongo
// Override 'toJSON' to prevent the password from being returned with the user



var Token = mongoose.model('Token', tokenSchema);

module.exports = Token;