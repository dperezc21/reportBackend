import GardeInterface from "../../interfaces/gardeInterface";
import modelGarde from "../../models/modelGarde";



const getGardeService = async() => {
    try {
        const garde: GardeInterface[] = await modelGarde.find({garde_status:true});
        
        if (garde.length == 0){
            return {
                status:803,
                message:"no hay generos"
            };
        }
        return {
            status:200,
            message:garde
        }
    } catch (error) {
        console.log(error);
        return {
            status:500,
            message:error
        };
    }
}

export = getGardeService