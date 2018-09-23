"use strict";
const {Subscriber} = require('../lib/db');
const Promise = require('bluebird');
module.exports = {
	name: "subcriber",

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
            let subcriber = {
                firstName:ctx.params.firstName,
                lastName:ctx.params.lastName,
                email:ctx.params.email,
                accounts:ctx.params.account
            }

			let phone = subcriber.accounts.phone
			if(phone.startsWith("+2609") && phone.length !== 13 || phone.startsWith("2609") && phone.length !== 12 || phone.startsWith("09") && phone.length !== 10 || phone.startsWith("9") && phone.length !== 9 ){
				return {success:false,msg:"please provide a valid phone number"}
			}


            // return {success:true}

            return Promise.resolve(Subscriber.create(subcriber))
                        .then(newSubscriber=>{
                            if(!newSubscriber){
                                return {success:false,msg:"could not create subscriber"}
                            }

                            return {success:true,msg:"subscriber succesfull created", subcriber:newSubscriber};
                        }).catch(err=>{return {success:false,msg:"server error"}});
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