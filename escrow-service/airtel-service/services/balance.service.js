"use strict";
const {Subscriber} = require('../lib/db/models');
const Promise = require('bluebird');
module.exports = {
	name: "balance",

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
		enquiry(ctx) {
            let prefix_1 = "+26097";
            let prefix_2 = "097";
			let phone = ctx.params.mobile_money_id;
			let namespace = ctx.params.namespace ? ctx.params.namespace : undefined;
			let min_balance = ctx.params.min_balance ? ctx.params.min_balance : null;
			let max_balance = ctx.params.max_balance ? ctx.params.max_balance : null;
            if((phone.startsWith(prefix_1) && phone.length === 13) || (phone.startsWith(prefix_2) && phone.length === 10 )){

			let last_nine_num = ctx.params.phone ? ctx.params.phone.slice(-9) : null;
			console.log(namespace,min_balance,max_balance,phone)
			return Promise.resolve(Subscriber.findOne({accounts:{$elemMatch:{phone:phone, namespace:namespace}}}, "accounts email"))
						.then(res=>{
							if(!res){
								return {success:false,code:404, msg:"could not find subsriber"}
							}
							
							return {success:true,service:"airtel-mobile-money", balance:res.accounts[0].balance, charge:0,denomination:"ZMK",phone:res.accounts[0].phone,
							account_namespace:res.accounts[0].namespace, id:res._id, date:new Date()};
						}).catch(err=>{return {success:false,msg:"server error",service:"mtn"}})
			
			// {success:true,service:"mtn-mobile-money", balance:account.balance, charge:0,denomination:"ZMK",phone:ctx.params.phone, id:last_nine_num, date:new Date()};

            }

            return {success:false, msg:"please provide a valid phone number"}
            
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