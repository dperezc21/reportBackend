import UserProfileInterface from "../../interfaces/userProfileInterface";

const Profile = require('../../models/modelUserProfile');


const insertProfileRepository = async( pro_name:any) =>{
    try {
        
        console.log(pro_name)
        const profile: UserProfileInterface = await Profile({pro_name});
        profile.save((err:any, profileInserted:any) => {
            if (err){
                return {
                    status:500,
                    message:err.message
                };
            }

        });
        return {
            status: 200,
            message:"profile inserted"
        }
    } catch (error) {
        return {
            status: 500,
            message: error
        }
    }
}


export = insertProfileRepository;