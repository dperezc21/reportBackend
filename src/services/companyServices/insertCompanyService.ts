import companyCode from "../../helpers/generateCompanyCode";
import CompanyInterface from "../../interfaces/companyInterface";
import GenderInterface from "../../interfaces/genderInterface";
import IdTypeInterface from "../../interfaces/idTypeInterface";
import UserProfileInterface from "../../interfaces/userProfileInterface";
import modelGender from "../../models/modelGender";
import modelIdType from "../../models/modelIdType";
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
       
        insertCompany.save(async(err:any, product:any, numAffected:number) =>{
            if (err) {
                return {
                    status:500,
                    message: err.message
                };
            } else if(product) {

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

                console.log("asdf",product)

                const idType: IdTypeInterface = await modelIdType.findOne({_id:user.user_id_type})
        if(!idType){
            return {
                status:400,
                message:"no existe tipo de identificacion"
            }
        }

        const gender: GenderInterface = await modelGender.findOne({_id:user.gender_id})
        if(!gender){
            return {
                status:400,
                message:"genero no existe"
            }
        }
                user.user_password = encriptPassword(user.user_password);
                user.com_id = product._id;
                user.pro_code = idProfile;
                user.user_id_type = idType._id;
                user.user_sexo = gender._id
            
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
        // console.log(error);
        return {
            status:500,
            message:error}
    }
}

export = insertCompanyRepository
