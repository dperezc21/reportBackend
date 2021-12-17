const Company = require('../models/modelCompany')

const companyCode = async(com_name:string) =>{
    let code = "";
    let number_one = Math.round(Math.random()*100);
    let number_two = Math.round(Math.random()*100);
    let number_three = Math.round(Math.random()*100);
    try {
        while (true){
            if (com_name.length>3){
                code = `${com_name.substring(0,3)}${number_one}${number_two}${number_three}`;
            }
            const company = await Company.findOne({com_code:code});
            if(!company){
                break;
            }
        }
        return code;
    } catch (error) {
        console.log(error)
    }
}

export = companyCode;