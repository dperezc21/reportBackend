import CompanyInterface from "./companyInterface";
import UserProfileInterface from "./userProfileInterface";



interface UserInterface {
    _id: number,
    com_id: CompanyInterface,
    pro_code: UserProfileInterface,
    user_name: string,
    user_password: string,
    usuer_status: boolean,
    user_create_date: Date,
    user_id_type :string,
    String :string,
    user_id :string,
    names_user :string,
    user_last_name :string,
    user_email :string,
    user_cell :string,
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