import TokenInterface from "../../interfaces/tokenInterface";
import UserInterface from "../../interfaces/userInterface";
import modelToken from "../../models/modelToken";
const User = require("../../models/modelUser");
const jwt = require('jsonwebtoken');
const {getAuthUser} = require( "../../middleware/verifyToken");

const verifyTokenService = async(token:any) => {
    const {_id}:UserInterface = getAuthUser();
    try {
        console.log(token)
        const userLogin: UserInterface = await User.findOne({_id});
        const getToken:TokenInterface = await modelToken.findOne({
            token,
            user_code:userLogin._id,
            token_status:true
            })
            console.log(getToken)
            
            if (getToken){
                return {status:200,message:true};
            }else{
                
                return {status:400,message:false};
            }
        
    } catch (error:any) {
        console.log(error)
        return {
            status:500, message:error.message 
        }
    }
}

export = verifyTokenService