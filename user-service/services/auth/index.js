module.exports = (ctx,model,user)=>{

    return model.create(user)
        .then(newUser=>{
            console.log(newUser)
            return {sucess:true,user:newUser}
        })
            .catch(err=>{
                console.log('err',err)
                return {success:false,error:err}
            });
}