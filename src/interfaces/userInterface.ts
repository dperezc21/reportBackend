import CompanyInterface from "./companyInterface";
import UserProfileInterface from "./userProfileInterface";



interface UserInterface {
    _id: number,
    com_id: CompanyInterface,
    pro_code: UserProfileInterface,
    user_name: String,
    user_password: string,
    usuer_status: boolean,
    user_create_date: Date,
    save: any,
    map: any
}


interface UserDeleteInterface {
    acknowledged: boolean,
    modifiedCount: number,
    upsertedId: null,
    upsertedCount: number,
    matchedCount: number
  }

export = UserInterface;