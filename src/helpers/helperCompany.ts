import moment from "moment";
import ReportInterface from "../interfaces/reportInterface";
const { orderReportsByNumReports, orderReportsByDate } = require("./helperReport");
const { configCompany } = require('./dataConfig');

class HelperCompany {

    dataReportsAdmin = (reports: ReportInterface[]) => {
        let data: any = {};
        reports.forEach((report: ReportInterface) => {
            const user_name = report.user_code.user_name;
            if (Object.keys(data).includes(user_name)) {
                data[user_name] += 1;
            } else {
                data[user_name] = 1;
            }
        })

        let data_list: object[] = [];
        for (const key in data) {
            const user_name = key
            const num_reports = data[key];
            data_list.push({
                user_name,
                num_reports
            });
        }
        const orderedReports: object[] = orderReportsByNumReports(data_list);
        return orderedReports;
    }


    dataReportByGrafic = (reports: ReportInterface[]) => {
        let data_list: object[] = [];
        let data: any = {};
        reports.forEach((report: ReportInterface) => {
            const date = new Date(report.rep_create_date)
            const d = moment(date).format("YY-MM-DD");
            if (Object.keys(data).includes(d)) {
                data[d] += 1;
            } else {
                data[d] = 1;
            }
        });

        for (const key in data) {
            const day = key
            const num_reports = data[key];
            data_list.push({
                day,
                num_reports
            });
        }
        const ordered_list = orderReportsByDate(data_list);
        return data_list;

    }


    dayDateRange = (date: any) => {
    
        let final_date: any = new Date(parseInt(date))
        final_date.setHours(configCompany.work_final_time);
        final_date.setMinutes(0);
        final_date = new Date(moment(final_date).format("YYYY-MM-DD HH:mm")).getTime()

        let working_hour = new Date(parseInt(date));
        working_hour.setHours(configCompany.work_start_time)
        working_hour.setMinutes(0);
        let start_date = new Date(moment(working_hour).format("YYYY-MM-DD HH:mm")).getTime()

        return { start_date, final_date }

    }

}

export = new HelperCompany;