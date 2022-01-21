
const validNumberUser = require("../middleware/validNumUser");
const {validUserName, validPassword, validRol, validFieldUpdateUser} = require( "../middleware/validateFields");
const {insertUser,
    loginUser,
    getCompanyUser,
    deleteCompanyUser,
    updateCompanyUser,
    updateUserStatus
} = require('../controllers/controllerUser');

const {verifiyJWT} = require( "../middleware/verifyToken");


const {Router} = require('express');

const router = Router();
router.post('/insertUser',[validUserName, validPassword, validNumberUser], insertUser);
router.post('/loginUser', validPassword, loginUser);
router.get('/companyUser', [verifiyJWT, validRol], getCompanyUser);
router.put('/updateCompanyUser', [verifiyJWT,validRol] , deleteCompanyUser);
router.put('/updateUser',[verifiyJWT,validRol, validFieldUpdateUser], updateCompanyUser);
router.put('/updateUserStatus',[verifiyJWT,validRol], updateUserStatus);
export = router;