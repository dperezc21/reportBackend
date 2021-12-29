import Report from "../../models/modelReport";
import User from "../../models/modelUser";

const getReportByUserCodeRepository = async(user_code:any) => {
    
    try {
        const user = await User.findById({_id:user_code, user_status:true})
        if(!user){
            return {
                status:602, message:"usuario no existe"
            };
        }

        const reports = await Report.find({user_code, rep_status:true})
                                    .populate('cat_code', ['cat_name'])
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