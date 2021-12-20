
const {getUser} = require( "../../middleware/verifyToken");
const User = require('../../models/modelUser')
const Company = require('../../models/modelCompany')

const deleteCompanyUserRepository = async(ids:[]) =>{
    
    const user = getUser();
    console.log("eliminar",ids)
    console.log(user)
    try {
        const company = await Company.findOne({_id: user.com_id, com_status:true});
        if(!company){
            return {
                status:605,
                message:"compañia no existe"};
        }
        let deleteUser:any = undefined;
        let deleted:any = [];
        if(ids){

             for(let id of ids){
                if (id != user._id){
                    deleteUser = await User.findOneAndUpdate({_id:id, user_status:true}, {user_status:false}, {new:true});
                    if(deleteUser) deleted.push(deleteUser.user_name);
                    console.log(deleteUser);
                }
             }  
        }
        
        if (company && deleted.length>0){
            return {
                status:200,
                message:deleted};
        }
        return {
            status:602,
            message:"usuario de compañia no existe"}
    } catch (error:any) {
        console.log(error);
        return {
            status:500,
            message:error}
    }
}

export = deleteCompanyUserRepository;
