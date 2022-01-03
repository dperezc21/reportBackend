import CategoryInterface from "./categoryInterface";


interface ReportInterface {
    _id: number,
    rep_code: string,
    user_code: number,
    cat_code: CategoryInterface,
    rep_description: string,
    rep_address: string,
    coordinate: {
        latitude:number,
        longitude:number
    }
    rep_create_date: Date,
    rep_status: boolean,
    save: any
}

export = ReportInterface;