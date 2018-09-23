const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SubscriberSchema = new Schema({
    accounts:[{
        phone:{type:String, required:true, index:true},
        balance:{type:Number, default:0},
        namespace:{type:String,required:true}
    }],

    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true, index:true},
});






module.exports = {SubscriberSchema};