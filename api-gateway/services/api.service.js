"use strict";

const ApiGateway = require("moleculer-web");
const Promise = require("bluebird");
const _ = require("lodash");
const { UnAuthorizedError } = ApiGateway.Errors;

module.exports = {
	name: "api",
	mixins: [ApiGateway],

	
	settings: {
		port: process.env.PORT || 3000,
		cors: {
            origin: "*",
            methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
            allowedHeaders: ["authorization","content-type"],
            exposedHeaders: [],
			maxAge: 3600
		},

		routes: [{
			path: "/api",
			authorization: true,
			whitelist: [
				// Access to any actions in all services under "/api" URL
				"**"
			]
		}],

		// Serve assets from "public" folder
		assets: {
			folder: "public"
		},

	},

	methods: {
		/**
		 * Authorize the request
		 *
		 * @param {Context} ctx
		 * @param {Object} route
		 * @param {IncomingRequest} req
		 * @returns {Promise}
		 */
		authorize(ctx, route, req) {
			let token;
			console.log(req.headers)
			if (req.headers.authorization) {
				// console.log(req.headers);
				let type = req.headers.authorization.split(" ")[0];
				if (type === "Token" || type === "Bearer")
					token = req.headers.authorization.split(" ")[1];
			}
			
			return this.Promise.resolve(token)
				.then(token => {
					if (token) {
						// Verify JWT token
						
						return ctx.call("auth.isuser", { token }, {nodeID:"user-service"})
							.then(res => {
							
								if (res.success === true) {
									this.logger.info("Authenticated via JWT: ", res.success);	
									ctx.meta.user = res ? res : null;
									ctx.meta.user.api_key_name = req.body.api_key_name ? req.body.api_key_name : null ;
									ctx.meta.user.namespace = req.body.namespace ? req.body.namespace : null;
									ctx.meta.api_key = req.body.api_key ? req.body.api_key : null;
									ctx.meta.token = token ? token : null;
									ctx.meta.service = req.body.service ? req.body.service : null;
									ctx.meta.mobile_money_id = req.body.mobile_money_id ? req.body.mobile_money_id : res.phone;
									ctx.meta.amount = req.body.amount ? req.body.amount : null;
									ctx.meta.initiator_id = req.body.initiator_id ? req.body.initiator_id : null;
									ctx.meta.reciever_id = req.body.reciever_id  ? req. body.reciever_id : null;
									ctx.meta.firstName = req.body.firstName ? req.body.firstName  :null;
									ctx.meta.lastName = req.body.lastName ? req.body.lastName : null;
									ctx.meta.email = req.body.email ? req.body.email : null;
									ctx.meta.account = req.body.account ? req.body.account : null;
									ctx.meta.agent = req.body.agent ? req.body.agent : null;
									ctx.meta.namespace  = req.body.namespace ? req.body.namespace : null; 
									ctx.meta.start_up_capital = req.body.start_up_capital ? req.body.start_up_capital : null;
									ctx.meta.bank_name = req.body.bank_name ? req.body.bank_name : null;

									return res;
								}

			
								return res;
							})
							.catch(err => {
								// Ignored because we continue processing if user is not exist
								return null;
							});
					}

					// return this.Promise.reject(new UnAuthorizedError({
					// 	message:"could not verify user! please login or register to gain access"
					// }));
				})
				.then(res => {
						if(req.$action.auth == "required" && res === undefined){
							return this.Promise.reject(new UnAuthorizedError({
								message:"could not verify user! please login or register to gain access"
							}));
						}

						if(req.$action.auth === undefined && res === undefined){
							return;
						}
					if (req.$action.auth == "required" && res.success===false){
						return this.Promise.reject(new UnAuthorizedError({
							message:"could not verify user! please login or register to gain access"
						}));
					}
					return res;
				});
		},
	},
	
};
