import ReportInterface from "../interfaces/reportInterface";

class HelperCompany{

    orderReports = (data: object[]) => {
        let ordered_list: object[] = [];

        ordered_list = data.sort( (element1: any, element2: any) => 
            ( element1.num_reports > element2.num_reports)? -1: 1)
        return ordered_list.slice(0,3);
    }

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
        
        let data_list: object[] = [];
        for (const key in data) {
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
        const orderedReports: object[] = this.orderReports(data_list);
        return orderedReports;
    }
    
}

export = new HelperCompany;