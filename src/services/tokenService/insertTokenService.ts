
import TokenInterface from "../../interfaces/tokenInterface";
import UserInterface from "../../interfaces/userInterface"
import modelToken from "../../models/modelToken";
const {getAuthUser} = require("../../middleware/verifyToken")

const insertTokenService = async(token:string, user_code:number) => {
    try {
        const getToken:TokenInterface = await modelToken({user_code, token});
        
        getToken.save( (error:any) => {
            if(error) return {status:500, message:error.message}
        });

        const s =await modelToken.findOneAndUpdate({
            token_status:true, user_code
        }, {token_status:false}, {new:true})
        
        return {
            status:200,
            message:"token insertado"
        }
        
    } catch (error:any) {
        console.log(error)
        return {
            status:500,
            message:error.message
        }
    }
}

export = insertTokenService