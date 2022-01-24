
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

    // verifyFileTypes = (files:FileInterface[]) => {
    //     const format_images = configFile.image_format;
    //     const format_videos = configFile.video_format;
    //     const format_audios = configFile.audio_format
    //     let file_type: undefined = undefined; 
    //     for (const file of files) {
    //         console.log(file.file_type,"tipo de archivo")
    //         for (const format of format_images) {
                
    //             if(format == file.file_type){
                    
    //                 return file.file_type
    //             }
    //         }

    //         for (const format of format_videos) {
    //             if(format == file.file_type){
    //                 console.log("formato permitido", file.file_type == format)
    //                 return file.file_type
    //             }
    //         }
    //         for (const format of format_audios) {
    //             if(format == file.file_type){
    //                 return file.file_type
    //             }
    //         }
    //     }
        
    //     return file_type;
    // }

    
}

export =new HelperFile