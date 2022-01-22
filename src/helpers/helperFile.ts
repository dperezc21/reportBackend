
import FileInterface from "../interfaces/fileInterface";
import modelFile from "../models/modelFile";

class HelperFile {

    numberFiles = async(files:FileInterface[], rep_code:string, file_type:string) => {
        
        try {
            let numFiles = await modelFile.find({ rep_code, file_type}).count();
            files.forEach((file: FileInterface) => {
                if (file.file_type == file_type) {
                    numFiles += 1;
                    console.log(file.file_type)
                }
            });
            return numFiles;
            
        } catch (error:any) {
            console.log(error)
            return new Error(error.message);
        }
    }
}

export =new HelperFile