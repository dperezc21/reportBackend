import companyCode from "../../helpers/generateCompanyCode";
import CompanyInterface from "../../interfaces/companyInterface";
import UserProfileInterface from "../../interfaces/userProfileInterface";
const {encriptPassword} = require("../../helpers/helperUser")
const UserProfile = require('../../models/modelUserProfile');

const Company = require('../../models/modelCompany')
const User = require('../../models/modelUser')
const {configCompany} = require('../../helpers/dataConfig');


const insertCompanyRepository = async(dataCompany: any) =>{
    
    let {user, company} = dataCompany;
    let com_code: string | Error = await companyCode(company.com_name);
    company.com_code = com_code; 
    // let {user_name, user_password, pro_name=configCompany.pro_name, ...companyData} = dataCampany

    try { 
        const insertCompany: CompanyInterface = await Company(company);
        // const company: CompanyInterface = await Company(companyData);
        
        const profile: UserProfileInterface = await UserProfile.findOne({
            pro_name:configCompany.pro_name, pro_status:true
        });
        const idProfile = profile._id;
        if (!idProfile){
            return {
                status:800,
                message:"perfil de usuario no existe"
            }
        }
        insertCompany.save(async(err:any, product:any, numAffected:number) =>{
            if (err) {
                return {
                    status:500,
                    message: err.message
                };
            } else if(product) {
                console.log(product)
                user.user_password = encriptPassword(user.user_password);
                user.com_id = product._id;
                user.pro_code = idProfile;
            
                const insertUser = await User(user)
                insertUser.save((err:any, user:any) =>{
                    console.log(user)
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
