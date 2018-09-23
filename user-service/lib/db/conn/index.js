const mongoose = require('mongoose');


const conn = mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,{useNewUrlParser:true})


module.exports = conn;


