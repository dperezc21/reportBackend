
interface FileInterface {
    _id: number,
    rep_code: string,
    file_name: string,
    file_path: string,
    file_size: number,
    file_type: string,
    file_status: boolean,
    save: any
}

export = FileInterface