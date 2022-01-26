import IdTypeInterface from "../../interfaces/idTypeInterface"
import modelGarde from "../../models/modelGarde"


const insertGardeService = async(param:any) => {
    try {
        const getGarde: IdTypeInterface = await modelGarde.findOne({garde:param})
        if(getGarde) {
            return {
                status:400,
                message:"existe genero en base de datos"
            }
        }
        const garde = await modelGarde({garde:param});
        garde.save((error:any, cat:any) =>{
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

export = insertGardeService