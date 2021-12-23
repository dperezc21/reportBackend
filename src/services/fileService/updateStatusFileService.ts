import File from "../../models/modelFile";

const updateStatusFiles = async(dataFile:any) =>{
    const {files} = dataFile;

    try {

        let file_names:any = [];
        for (const iterator of files) {
            console.log(iterator.file_name)
            const file = await File.findOneAndUpdate({file_name:iterator.file_name}, iterator, {new:true});
            if (file) file_names.push(file.file_name);
        }
        return {
            status:200,
            message:file_names
        }
    } catch (error) {
        return {
            status:500,
            message:error
        }
    }

}


export = updateStatusFiles;