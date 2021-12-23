const { insertReport, 
        getReportByCode, 
        getReports, 
        getReportByUserCode, 
        getReportByDate,
        deleteReportByCode 
    } = require("../controllers/controllerReport");
const {validRol} =require("../middleware/validateFields");
const {verifiyJWT} = require( "../middleware/verifyToken");

const {Router} = require('express');

const router = Router();

router.post('/insertReport',verifiyJWT, insertReport);
router.get('/getReportByCode', verifiyJWT, getReportByCode);
router.get('/getReports',verifiyJWT, getReports);
router.get('/getReportUserCode', verifiyJWT, getReportByUserCode);
router.get('/getReportByDate',verifiyJWT, getReportByDate);
router.delete('/deleteReportByCode',[verifiyJWT, validRol], deleteReportByCode)
export = router;
