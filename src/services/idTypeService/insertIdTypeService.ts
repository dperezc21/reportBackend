import IdTypeInterface from "../../interfaces/idTypeInterface"
import modelIdType from "../../models/modelIdType"


const insertIdTypes = async(param:any) => {
    try {
        const getidType: IdTypeInterface = await modelIdType.findOne({id_type:param})
        if(getidType) {
            return {
                status:400,
                message:"existe tipo de identificacion"
            }
        }
        const idType = await modelIdType({id_type:param});
        idType.save((error:any, cat:any) =>{
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
            message:"tipo de identificacion insertado"
        }
    } catch (error:any) {
        return {
            status:500,
            message:error.message
        }
    }
}

export = insertIdTypes