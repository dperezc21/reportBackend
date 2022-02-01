import { check } from "express-validator";

const validNumberUser = require("../middleware/validNumUser");
const {validRol, validChecks} = require( "../middleware/validFieldsCompany");
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
    validFieldUpdateUser} = require("../middleware/validFiledsUser");

const {verifiyJWT} = require( "../middleware/verifyToken");


const {Router} = require('express');

const router = Router();
router.post('/insertUser',[
    check('user_email', 'email de usuario es requerido').isEmail(),
    validUserName, 
    validPassword,
    validIdType,
    validUserId,
    validnamesUser,
    validLastName,
    validNumberUser,
    validChecks], insertUser);
router.post('/loginUser',validPassword, loginUser);
router.get('/companyUser', [verifiyJWT, validRol], getCompanyUser);
router.put('/updateCompanyUser', [verifiyJWT,validRol] , deleteCompanyUser);
router.put('/updateUser',[verifiyJWT,validRol, validFieldUpdateUser], updateCompanyUser);
router.put('/updateUserStatus',[verifiyJWT,validRol], updateUserStatus);
export = router;