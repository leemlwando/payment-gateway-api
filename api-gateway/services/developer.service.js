"use strict";



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
		requestapikey:{
			auth:"required",

			handler(ctx) {

				return this.broker.call('developer.requestapikey',ctx.meta,{nodeID:"developer-service"}).then(res=>{
					return res.success===false ? {success:false,msg:res.msg} : res;
				}).catch(err=>err.code ===404 ? {success:false,status:404,msg:"developer service not available"} : {success:false,status:500,msg:"server error"});
			},
		}, 

		verifyapikey:{
			auth:"required",
			handler(ctx){
				return this.broker.call("developer.verifyapikey",ctx.meta,{nodeID:"developer-service"}).then(res=>{
					return res.success===false ? {success:false,msg:res.msg} : res;
				}).catch(err=>err.code ===404 ? {success:false,status:404,msg:"developer service not available"} : {success:false,status:500,msg:"server error"});
			}
		},

		register:{
			auth:"required",
			handler(ctx){
			
				return this.broker.call("developer.register",ctx.meta,{nodeID:"user-service"}).then(res=>{

					return res.success===false ? {success:false,msg:res.msg} : res;
				}).catch(err=>err.code ===404 ? {success:false,status:404,msg:"developer service not available"} : {success:false,status:500,msg:"server error", error:err});
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