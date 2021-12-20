

const insertReportService = require( "../services/reportService/insertReportService");
const getReportByUserCodeService = require( "../services/reportService/getReportByUserCodeService");
const getReportByCodeService = require( "../services/reportService/getReportByCodeService");
const getReportsService = require( "../services/reportService/getReportsService");
const getReportByDateService = require( "../services/reportService/getReportByDateService");
const deleteReportByCodeService = require( "../services/reportService/deleteReportByCodeService");

export = {
    insertReportService,
    getReportByUserCodeService,
    getReportByCodeService,
    getReportsService,
    getReportByDateService,
    deleteReportByCodeService
}