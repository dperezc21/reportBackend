
const {getDataCompanyValid} = require( "../../helpers/helperCompany");

const User = require('../../models/modelUser')

const updateCompanyUserRepository = async(query:any) => {
    let {user_id, ...data} = query;
    try {
        data = await getDataCompanyValid(data);
        console.log("data compme", query);
        const updateUser = await User.findOneAndUpdate({_id:user_id, user_status:true}, {$set:data}, {new:true});
        if (!updateUser){
            return {
                status:602,
                message:"usuario no actualizado, no existe"
            };
        }
        return {
            status:200,
            message:"usuario actualizado"
        }
    } catch (error) {
        console.log(error)
        return {
            status:500,
            message:error
        }
    }
}


export = updateCompanyUserRepository;
