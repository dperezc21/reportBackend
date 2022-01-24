const Company = require('../models/modelCompany')

const companyCode = async(com_name:string) =>{

    //variables que constituyen el codigo
    let code: string = "";
    let number_one: number = Math.round(Math.random()*100);
    let number_two: number = Math.round(Math.random()*100);
    let number_three: number = Math.round(Math.random()*100);
    
        /*el ciclo termina hasta que no encuestre un codigo que exista
        en una compañia
        */
        while (true){
            if (com_name.length>=3){
                code = `${com_name.substring(0,3)}${number_one}${number_two}${number_three}`;
            }
            try {
                const company: object = await Company.findOne({com_code:code});
                if(!company){
                    break;
                }
            } catch (error:any) {
                console.log("error al generar codigo de empresa")
                return new Error(error.message)
            }
        }
        return code;
}

export = companyCode;