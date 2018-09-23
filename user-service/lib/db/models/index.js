const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const {UserSchema} = require('../schema');

let saltRounds=10;

UserSchema.pre('save',function(next){
        let self = this;
    bcrypt.hash(self.password, saltRounds, function(err, hash) {
        if(err){return next(err)}
            self.password = hash;
            next()
      });
   
})


const User = mongoose.model('Users',UserSchema);



module.exports = {User}