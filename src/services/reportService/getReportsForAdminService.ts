import User from "../../models/modelUser";
import Report from "../../models/modelReport";
import UserInterface from "../../interfaces/userInterface";
import ReportInterface from "../../interfaces/reportInterface";
const {listIds} = require('../../helpers/helperUser');


//metodo para realizar consultas reportes de usuarios para un administrador
const getInquiryForAdminRepository = async(com_id:Number) => {
    try {
        const users: UserInterface[] = await User.find({com_id});
        //mapea los usuarios y devuelve una lista de id de usuarios
        const ids_user:number[] = listIds(users);
        const reports:ReportInterface = await Report.find({user_code:ids_user})
                                                .populate('user_code',['-user_password','-__v'])
                                                .populate('cat_code', ['cat_name']);
        if(!reports){
            return {
                status:805,
                message:"no existen reportes"
            }
        }
        return {
            status:200,
            reports
        }
    } catch (error:any) {
        console.log(error);
        return {
            status:500,
            message: error
        }
    }
}

export = getInquiryForAdminRepository