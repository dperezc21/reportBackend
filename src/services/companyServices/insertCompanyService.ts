import companyCode from "../../helpers/generateCompanyCode";
import CompanyInterface from "../../interfaces/companyInterface";
import UserProfileInterface from "../../interfaces/userProfileInterface";
const {encriptPassword} = require("../../helpers/helperUser")
const UserProfile = require('../../models/modelUserProfile');

const Company = require('../../models/modelCompany')
const User = require('../../models/modelUser')
const {configCompany} = require('../../helpers/dataConfig');


const insertCompanyRepository = async(dataCampany: any) =>{
    
    console.log("datos de compañia",dataCampany);
    let com_code: string | Error = await companyCode(dataCampany.com_name);
    dataCampany.com_code = com_code; 
    
    let {user_name, user_password, pro_name=configCompany.pro_name, ...companyData} = dataCampany

    try { 
        const company: CompanyInterface = await Company(companyData);
        
        const profile: UserProfileInterface = await UserProfile.findOne({pro_name, pro_status:true});
        const idProfile = profile._id;
        if (!idProfile){
            return {
                status:800,
                message:"perfil de usuario no existe"
            }
        }
        company.save(async(err:any, product:any, numAffected:number) =>{
            if (err) {
                return {
                    status:500,
                    message: err.message
                };
            } else if(product) {
                
                user_password = encriptPassword(user_password);
                const data = {
                    user_name,
                    user_password,
                    com_id:product._id,
                    pro_code: idProfile
                } 
                const user = await User(data)
                user.save((err:any, user:any) =>{
                    if (err) {
                        return {
                            status:500,
                            message: err.message
                        };
                    }
                    
                });
            }

          });

          return {
            status:200,
            message:"usuario de compañia insertado",
            com_code,
        }
    } catch (error:any) {
        console.log(error);
        return {
            status:500,
            message:error}
    }
}

export = insertCompanyRepository
