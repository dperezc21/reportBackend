const {verifiyJWT} = require("../middleware/verifyToken");

const {Router} = require('express');
const router = Router();
const {getGarde,insertGarde} =  require('../controllers/controllerGarde')
const {validRol} =  require('../middleware/validFieldsCompany')


router.get('/getGarde',getGarde)
router.post('/insertGarde/:garde',[verifiyJWT, validRol],insertGarde)

export = router