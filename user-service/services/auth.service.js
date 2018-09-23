"use strict";
const Promise = require('bluebird');
const {User} = require('../lib/db');
const jwt = require('jsonwebtoken');

const db = require('./auth');


module.exports = {
	name: "auth",

	/**
	 * Service settings
	 */
	settings: {

	},

	/**
	 * Service dependencies
	 */
	dependencies: [],	

	/**
	 * Actions
	 */
	actions: {

		/**
		 * Say a 'Hello'
		 *
		 * @returns
		 */
		login(ctx) {
            return Promise.resolve(ctx)
                        .then(ctx=>{
                            return User.findOne({email:ctx.params.email})
                                        .then(user=> !user?{success:false} : {success:true,user})
						}).then(res=>{
							if(res.success ===false){
								return res;
							}

							let token = jwt.sign({email:res.user.email,phone:res.user.phone},process.env.JWT_LOGIN_SECRET);

							return {firstName:res.user.firstName,lastName:res.user.lastName,phone:res.user.phone,token:token};
						})
						.catch(err=>{return {success:false,err:err}});
        },
        
        /**
		 * Say a 'Hello'
		 *
		 * @returns
		 */
		register(ctx) {
            let user = {
                firstName:ctx.params.firstName,
                lastName:ctx.params.lastName,
                otherNames:ctx.params.otherNames,
                email:ctx.params.email,
                phone:ctx.params.phone,
                mobileMoney:ctx.params.mobileMoney,
                password:ctx.params.password
            }

            return Promise.resolve(ctx)
                        .then(ctx=>{
                          return  User.create(user)
                                .then(newUser=>{
                                 
                                    return {sucess:true,user:newUser}
                                })
                                    .catch(err=>{
            
                                        return {success:false,error:err}
                                    });
                        }).catch(err=>{

                           return  {success:false,error:err}
                        });
		},


        /**
		 * Say a 'Hello'
		 *
		 * @returns
		 */
		emailverification() {
			return "email verified";
		},


        // /**
		//  * Say a 'Hello'
		//  *
		//  * @returns
		//  */
		// hello() {
		// 	return "Hello Moleculer";
		// },


        /**
		 * Say a 'Hello'
		 *
		 * @returns
		 */
		resendemailverification() {
			return "email verification resent";
        }, 

        isuser(ctx){
			return Promise.resolve(ctx)
							.then(ctx=> ctx.params.token ? ctx.params.token : null)
								.then(token=>{
									if(!token || token===undefined){return {success:false,err:token}}
									return jwt.verify(token,process.env.JWT_LOGIN_SECRET,function(err,user){


										if(err){return {success:false,err:err}}
										return {success:true,user:user}
									});
								}).then(res=>{
									if(res.success === false){return  {success:false,err:err} };

									return User.findOne({email:res.user.email})
										.then(user=> !user ? {success:false} : {success:true, id:user._id ,email:user.email,phone:user.phone, api_keys:user.api_keys})
								})
                                .catch(err=>{return {success:false,err:err}});
							
        }
    },

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {
		
	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	stopped() {

	}
};