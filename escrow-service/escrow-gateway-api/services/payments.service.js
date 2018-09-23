"use strict";

module.exports = {
	name: "payments",

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
		makepayment(ctx) {
			let initiator = ctx.params.initiator_id;
			let reciever = ctx.params.reciever_id;
			let amount = ctx.params.amount;
			let service = ctx.params.service;
			let namespace = ctx.params.namespace;
			let charges = 0;
			let mtn = reciever.startsWith("+26096") || reciever.startsWith("096") || reciever.startsWith("96");
			let zamtel = reciever.startsWith("+26095") || reciever.startsWith("095") || reciever.startsWith("95") || reciever.startsWith("26095");
			let airtel = reciever.startsWith("+26097") || reciever.startsWith("097") || reciever.startsWith("97") || reciever.startsWith("26097");
			// console.log(initiator,reciever, amount, service)
			if(initiator === undefined || reciever === undefined || amount === undefined || service===undefined || namespace === undefined){
				return {success:false, msg:"please provide all valid fields"}
			}
			let self = this;
			switch(service){
				case "mtn":
					return this.broker.call("balance.enquiry",{mobile_money_id:initiator, namespace},{nodeID:"mtn-service"})
								.then(res=>{
									console.log(res)
									if(res.success ===true){
										switch((Number(amount) + Number(charges) > Number(res.balance))){
											case false:
												if(mtn){
													return self.broker.call("transfer.homogeneous",{initiator,reciever,amount},{nodeID:"mtn-service"}).then(res=>{
														return {res}
													}).catch(err=>err)
												}
												return self.broker.call("transfer.heterogeneous",{initiator,reciever,amount,namespace},{nodeID:"mtn-service"}).then(res=>{
													return res
												}).catch(err=>err)
												break;
											default:
												return {success:false,msg:"insufficient balance to complete transaction",amount:Number(amount),balance:Number(res.balance) ,condition:(Number(amount) < Number(res.balance))}
										}
									}

									return {success:false,msg:"service currently unavailable"};
								})
									.catch(err=>{return {success:false,msg:"an error occoured while making the balance enquiry", err:err}});
					break;
				case "zamtel":
					return this.broker.call("balance.enquiry",{mobile_money_id:initiator, namespace},{nodeID:"zamtel-service"})
									.then(res=>{
										console.log(res)
										if(res.success ===true){
											switch((Number(amount) + Number(charges) > Number(res.balance))){
												case false:
													if(zamtel){
														return self.broker.call("transfer.homogeneous",{initiator,reciever,amount},{nodeID:"zamtel-service"}).then(res=>{
															return {res}
														}).catch(err=>err)
													}
													return self.broker.call("transfer.heterogeneous",{initiator,reciever,amount,namespace},{nodeID:"zamtel-service"}).then(res=>{
														return res
													}).catch(err=>err)
													break;
												default:
													return {success:false,msg:"insufficient balance to complete transaction",amount:Number(amount),balance:Number(res.balance) ,condition:(Number(amount) < Number(res.balance))}
											}
										}

										return {success:false,msg:"service currently unavailable"};
									})
										.catch(err=>{return {success:false,msg:"an error occoured while making the balance enquiry", err:err}});
					break;
				case "airtel":
						return this.broker.call("balance.enquiry",{mobile_money_id:initiator, namespace},{nodeID:"airtel-service"})
						.then(res=>{
							console.log(res)
							if(res.success ===true){
								switch((Number(amount) + Number(charges) > Number(res.balance))){
									case false:
										if(airtel){
											return self.broker.call("transfer.homogeneous",{initiator,reciever,amount},{nodeID:"airtel-service"}).then(res=>{
												return {res}
											}).catch(err=>err)
										}
										return self.broker.call("transfer.heterogeneous",{initiator,reciever,amount,namespace},{nodeID:"airtel-service"}).then(res=>{
											return res
										}).catch(err=>err)
										break;
									default:
										return {success:false,msg:"insufficient balance to complete transaction",amount:Number(amount),balance:Number(res.balance) ,condition:(Number(amount) < Number(res.balance))}
								}
							}

							return {success:false,msg:"service currently unavailable"};
						})
					.catch(err=>{return {success:false,msg:"an error occoured while making the balance enquiry", err:err}});
					break;
				case "zanaco":
					break;
				case "zoona":
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