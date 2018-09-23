const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {User} = require('../db');

module.exports = {

    initialize: ()=>{return passport.initialize()},
    session:()=>{return passport.session()},
    jwtStrategy:()=>{
        return passport.use(new jwtStrategy({
            secretOrKey:process.env.JWT_LOGIN_SECRET,
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        },function(jwt_payload,done){
            console.log('......../............/............./')
            User.findOne({email:jwt_payload.email}).then(user=> !user ? done(null,false) : done(null,user))
                .catch(err=>done(err));
        }));
    },

    serializeUser:()=>{},
    deseserializeUser:()=>{}

}