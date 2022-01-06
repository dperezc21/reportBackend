import FileInterface from "../../interfaces/fileInterface";
import File from "../../models/modelFile";

const updateStatusFilesRepository = async(dataFile:any) =>{
    const {dataFiles} = dataFile;

    try {

        let file_names:string[] = [];
        for (const iterator of dataFiles) {
            try {
                const file: FileInterface = await File.findOneAndUpdate({file_name:iterator.file_name}, {file_status:iterator.file_status}, {new:true});
                if (file) file_names.push(file?.file_name);
                
            } catch (error) {
                console.log(error);
                return {
                    status:500,
                    message:`error al actualizar el archivo ${iterator.file_name}`
                }
            }
        }
        return {
            status:200,
            message:file_names
        }
    } catch (error) {
        console.log(error);
        return {
            status:500,
            message:error
        }
    }

}


export = updateStatusFilesRepository;