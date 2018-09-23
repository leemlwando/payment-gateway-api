const mongoose = require('mongoose');
const {BankSchema} = require('../schemas');
const Bank = mongoose.model('Banks',BankSchema);



module.exports = {Bank};