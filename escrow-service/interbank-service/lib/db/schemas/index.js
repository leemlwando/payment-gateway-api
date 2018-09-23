const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid/v4')

const BankSchema = new Schema({
    name:{type:String,required:true,unique:true, lowercase:true},
    capital:{type:Number, default:0, min: 100000},
    accounts:
                [   { firstName:{type:String,required:true},
                    lastName:{type:String, required:true},
                    email:{type:String, required:true},
                    receipts:[],
                    payments:[],
                    loans:[],
                    accnum:{type:String,unique:true}
                } ],
    ledger:[]
 
    
    
});

BankSchema.pre("save",function(next){
    let self = this;
    
    let accounts = self.accounts;

    accounts.map((account,i)=>{
        return account.accnum = uuid();
    })

    next();


})
module.exports = {BankSchema};