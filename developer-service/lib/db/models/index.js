const mongoose = require('mongoose');
const {ApiKeysSchema,DevelopersSchema} = require('../schemas');
const ApiKeys = mongoose.model('APIKEYS',ApiKeysSchema);
const Developers = mongoose.model('Developers',DevelopersSchema);



module.exports = {ApiKeys,Developers};