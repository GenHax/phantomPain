const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var generalSchema = new Schema({
  name : { type : String, required : true, default : ''},
  username : { type : String, required : true, default : ''},
  email : { type : String , required : true, default : ''},
  contact : { type : String , required : true, default : ''},
  address : { type : String , required : true, default : ''},
  credit : { type : Number , default : 0}
  });
var collectorSchema = new Schema({
  name : { type : String, required : true, default : ''},
  username : { type : String, required : true, default : ''},
  email : { type : String , required : true, default : ''},
  contact : { type : String , required : true, default : ''},
  address : { type : String , required : true, default : ''},
  });
var workerSchema = new Schema({
  name : { type : String, required : true, default : ''},
  username : { type : String, required : true, default : ''},
  email : { type : String , required : true, default : ''},
  contact : { type : String , required : true, default : ''},
  address : { type : String , required : true, default : ''},
  });
var industrySchema = new Schema({
  name : { type : String, required : true, default : ''},
  username : { type : String, required : true, default : ''},
  email : { type : String , required : true, default : ''},
  contact : { type : String , required : true, default : ''},
  address : { type : String , required : true, default : ''},
  });
var buyerSchema = new Schema({
  name : { type : String, required : true, default : ''},
  username : { type : String, required : true, default : ''},
  email : { type : String , required : true, default : ''},
  contact : { type : String , required : true, default : ''},
  address : { type : String , required : true, default : ''},
});

var generalModel = mongoose.model('general', generalSchema);
var collectorModel = mongoose.model('collector', collectorSchema);
var workerModel = mongoose.model('worker', workerSchema);
var industryModel = mongoose.model('industry', industrySchema);
var buyerModel = mongoose.model('buyer', buyerSchema);
module.exports = {generalModel,collectorModel,workerModel,industryModel,generalModel}
