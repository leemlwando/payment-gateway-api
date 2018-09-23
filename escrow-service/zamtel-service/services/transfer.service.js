"use strict";
const {Subscriber} = require('../lib/db/models');
const Promise = require('bluebird');
module.exports = {
	name: "transfer",

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
		homogeneous(ctx) {
            let {initiator,reciever,amount,namespace} = ctx.params;
            return Promise.resolve(Subscriber.findOne({accounts:{$elemMatch:{phone:reciever}}}))
                        .then(user=>{
                            if(!user){return {success:false,msg:"user not found", service:"zamtel"}}
                            if(user.accounts[0].phone.toString() === initiator.toString() && namespace.toString()===user.accounts[0].namespace.toString()){
                                return {success:false, msg:"cant make a transfer to yourself, within same namepsace, please pick a different namespace and/or reciever id"}
                            }

                            if(user.accounts[0].phone.toString() === initiator.toString()){
                                return {success:false, msg:"cant make a transfer to yourself, within same namepsace, please pick a different namespace and/or reciever id"}
                            }

                            return Promise.resolve(Subscriber.findOneAndUpdate({accounts:{$elemMatch:{phone:reciever}}}, {$inc:{"accounts.$.balance":amount}}, {new:true}))
                                        .then(sen=>{
                                            if(!sen){
                                                return {success:false,msg:"unable to update recievers account, please try again some other time"}
                                            }

                                                    return Promise.resolve(Subscriber.findOneAndUpdate({accounts:{$elemMatch:{phone:initiator}}}, {$inc:{"accounts.$.balance":-Number(amount)}}, {new:true}))
                                                    .then(rec=>{
                                                        if(!rec){
                                                            return {success:false,msg:"unable to deduct funds from your account, please try again some other time"}
                                                        }

                                                        return {success:true,sender:rec,reciever:sen }
                                                    }).catch(err=>err)
                                        })
                                            .catch(err=>err)

                            // return {success:true,msg:"user found", reciever:user}
                        }).catch(err=>err)
        },
        
        	/**
		 * Say a 'Hello'
		 *
		 * @returns
		 */
		heterogeneous() {
			return "hetergenous transfers";
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