import UserProfileInterface from "../../interfaces/userProfileInterface";

const Profile = require('../../models/modelUserProfile');


const insertProfileRepository = async( pro_name:any) =>{
    try {
        
        const profile: UserProfileInterface = await Profile({pro_name});
        profile.save((err:any, profileInserted:any) => {
            if (err){
                console.log(err);
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
        console.log(error);
        return {
            status: 500,
            message: error
        }
    }
}


export = insertProfileRepository;