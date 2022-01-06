import ReportInterface from "../interfaces/reportInterface";

class HelperCompany{

    dataReportsAdmin = (reports:ReportInterface[]) => {
        let data: any = {};
        reports.forEach((report: ReportInterface) => {
            const user_name =report.user_code.user_name;
            if(Object.keys(data).includes(user_name)){
                data[user_name] +=1;
            }else{
                data[user_name] = 1;
            }   
        })
        
        console.log(data)
        let data_list: object[] = [];
        for (const key in data) {
            if(data_list.length == 3) break;
            if(data[key] < 10) {
                continue;
            }
            const user_name = key
            const num_reports = data[key];
            data_list.push({
                user_name,
                num_reports
            });
        }
        return data_list;
    }
    
}

export = new HelperCompany;