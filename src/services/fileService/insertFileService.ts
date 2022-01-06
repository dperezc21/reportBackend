import Report from "../../models/modelReport";
import File from "../../models/modelFile";
import ReportInterface from "../../interfaces/reportInterface";
import FileInterface from "../../interfaces/fileInterface";


const insertFilesRepository = async(dataFiles:any) =>{
    const {rep_code, files} = dataFiles;
    try {
        const report: ReportInterface = await Report.findOne({rep_code});
        if(!report){
            return {
                status:2,
                message:"reporte no existe"
            }
        }
        for (let file of files){
            file.rep_code = rep_code;
            try {
                const insertFile: FileInterface = await File(file);
                insertFile.save()
                
            } catch (error) {
                return {
                    status:500,
                    message:`error al guardar el archivo ${file.file_name}`
                }
            }
        }
        return {
            status:200,
            message:"archivos de reporte insertados"
        };
        
    } catch (error) {
        console.log(error);
        return {
            status:500,
            message:error
        }
    }
}

export = insertFilesRepository;