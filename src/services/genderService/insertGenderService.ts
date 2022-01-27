import GenderInterface from "../../interfaces/genderInterface"
import IdTypeInterface from "../../interfaces/idTypeInterface"
import modelGarde from "../../models/modelGender"


const insertGenderService = async(param:any) => {
    try {
        const getGarde: IdTypeInterface = await modelGarde.findOne({gender:param})
        if(getGarde) {
            return {
                status:400,
                message:"existe genero en base de datos"
            }
        }
        const gender:GenderInterface = await modelGarde({gender:param});
        gender.save((error:any, cat:any) =>{
        if (error){
            console.log(error);
            return {
                status:500,
                message:error.message
            };
        }
          
    })

        return {
            status:200,
            message:"genero insertado"
        }
    } catch (error:any) {
        return {
            status:500,
            message:error.message
        }
    }
}

export = insertGenderService