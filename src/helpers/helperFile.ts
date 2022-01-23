
import FileInterface from "../interfaces/fileInterface";
import modelFile from "../models/modelFile";
const { configFile } = require("./dataConfig");

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

    verifyFileTypes = (files:FileInterface[], files_type:string[]) => {
        
        let file_type: null | string = null; 
        for (const file of files) {
            if(files_type.includes(file.file_type)){
                return file.file_type
            }
            
        }
        
        return file_type;
    }

    
}

export =new HelperFile