import UserProfileInterface from "../../interfaces/userProfileInterface";

const Profile = require('../../models/modelUserProfile');

const consultProfileByNameRepository = async(pro_name:string) =>{
    try {
        const profile: UserProfileInterface = await Profile.findOne({pro_name, pro_status:true});
        if(profile){
            return {
                status:200,
                message:profile
            }
        }
        
        return {
            status:802,
            message:null
        };
    } catch (error) {
        return {
            status:500,
            message:error
        }
    }
}


export = consultProfileByNameRepository;