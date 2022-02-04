import ReportInterface from "../../interfaces/reportInterface";
import UserInterface from "../../interfaces/userInterface";
import Report from "../../models/modelReport";
import User from "../../models/modelUser";

const getReportByUserCodeRepository = async(user_code:any) => {
    
    try {
        const user: UserInterface = await User.findById({_id:user_code})
        if(!user){
            return {
                status:602, message:"usuario no existe"
            };
        }

        const reports: ReportInterface[] = await Report.find({user_code})
                                    .populate('cat_code', ['cat_name'])
                                    .populate('user_code',['-user_password','-__v'])
        if(!reports){
            return {
                status:805,
                message:"reporte no existe"
            }
        }

        return {
            status:200,
            reports
        }
    } catch (error) {
        console.log(error);
        return {
            status:500,
            message:error
        }
    }
}

export = getReportByUserCodeRepository