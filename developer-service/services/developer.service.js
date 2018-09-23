"use strict";
const Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const {ApiKeys,Developers}  = require('../lib/db');
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
		requestapikey(ctx) {

			let self = this;
			return Promise.resolve(ctx)
						.then(ctx=>{

							let key = {
								api_key_namespace:ctx.params.user.namespace,
								api_key_name:ctx.params.user.api_key_name,
								user:ctx.params.user
							}
							let apiKey = jwt.sign(ctx.params.user, process.env.API_KEY_SECRET);
								let newapikey = {
									api_key_namespace:ctx.params.user.namespace,
									api_key_name:ctx.params.user.api_key_name,
									api_key:apiKey
								}
							return self.broker.call("developer.addapikey", {email:ctx.params.user.email,api_key:newapikey},{nodeID:"user-service"})
								.then(res=>{
									return res
								}).catch(err=>{return {success:false,apiKey:null}});
							

						}).catch(err=>{
							return	{success:false,apiKey:null}
						});
            
		},

		verifyapikey(ctx){
				let self = this;
			return Promise.resolve(ctx)
						.then(ctx=>{
							return jwt.verify(ctx.params.api_key,process.env.API_KEY_SECRET,function(err,key){
								if(err){return {success:false,err:err}};
								return self.broker.call("auth.isuser",ctx.params,{nodeID:"user-service"})
											.then(res=>{
												if(res.success === false){return {success:false,user:null,msg:"token was not authenticated, please log in or signup"}};

												//verify data
												if(ctx.params.user.email.toString() !== res.email.toString()){
													return {success:false,msg:"invalid token"}
												}

												if(ctx.params.user.phone.toString() !== res.phone){
													return {success:false,msg:"invalid token"}
												}

									let v = res.api_keys.filter((keys,i)=>{
										return key.namespace.toString()===keys.api_key_namespace && key.api_key_name.toString()=== keys.api_key_name.toString()
									});
												if(v.length === 1){
													return {success:true,msg:"token verified" }
												}

												return {success:false, msg:"token invalid.might have dupliacte keys, please delete any duplicate keys"}
											})
												.catch(err=>null)
							});
						}).catch(err=>{return {success:false,msg:"invalid token",err:err}});
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