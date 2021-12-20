const {insertCompany,
       getCompanyUser,
        generateCode,
        deleteCompanyUser,
        updateCompanyUser} = require( "../controllers/controllerCompany");

const {verifiyJWT} = require( "../middleware/verifyToken");
const {validRol, 
    validCompanyName,
    validUserName,
    validPassword} = require( "../middleware/validateFields");

const {Router} = require('express');

const router = Router();

router.post('/insertCompany',[validCompanyName, validUserName, validPassword], insertCompany);
router.get('/companyUser', [verifiyJWT, validRol], getCompanyUser);
router.delete('/deleteCompanyUser', [verifiyJWT,validRol] , deleteCompanyUser);
router.get('/newCode',[verifiyJWT,validRol], generateCode);
router.put('/updateUser',[verifiyJWT,validRol], updateCompanyUser);

export = router;