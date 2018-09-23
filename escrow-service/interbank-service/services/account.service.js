"use strict";
const {Bank} = require('../lib/db/models');
const Promise = require('bluebird');
module.exports = {
	name: "account",

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
		create(ctx) {
           let bank = ctx.params.bank;
			console.log(ctx.params)
					
			const account = {
						firstName:ctx.params.firstName,
						lastName:ctx.params.lastName,
						email:ctx.params.email,
					}

           if(bank ===undefined || account.firstName===undefined || account.lastName===undefined || account.email===undefined){
            return {success:false,msg:"some fields missing"}
       }
	   		console.log(account, bank)
           return Promise.resolve(Bank.findOneAndUpdate({name:bank}, {accounts:{$addToSet:{account}}}, {new:true}))
                    .then(res=>{
						console.log(res)
                        if(!res){
                            return {success:false,msg:"requestd bank is not registered"}
                        }
                        return {success:true,account:res}
                    }).catch(err=>{
                        return {success:false,err:err}
                    })
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