"use strict";

const {User} = require('../lib/db');
const Promise = require('bluebird');

module.exports = {
	name: "developer",

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
		addapikey(ctx) {
            console.log(ctx.params)
            return Promise.resolve(ctx)
                        .then(ctx=>{
							return User.findOne({email:ctx.params.email})
										.then(user=>{
											let api_key_namespace = ctx.params.api_key.api_key_namespace
											let api_key_name = ctx.params.api_key.api_key_name
											if(!user){return  {success:false, msg:"no user"}}
											if(user.developer===false){
												return {success:false, msg:"please register for a developer account"}
											}
											let keys = user.api_keys.filter((key,i)=>{
												
												return key.api_key_namespace.toString() === api_key_namespace.toString() && key.api_key_name.toString() === api_key_name.toString();
											})

											if(keys.length>0){
												return  {success:false, msg:"cannot have duplicate api name within same namespace, please choose another name"};
											}

											return true;
										}).then(res=>{
									
											if(res === false || res.success ===false){
												return res
											}
											return User.findOneAndUpdate({email:ctx.params.email}, {$push:{api_keys:ctx.params.api_key}} ,{new:true})
									}).then(res=> res.success === false ? res : res)
                                        .catch(err=>{return {success:false,err:err}})
                        }).catch(err=>{return {success:false,err:err}})
		},

		register(ctx){

			return User.findOne({email:ctx.params.user.email}).then(user=>{
				if(!user){
					return {success:false, msg:"could not locate user"}
				}
				if(user.developer === true){
					return {success:false,status:200,msg:"user is already in developer mode,please procceed to register api"}
				}

				user.developer = true;
				user.save(function(err){
					if(err){
						return {success:false,msg:"error while registering developer",msg:err};
					}

					return {success:true}
				})

				return {success:true}
			}).catch(err=>{return {success:false , err:err}})
		},
	
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