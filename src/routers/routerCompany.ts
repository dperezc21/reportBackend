const { check } = require("express-validator");

const { insertCompany,
        generateCode,
        getCompanyCode } = require("../controllers/controllerCompany");

const { verifiyJWT } = require("../middleware/verifyToken");
const {
        validCompanyName,
        validRol,
} = require("../middleware/validFieldsCompany");
const {validUserName,validPassword,
        validIdType,
        validUserId,
        validnamesUser,
        validLastName,
        validUserEmail,} = require("../middleware/validFiledsUser");
const { Router } = require('express');

const router = Router();

router.post('/insertCompany', [
        validCompanyName,
validUserName,
validPassword,
validIdType,
validUserId,
validnamesUser,
validLastName,
validUserEmail
], insertCompany);
router.put('/newCode', [verifiyJWT, validRol], generateCode);
router.get('/getCompanyCode', [verifiyJWT, validRol], getCompanyCode)


export = router;