import reportInterface from "../../interfaces/reportInterface";
import Report from "../../models/modelReport";
const {getAuthUser} = require( "../../middleware/verifyToken");

const getReportsRepository = async() =>{
    
    try {
        //console.log(getAuthUser())
        const {_id} = getAuthUser();
        const reports: reportInterface[] = await Report.find({user_code:_id})
                                  .populate('user_code',['user_name', 'pro_code'])
                                  .populate('cat_code', ['cat_name'])
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
    } catch (error) {
        console.log(error);
        return {
            status:500,
            message:error
        }
    }

}


export = getReportsRepository;