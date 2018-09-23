const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const UserSchema = new Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    otherNames:[],
    developer:{type:Boolean,default:false},
    api_keys:[],
    email:{type:String,required:true,unique:true},
    phone:{type:String,required:true,unique:true},
    mobileMoney:{type:String},
    password:{type:String,required:true}
});



module.exports = {UserSchema}