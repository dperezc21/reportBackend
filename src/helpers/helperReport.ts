
class HelperReport {

    orderReportsByNumReports = (data: object[]) => {
        let ordered_list: object[] = [];

        ordered_list = data.sort( (element1: any, element2: any) => 
            ( element1.num_reports > element2.num_reports)? 1: -1)
        return ordered_list;
    }


    orderReportsByDate = (data: object[]) => {
        let ordered_list: object[] = [];

        ordered_list = data.sort( (element1: any, element2: any) => 
            ( element1.day > element2.day)? 1: -1)
        return ordered_list;
    }

}

export = new HelperReport