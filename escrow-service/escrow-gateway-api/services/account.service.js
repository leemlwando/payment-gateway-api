"use strict";

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
			console.log(ctx.params)
			switch(ctx.params.service){
				case "mtn":
					return this.broker.call("balance.enquiry",ctx.params,{nodeID:"mtn-service"})
								.then(res=>{
									console.log('balance enquiry response ',res)
									if(res ===undefined || res === null){
										return {success:false,msg:"we have failed to make an enquiry on your account.returned response undefined or null", res:res }
									}

									if(res.success === true){
										return res;
									}
									return {success:false,res}
								})
									.catch(err=>{console.log(err);return {success:false,msg:"an error occoured while making the balance enquiry", err:err}});
					break;
				case "zamtel":
					return this.broker.call("balance.enquiry",ctx.params,{nodeID:"zamtel-service"})
								.then(res=>{
									console.log(res)
									if(res ===undefined || res === null){
										return {success:false,msg:"we have failed to make an enquiry on your account.returned response undefined or null", res:res }
									}

									if(res.success === true){
										return res;
									}
									return {success:false,res}
								})
									.catch(err=>{console.log(err);return {success:false,msg:"an error occoured while making the balance enquiry", err:err}});
					break;
				case "airtel":
					return this.broker.call("balance.enquiry",ctx.params,{nodeID:"airtel-service"})
								.then(res=>{
									console.log(res)
									if(res ===undefined || res === null){
										return {success:false,msg:"we have failed to make an enquiry on your account.returned response undefined or null", res:res }
									}

									if(res.success === true){
										return res;
									}
									return {success:false,res}
								})
									.catch(err=>{console.log(err);return {success:false,msg:"an error occoured while making the balance enquiry", err:err}});
					break;
				case "zanaco":
					return this.broker.call("balance.enquiry",ctx.params,{nodeID:"zanaco-service"})
								.then(res=>{
									console.log(res)
									if(res ===undefined || res === null){
										return {success:false,msg:"we have failed to make an enquiry on your account.returned response undefined or null", res:res }
									}

									if(res.success === true){
										return res;
									}
									return {success:false,res}
								})
									.catch(err=>{console.log(err);return {success:false,msg:"an error occoured while making the balance enquiry", err:err}});
					break;
				case "zoona":
					return this.broker.call("balance.enquiry",ctx.params,{nodeID:"zoona-service"})
								.then(res=>{
									console.log(res)
									if(res ===undefined || res === null){
										return {success:false,msg:"we have failed to make an enquiry on your account.returned response undefined or null", res:res }
									}

									if(res.success === true){
										return res;
									}
									return {success:false,res}
								})
									.catch(err=>{console.log(err);return {success:false,msg:"an error occoured while making the balance enquiry", err:err}});
					break;
				default:
					return {success:false,msg:"selected service is not yet registred, please contact the service provider for more information"+JSON.stringify(ctx.params)}
			}
			
		},

		create(ctx) {
			switch(ctx.params.service){
				case "mtn":
					return this.broker.call("subcriber.create",ctx.params,{nodeID:"mtn-service"})
								.then(res=>res.code===404 ? {success:false,msg:"service currently unavailable"} : res)
									.catch(err=>{return {success:false,msg:"an error occoured! cant create subsriber", err:err}});
					break;
				case "zamtel":
						return this.broker.call("subcriber.create",ctx.params,{nodeID:"zamtel-service"})
							.then(res=>res.code===404 ? {success:false,msg:"service currently unavailable"} : res)
								.catch(err=>{return {success:false,msg:"an error occoured! cant create subscriber", err:err}});
					break;
				case "airtel":
					return this.broker.call("subcriber.create",ctx.params,{nodeID:"airtel-service"})
						.then(res=>res.code===404 ? {success:false,msg:"service currently unavailable"} : res)
							.catch(err=>{return {success:false, msg:"an error occoured! cant create subscriber", err:err}});
					break;
				case "zanaco":
					return this.broker.call("subcriber.create",ctx.params,{nodeID:"zamtel-service"})
						.then(res=>res.code===404 ? {success:false,msg:"service currently unavailable"} : res)
							.catch(err=>{return {success:false,msg:"an error occoured! cant create subsriber", err:err}});
					break;
				case "zoona":
					return this.broker.call("subcriber.create",ctx.params,{nodeID:"zoona-service"})
						.then(res=>res.code===404 ? {success:false,msg:"service currently unavailable"} : res)
							.catch(err=>{return {success:false,msg:"an error occoured! cant create subsriber", err:err}});
					break;
				default:
					return {success:false,msg:"selected service is not yet registred, please contact the service provider for more information"+JSON.stringify(ctx.params)}
			}
			
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