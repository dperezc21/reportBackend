const {verifiyJWT} = require( "../middleware/verifyToken");
const {validRol} = require( "../middleware/validFieldsCompany");
const {insertProfile, getProfiles} = require('../controllers/controllerUserProfile')

const {Router} = require('express');

const router = Router();
router.post('/insertUserProfile', [verifiyJWT, validRol], insertProfile);
router.get('/getProfiles',verifiyJWT, getProfiles);

export = router;