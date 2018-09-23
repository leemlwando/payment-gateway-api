const mongoose = require('mongoose');


const conn = mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-vsuza.mongodb.net/${process.env.DB_NAME}?retryWrites=true`)


module.exports = conn;


