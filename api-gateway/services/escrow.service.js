"use strict";

module.exports = {
	name: "escrow",

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

		balance:{
			auth:"required",
			handler(ctx){
				let user = {
					id:ctx.meta.user ? ctx.meta.user.id : null,
					email:ctx.meta.user ? ctx.meta.user.email : null,
					phone:ctx.meta.user ? ctx.meta.user.phone : null,
					service:ctx.meta.service ? ctx.meta.service : null,
					mobile_money_id:ctx.meta.mobile_money_id ? ctx.meta.mobile_money_id : null,
					namespace:ctx.meta.namespace
				};
				ctx.meta.user ? ctx.meta.user.api_keys = null : null;
				
				ctx.meta.token = null;
				console.log(ctx.meta)
				return this.broker.call("balance.enquiry",user,{nodeID:"escrow-service"})
							.then(res=>res.code ===404 ? {success:false,status:404,msg:"could not find requested service"} : res ).catch(err=>err ? {success:false,err:err} : {success:false,msg:"server error"});
			}
		},
	

        
        /**
		 * Say a 'Hello'
		 *
		 * @returns
		 */
		makepayment:{
			auth:"required",
			handler(ctx){
				let request = {
					initiator_id:ctx.params.initiator_id,
					reciever_id:ctx.params.reciever_id,
					amount:ctx.params.amount,
					service:ctx.params.service,
					namespace:ctx.params.namespace
				};
            return this.broker.call("payments.makepayment",request,{nodeID:"escrow-service"})
						.then(res=>res.code === 404 ? {success:false, msg:"could not find requested service"} : res).catch(err=>err.code ===404 ? {success:false,err:true,msg:"could not find requested service"} : {success:false,msg:"server error"});
			}
		},
		
		/**
		 * Say a 'Hello'
		 *
		 * @returns
		 */
		create_subscriber:{
			auth:"required",
			handler(ctx){
				let request = {
					agent:ctx.params.agent,
					firstName:ctx.params.firstName,
					lastName:ctx.params.lastName,
					email:ctx.params.email,
					account:ctx.params.account,
					service:ctx.params.service
				};
            return this.broker.call("balance.create",request,{nodeID:"escrow-service"})
						.then(res=>res.code === 404 ? {success:false, msg:"could not find requested service"} : res).catch(err=>err.code ===404 ? {success:false,err:true,msg:"could not find requested service"} : {success:false,msg:"server error"});
			}
        },
        
        /**
		 * Say a 'Hello'
		 *
		 * @returns
		 */
		notifcation(ctx) {
            return this.broker.call("account.notifcation",{},{nodeID:"escrow-service"})
                        .then(res=>res).catch(err=>err);
        },
        

        /**
		 * Say a 'Hello'
		 *
		 * @returns
		 */
		transfer(ctx) {
            return this.broker.call("transfer.homogeneous",{},{nodeID:"escrow-service"})
                        .then(res=>res).catch(err=>err);
        },
        

        /**
		 * Say a 'Hello'
		 *
		 * @returns
		 */
		register_bank:{
			auth:"required",
			handler(ctx){
				let request = {
					name:ctx.params.bank_name,
					capital:ctx.params.start_up_capital,
					accounts:ctx.params.accounts
				};
				console.log(request)
            return this.broker.call("registry.create_bank",request,{nodeID:"escrow-service"})
						.then(res=>res.code === 404 ? {success:false, msg:"could not find requested service"} : res).catch(err=>{
							console.log(err)
							err.code ===404 ? {success:false,err:true,msg:"could not find requested service"} : {success:false,msg:"server error", service:"api-gateway",};
						});
			}
		},

		register_account:{
			auth:"required",
			handler(ctx){
				let request = {
					firstName:ctx.params.firstName,
					lastName:ctx.params.lastName,
					email:ctx.params.email,
					bank:ctx.params.bank_name
				};
				console.log(request);
            return this.broker.call("registry.create_account",request,{nodeID:"escrow-service"})
						.then(res=>{
						
						return	res.code === 404 ? {success:false, msg:"could not find requested service"} : res;
						}).catch(err=>{
							console.log(err)
							err.code ===404 ? {success:false,err:true,msg:"could not find requested service"} : {success:false,msg:"server error", service:"api gateway"};
						});
			}
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