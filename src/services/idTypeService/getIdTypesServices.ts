

import IdTypeInterface from '../../interfaces/idTypeInterface';
import modelIdType from '../../models/modelIdType';

const getIdTypeService = async() => {
    try {
        const idType: IdTypeInterface[] = await modelIdType.find({id_type_status:true});
        
        if (idType.length == 0){
            return {
                status:803,
                message:"no hay tipos de identificacion"
            };
        }
        return {
            status:200,
            message:idType
        }
    } catch (error) {
        console.log(error);
        return {
            status:500,
            message:error
        };
    }
}

export = getIdTypeService