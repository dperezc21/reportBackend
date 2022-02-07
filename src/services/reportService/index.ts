

import insertReportService from "./insertReportService";
import getReportByUserCodeService from "./getReportByUserCodeService";
import getReportByCodeService from"./getReportByCodeService";
import getReportsService from "./getReportsService";
import getDataReportByDateService from "./getDataReportByDateForUserService";
import deleteReportByCodeService from "./deleteReportByCodeService";
import getDataReportByDateForAdminService from "./getDataReportByDateForAdminService";
import getReportsForAdminService from "./getReportsForAdminService";
import getNumberReportsByDay from "./getNumberReportsByDay";
import getNumberReportsByTable from "./getNumberReportsByTable";
import getPercentajeChartService from "./percentageChartService";
const {filterReportsAdminService,filterReportsUserService} =require("./filterReportsService");


export = {
    insertReportService,
    getReportByUserCodeService,
    getReportByCodeService,
    getReportsService,
    getDataReportByDateService,
    deleteReportByCodeService,
    getDataReportByDateForAdminService,
    getReportsForAdminService,
    getNumberReportsByDay,
    getNumberReportsByTable,
    getPercentajeChartService,
    filterReportsAdminService,
    filterReportsUserService
}