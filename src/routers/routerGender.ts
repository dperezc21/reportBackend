const {verifiyJWT} = require("../middleware/verifyToken");

const {Router} = require('express');
const router = Router();
const {getGender,insertGender} =  require('../controllers/controllerGender')
const {validRol} =  require('../middleware/validFieldsCompany')


router.get('/getGender',getGender)
router.post('/insertGender/:garde',[verifiyJWT, validRol],insertGender)

export = router