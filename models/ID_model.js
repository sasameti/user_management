/**
 * Created by sajad on 10/14/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ID_model = new Schema({
   _id:{type:String, required:true},
   seq: {type:Number,required:true, default: 0 }
});
module.exports = mongoose.model('User_ID',ID_model);