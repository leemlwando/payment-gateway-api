const mongoose = require('mongoose');


const conn = mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,{useNewUrlParser:true});






const db = mongoose.connection;

db.on('open',()=>console.log('database started...'));
db.on('error',err=>console.log(err));



module.exports = conn;