import FileInterface from "../../interfaces/fileInterface";
import File from "../../models/modelFile";

const getFilesByCodeReportRepository = async(rep_code:any) => {

    try {
        const archivos: FileInterface[] = await File.find({rep_code});
        return {
            status:200,
            archivos
        }
        
    } catch (error: any) {
        console.log(error);
        return {
            status:500,
            message:error
        }
    }
}


export = getFilesByCodeReportRepository;