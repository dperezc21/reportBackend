const insertReportService = require( "./insertReportService");
const getReportByUserCodeService = require( "./getReportByUserCodeService");
const getReportByCodeService = require( "./getReportByCodeService");
const getReportsService = require( "./getReportsService");
const getReportByDateService = require( "./getReportByDateService");
const deleteReportByCodeService = require( "./deleteReportByCodeService");

export = {
    insertReportService,
    getReportByUserCodeService,
    getReportByCodeService,
    getReportsService,
    getReportByDateService,
    deleteReportByCodeService
}