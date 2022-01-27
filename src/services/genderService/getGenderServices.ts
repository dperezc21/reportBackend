import GenderInterface from "../../interfaces/genderInterface";
import modelGarde from "../../models/modelGender";



const getGenderService = async() => {
    try {
        const gender: GenderInterface[] = await modelGarde.find({gender_status:true});
        
        if (gender.length == 0){
            return {
                status:803,
                message:"no hay generos"
            };
        }
        return {
            status:200,
            message:gender
        }
    } catch (error) {
        console.log(error);
        return {
            status:500,
            message:error
        };
    }
}

export = getGenderService