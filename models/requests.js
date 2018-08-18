const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var requestSchema = new Schema({
  username : { type : String, required : true},
  type : {  type : String, required : true}
  });

  var requestModel = mongoose.model('request', requestSchema);
  module.exports = requestModel;
