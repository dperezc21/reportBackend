
interface CompanyInterface {
    _id: number,
    com_code: string | Error,
    com_name: string,
    com_description: string,
    com_status: boolean,
    com_create_date: Date,
    com_nit: string,
    com_email: string,
    com_cell_phone: string,
    com_addres:string,
    save: any
}

export = CompanyInterface
