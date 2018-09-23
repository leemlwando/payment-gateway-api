const mongoose = require('mongoose');


const conn = mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-vsuza.mongodb.net/${process.env.DB_NAME}?retryWrites=true`);






const db = mongosee.connection;

db.on('open',()=>console.log('database started...'));
db.on('error',err=>console.log(err));



module.exports = conn;