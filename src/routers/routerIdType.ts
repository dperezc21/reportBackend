const {verifiyJWT} = require("../middleware/verifyToken");

const {Router} = require('express');
const router = Router();
const {getIdTypes,insertIdTypes} =  require('../controllers/controllerIdType')
const {validRol} =  require('../middleware/validFieldsCompany')


router.get('/getIdTypes',getIdTypes)
router.post('/insertIdType/:idType',[verifiyJWT, validRol],insertIdTypes)

export = router