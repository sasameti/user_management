/**
 * Created by sajad on 10/13/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var bcrypt = require('bcrypt-nodejs');
var autoIncrement = require('mongoose-auto-increment');
//var connection = mongoose.createConnection('mongodb://localhost/mydb');
var connection = mongoose.connection;
//passportlocalmongoose= require('passport-local-mongoose');
autoIncrement.initialize(connection);
var UserDataSchema = new Schema({
    id: {type:String,required:true},
    username: {type:String,required:true},
    password: {type:String, required:true},
    email: {type:String, required:true},
    firstName: String,
    lastName: String,
    Access : {type:String, required:true},
    Description: String,
    Verified: String,
    Key : Number

});

//UserDataSchema.methods.encryptPassword = function (password) {
  //return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
//};
//UserDataSchema.methods.validPassword = function (password) {
  //return bcrypt.compareSync(password,this.password);

//};
UserDataSchema.plugin(autoIncrement.plugin, {
    model: 'User_Data',
    field: 'id',
    startAt:1,
    incrementBy:1
});
//var options = ({missingPasswordError:"Wrong password"});
//UserDataSchema.plugin(passportlocalmongoose,options);

module.exports = mongoose.model('User_Data',UserDataSchema);
