
import File from "../../models/modelFile";


const insertFilesRepository = async(rep_code:string, files:any) =>{
    
    try {
        for (let file of files){
            file.rep_code = rep_code;
            console.log(file)
            const insertFile = await File(file);
            insertFile.save()
        }
        return {
            status:200,
            message:"reporte insertado existosamente"
        };
        
    } catch (error) {
        return {
            status:500,
            message:error
        }
    }
}

export = insertFilesRepository;