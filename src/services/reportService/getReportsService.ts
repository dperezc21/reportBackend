import File from "../../models/modelFile";
import Report from "../../models/modelReport";
import modelUser from "../../models/modelUser";
const {getAuthUser} = require( "../../middleware/verifyToken");

const getReportsRepository = async() =>{
    
    try {
        const {_id, pro_code, com_id } = getAuthUser();
        let reports:any =undefined;
        if (pro_code.pro_name == "admin"){
            reports = await getReportsAdmin(com_id);
        }else{

            reports = await Report.find({user_code:_id, rep_status:true})
                                  .populate('cat_code', ['cat_name'])
                                  .limit(10);
        }
        if(!reports){
            return {
                status:805,
                message:"no existen reportes"
            }
        }
        
        let list_reports:any = []
        
        for (let report of reports){
            let archivos = await File.find({rep_code:report.rep_code});
            list_reports.push({report, archivos});
        }
            
        return {
            status:200,
            list_reports
        }
    } catch (error) {
        console.log(error);
        return {
            status:500,
            message:error
        }
    }

}


const getReportsAdmin = async(com_id:Number) => {
    try {
        const users = await modelUser.find({com_id, user_status:true});
        
        const ids_user = users.map((datos:any) => {
            return datos._id;
        })
        return await Report.find({user_code:ids_user, rep_status:true})
                           .populate('user_code',['user_name', 'pro_code'])
                           .populate('cat_code', ['cat_name']);
    } catch (error) {
        return {
            status:500,
            message:error
        }
    }
}

export = getReportsRepository;