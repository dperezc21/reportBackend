import User from "../models/modelUser";
import Report from "../models/modelReport";
import UserInterface from "../interfaces/userInterface";
const {listIds} = require('./helperUser');
class HelperCompany{

    //metodo para realizar consultas reportes de usuarios para un administrador
    getInquiryForAdmin = async(com_id:Number) => {
        try {
            const users: UserInterface[] = await User.find({com_id, user_status:true});
            //mapea los usuarios y devuelve una lista de id de usuarios
            const ids_user:number[] = listIds(users);
            return await Report.find({user_code:ids_user, rep_status:true})
                            .populate('user_code',['user_name', 'pro_code'])
                            .populate('cat_code', ['cat_name']);
        } catch (error:any) {
            return new Error(error.message)
        }
    }

    
}

export = new HelperCompany;