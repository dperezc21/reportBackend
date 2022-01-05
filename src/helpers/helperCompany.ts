import ReportInterface from "../interfaces/reportInterface";

class HelperCompany{

    dataReports = (reports:ReportInterface[]) => {
        let data: any = {};
        
        reports.forEach((report: ReportInterface) => {
            const user_name =report.user_code.user_name;
            if(Object.keys(data).includes(user_name)){
                data[user_name] +=1;
            }else{
                data[user_name] = 1;
            }
        })
        
        for (const clave in data) {
            if(data[clave] < 10) {
                delete data[clave];
            }
        }
        return data;
    }
    
}

export = new HelperCompany;