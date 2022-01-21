import TokenInterface from "../../interfaces/tokenInterface";
import UserInterface from "../../interfaces/userInterface"
import modelToken from "../../models/modelToken";

const {getAuthUser} = require( "../../middleware/verifyToken");

const getTokenService = async(token:string) => {
    const userAuth:UserInterface = getAuthUser();
    try {
        const getToken:TokenInterface = await modelToken.findOne({user_id:userAuth._id, token});
        if(!token) {
            return {
                status: 400,
                token:false
            }
        }
        return {
            status:200,
            token:getToken
        }
    } catch (error:any) {
        return {
            status:500,
            message:error.message
        }
    }
}

export = getTokenService