
const validNumberUser = require("../middleware/validNumUser");
const {validUserName, validPassword, validRol} = require( "../middleware/validateFields");
const {insertUser,
    loginUser,
    getCompanyUser,
    deleteCompanyUser,
    updateCompanyUser} = require('../controllers/controllerUser');

const {verifiyJWT} = require( "../middleware/verifyToken");


const {Router} = require('express');

const router = Router();
router.post('/insertUser',[validUserName, validPassword, validNumberUser], insertUser);
router.post('/loginUser', validPassword, loginUser);
router.get('/companyUser', [verifiyJWT, validRol], getCompanyUser);
router.delete('/deleteCompanyUser', [verifiyJWT,validRol] , deleteCompanyUser);
router.put('/updateUser',[verifiyJWT,validRol], updateCompanyUser);
export = router;