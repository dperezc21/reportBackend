
interface CompanyInterface {
    _id: number,
    com_code: string | Error,
    com_name: string,
    com_description: string,
    com_status: boolean,
    com_create_date: Date,
    save: any
}

export = CompanyInterface
