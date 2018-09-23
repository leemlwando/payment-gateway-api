"use strict";
const Promise = require('bluebird');
module.exports = {
	name: "registry",

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
		create_account(ctx) {
			return Promise.resolve(ctx)
				.then(ctx=>{
					return this.broker.call("account.create", ctx.params, {nodeID:"interbank-service"}).then(res=>{
									
								return {response:res,service:"escrow"}
							}).catch(err=>{
								console.log(err)
								return {success:false,msg:"error",service:"escrow"}
							})
				}).catch(err=>{
					return {success:false,service:"escrow", err:err}
				});
		},

		create_bank(ctx) {
			console.log(ctx.params);
			return Promise.resolve(ctx)
						.then(ctx=>{
							return this.broker.call("registry.create", ctx.params, {nodeID:"interbank-service"}).then(res=>{
								console.log(res)
										return {success:true,res,service:"escrow"}
									}).catch(err=>{
										console.log(err)
										return {success:false,msg:"error",service:"escrow"}
									})
						}).catch(err=>{
							return {success:false,service:"escrow", err:err}
						});
		},

		/**
		 * Welcome a username
		 *
		 * @param {String} name - User name
		 */
		welcome: {
			params: {
				name: "string"
			},
			handler(ctx) {
				return `Welcome, ${ctx.params.name}`;
			}
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