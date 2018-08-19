const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var generalSchema = new Schema({
  name : { type : String, required : true},
  username : { type : String, required : true},
  email : { type : String , required : true},
  contact : { type : String , required : true},
  address : { type : String , required : true},
  password : { type : String, required : true},
  credit : { type : Number , default : 0}
  });
var collectorSchema = new Schema({
  name : { type : String, required : true},
  username : { type : String, required : true},
  email : { type : String , required : true},
  contact : { type : String , required : true},
  address : { type : String , required : true},
  password : { type : String, required : true},
  });
var workerSchema = new Schema({
  name : { type : String, required : true},
  username : { type : String, required : true},
  email : { type : String , required : true},
  contact : { type : String , required : true},
  address : { type : String , required : true},
  password : { type : String, required : true},
  paper : { type : Number, default : 0},
  metal : { type : Number, default : 0},
  cardboard : { type : Number, default : 0},
  plastic : { type : Number, default : 0},
  glass : { type : Number, default : 0}
  });
var industrySchema = new Schema({
  name : { type : String, required : true},
  username : { type : String, required : true},
  email : { type : String , required : true},
  contact : { type : String , required : true},
  address : { type : String , required : true},
  password : { type : String, required : true},
  });
var buyerSchema = new Schema({
  name : { type : String, required : true},
  username : { type : String, required : true},
  email : { type : String , required : true},
  contact : { type : String , required : true},
  address : { type : String , required : true},
  password : { type : String, required : true},
});

var generalModel = mongoose.model('general', generalSchema);
var collectorModel = mongoose.model('collector', collectorSchema);
var workerModel = mongoose.model('worker', workerSchema);
var industryModel = mongoose.model('industry', industrySchema);
var buyerModel = mongoose.model('buyer', buyerSchema);
module.exports = {generalModel,collectorModel,workerModel,industryModel,buyerModel}
