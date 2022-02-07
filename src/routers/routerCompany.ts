const { check } = require("express-validator");

const { insertCompany,
        generateCode,
        getCompanyCode } = require("../controllers/controllerCompany");

const { verifiyJWT } = require("../middleware/verifyToken");
const {
        validCompanyName,
        validRol, validNitCompany, validAddressCompany, validChecks, validEmailCompany
} = require("../middleware/validFieldsCompany");
const { validUserName, validPassword,
        validIdType,
        validUserId,
        validnamesUser,
        validLastName,validUserEmail
} = require("../middleware/validFiledsUser");
const { Router } = require('express');

const router = Router();

router.post('/insertCompany', [
        check('company.com_email', 'email de compañia es requerido').isEmail(),
        validEmailCompany,
        validUserEmail,
        validNitCompany,
        validCompanyName,
        validAddressCompany,
        check('company.com_email', 'email de usuario es requerido').isEmail(),
        validUserName,
        validPassword,
        validIdType,
        validUserId,
        validnamesUser,
        validLastName,
        validChecks,
], insertCompany);
router.put('/newCode', [verifiyJWT, validRol], generateCode);
router.get('/getCompanyCode', [verifiyJWT, validRol], getCompanyCode)


export = router;