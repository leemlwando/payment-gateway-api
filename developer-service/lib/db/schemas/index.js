const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DevelopersSchema = new Schema({
    developer:{type:Schema.Types.ObjectId, refPath:"opga-users-management.users"},
    api_keys:[{type:Schema.Types.ObjectId, ref:"APIKEYS"}]
});


const ApiKeysSchema = new Schema({
    api_key:{
        namespace:String,
        name:{type:String,required:true},
        key:{required:true,type:String}
    }

});




module.exports = {DevelopersSchema,ApiKeysSchema};