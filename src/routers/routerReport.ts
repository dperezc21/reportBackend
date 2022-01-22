const { insertReport, 
        getReportByCode, 
        getReports, 
        getReportByUserCode, 
        getReportByDate,
        deleteReportByCode,
        getNumberReportsByDay,
        getNumberReportsByTable,
        getPercentajeChart
    } = require("../controllers/controllerReport");
const {validRol} =require("../middleware/validateFields");
const {verifiyJWT} = require( "../middleware/verifyToken");
const {valid_date_reports_to_display} = require("../middleware/validDateReportsToDisplay")
const validNumberReports = require("../middleware/validNumberReports")
const {Router} = require('express');

const router = Router();

router.post('/insertReport',[verifiyJWT,validNumberReports ], insertReport);
router.get('/getReportByCode', verifiyJWT, getReportByCode);
router.get('/getReports',verifiyJWT, getReports);
router.get('/getReportUserCode', verifiyJWT, getReportByUserCode);
router.get('/getReportByDate',[verifiyJWT, valid_date_reports_to_display], getReportByDate);
router.delete('/deleteReportByCode',[verifiyJWT, validRol], deleteReportByCode);
router.get('/getNumberReportsByDay',[verifiyJWT, valid_date_reports_to_display], getNumberReportsByDay);
router.get('/getNumberReportsByTable', verifiyJWT, getNumberReportsByTable)
router.get('/getDataForGrafic',verifiyJWT, getPercentajeChart)
export = router;
