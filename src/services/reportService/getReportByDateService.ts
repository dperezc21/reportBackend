
import Report from "../../models/modelReport";
const {getAuthUser} = require( "../../middleware/verifyToken");


const getReportByDateRepository = async(dataReport:any) =>{
    const {start_date, final_date} = dataReport;
    const user = getAuthUser();
    try {
        const reports = await Report.find({
                user_code:user._id,
                $or: [
                        {rep_create_date: {$gte:start_date, $lte:final_date}},
                        {rep_create_date:start_date}
                    ],
                    rep_status:true
        }).populate('cat_code', ['cat_name']);

        if(!reports){
            return {
                status:805,
                message:"reporte no existe"
            };
        }
        
        return{
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




export = getReportByDateRepository;