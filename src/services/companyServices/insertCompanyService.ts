const { consultProfile } = require("../../controllers/controllerUserProfile");
import companyCode from "../../helpers/generateCompanyCode";
const {encriptPassword} = require("../../helpers/helperUser")

const Company = require('../../models/modelCompany')
const User = require('../../models/modelUser')


const insertCompanyRepository = async(dataCampany: any) =>{
    
    console.log("datos de compañia",dataCampany);
    let com_code = await companyCode(dataCampany.com_name);
    dataCampany.com_code = com_code; 
    
    let {user_name, user_password,  ...companyData} = dataCampany

    try { 
        const company = await Company(companyData);
        const searchUser = await User.findOne({user_name, user_status:true})
        if(searchUser){
            return {
                status:601,
                message:"usuario de compañia ya existe"
            };
        }
        const pro_name="admin";
        const idProfile = await consultProfile(pro_name);

        if (idProfile == null){
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
