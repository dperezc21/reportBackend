import CompanyInterface from "../../interfaces/companyInterface";
const {getAuthUser} = require( "../../middleware/verifyToken");
const Company = require('../../models/modelCompany')
const User = require('../../models/modelUser')

const deleteCompanyUserRepository = async(ids:number[]) =>{
    
    const userAuth = getAuthUser();
    
    try {
        const company: CompanyInterface = await Company.findOne({_id: userAuth.com_id, com_status:true});
        if(!company){
            return {
                status:605,
                message:"compañia no existe"
            };
        }
        let deleted:any;
                
        if(ids){
            deleted = await User.updateMany({_id:ids, com_id:company._id, user_status:true}, {user_status:false})
        }
        console.log(deleted)
        if (company && deleted.modifiedCount>0){
            return {
                status:200,
                message:`registros eliminados: ${deleted.modifiedCount}`
            };
        }
        return {
            status:602,
            message:"usuario de compañia no existe"
        }
    } catch (error:any) {
        console.log(error.message);
        return {
            status:500,
            message:error}
    }
}


// const eliminar = (ids:number[]):Promise<string[]> => {
//     const user = getAuthUser();
    
//     console.log( user._id)
//     return new Promise( (resolve:any, reject:any) => {
//         let deleteUser: object | any = {};
//         let deleted:string[] =[];
//         ids.forEach(async (id: number) => {
//             //for(const id of ids){
//             if (id != user._id){
                
//                 deleteUser = await User.findOneAndUpdate({_id:id, user_status:true}, {user_status:false}, {new:true});
//                 if(deleteUser) deleted.push(deleteUser.user_name);
//             }
//             //}
//         })
//         console.log(deleted)
//         resolve(deleted)
//     })

// }

export = deleteCompanyUserRepository;
