"use strict";
const {Bank} = require('../lib/db/models');
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
		create(ctx) {
           
            let bank = {
                name:ctx.params.name,
                capital:ctx.params.capital,
                accounts:ctx.params.accounts
            }
            // console.log(bank)
            if(bank.name ===undefined || bank.capital === undefined || bank.accounts===undefined){
                return {success:false, msg:"some please fill in all available fields"}
            }
            return Promise.resolve(Bank.create(bank))
                        .then(res=>{
                            if(!res){
                                return {success:false,msg:"bank not created"}
                            }
                            return {success:true,bank:res}
                        }).catch(err=>{
                            return {success:false,err:err,service:"interbank"}
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