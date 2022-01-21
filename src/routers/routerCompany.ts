const {insertCompany,
        generateCode,
        getCompanyCode,
        getPercentajeChart} = require( "../controllers/controllerCompany");

const {verifiyJWT} = require( "../middleware/verifyToken");
const {validRol, 
    validCompanyName,
    validUserName,
    validPassword} = require( "../middleware/validateFields");

const {Router} = require('express');

const router = Router();

router.post('/insertCompany',[validCompanyName, validUserName, validPassword], insertCompany);
router.put('/newCode',[verifiyJWT,validRol], generateCode);
router.get('/getCompanyCode',[verifiyJWT,validRol], getCompanyCode )


export = router;