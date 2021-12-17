const { insertReport, 
        getReportByCode, 
        getReports, 
        getReportByUserCode, 
        getReportByDate,
        deleteReportByCode 
    } = require("../controllers/controllerReport");
import validRol from "../middleware/validateFields";
const {verifiyJWT} = require( "../middleware/verifyToken");


const {Router} = require('express');

const router = Router();

router.post('/insertReport', insertReport);
router.get('/getReportByCode', getReportByCode);
router.get('/getReports', getReports);
router.get('/getReportUserCode', getReportByUserCode);
router.get('/getReportByDate', getReportByDate)
router.delete('/deleteReportByCode', deleteReportByCode)
export = router;