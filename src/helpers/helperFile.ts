
import FileInterface from "../interfaces/fileInterface";
import modelFile from "../models/modelFile";

class HelperFile {

    numberFiles = async(files:FileInterface[], rep_code:string, type_file:string) => {
        
        try {
            let numFiles = await modelFile.find({ rep_code, type_file}).count();
            files.forEach((file: FileInterface) => {
                if (file.file_type == type_file) {
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