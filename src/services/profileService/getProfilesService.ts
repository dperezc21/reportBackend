const Profile = require('../../models/modelUserProfile');


const getProfilesRepository = async() =>{
    try {
        const profiles = await Profile.find({pro_status:true});
        if(profiles){
            return {
                status:200,
                message: profiles
            }
        }
        return {
            status:802,
            message: "no hay perfiles de usuarios"
        }
    } catch (error) {
        return {
            status:500,
            message:error
        }
    }
}

export = getProfilesRepository
