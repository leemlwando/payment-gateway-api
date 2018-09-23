"use strict";
const jwt = require('jsonwebtoken');

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
				let user = {
					email:ctx.params.email,
					password:ctx.params.password
				}
			return this.broker.call('auth.login',user,{nodeID:"user-service"})
						.then(res=>{return {res:res,test:true}}).catch(err=>{
							console.log(err);
							return {success:false,err:err}
						});
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
			return this.broker.call('auth.register',user,{nodeID:"user-service"})
						.then(user=>user).catch(err=>err);
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