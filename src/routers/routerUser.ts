
const validNumberUser = require("../middleware/validNumUser");
const {validRol} = require( "../middleware/validFieldsCompany");
const { validFieldUpdateUser} = require( "../middleware/validFiledsUser");
const {insertUser,
    loginUser,
    getCompanyUser,
    deleteCompanyUser,
    updateCompanyUser,
    updateUserStatus
} = require('../controllers/controllerUser');

const {validUserName,validPassword,
    validIdType,
    validUserId,
    validnamesUser,
    validLastName,
    validUserEmail} = require("../middleware/validFiledsUser");

const {verifiyJWT} = require( "../middleware/verifyToken");


const {Router} = require('express');

const router = Router();
router.post('/insertUser',[validUserName, 
    validPassword,
    validNumberUser,
    validIdType,
    validUserId,
    validnamesUser,
    validLastName,
    validUserEmail], insertUser);
router.post('/loginUser',validPassword, loginUser);
router.get('/companyUser', [verifiyJWT, validRol], getCompanyUser);
router.put('/updateCompanyUser', [verifiyJWT,validRol] , deleteCompanyUser);
router.put('/updateUser',[verifiyJWT,validRol, validFieldUpdateUser], updateCompanyUser);
router.put('/updateUserStatus',[verifiyJWT,validRol], updateUserStatus);
export = router;