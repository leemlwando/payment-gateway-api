const mongoose = require('mongoose');
const {SubscriberSchema} = require('../schemas');
const Subscriber = mongoose.model('Subscribers',SubscriberSchema);



module.exports = {Subscriber};