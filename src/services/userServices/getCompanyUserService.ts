const {getAuthUser} = require( "../../middleware/verifyToken");
const User = require('../../models/modelUser')


const getCompanyUserRepository = async(query:any) =>{

    const {com_id, _id } = getAuthUser();
    const {user_id} = query;
    console.log( com_id);
    
    try {
        let users:object | object[];
        if(!user_id){
            users = await User.find({com_id, _id:{$ne:_id},user_status:true}).populate('pro_code');
        }else{
            users = await User.findOne({com_id, _id:{$eq:user_id, $ne:_id}, user_status:true}).populate('pro_code')
        }
        if (users){
            return {status:200, message:users}
        }
        
        return {status:602, message:"usuario de compañia no encontrado"}
    } catch (error:any) {
        console.log(error)
        return {
            status:500,
            message:error}
    }
}

export = getCompanyUserRepository;