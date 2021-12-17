const {verifiyJWT} = require( "../middleware/verifyToken");
const {validRol} = require( "../middleware/validateFields");
const {insertProfile, getProfiles} = require('../controllers/controllerUserProfile')

const {Router} = require('express');

const router = Router();
router.post('/insertUserProfile', insertProfile);
router.get('/getProfiles', getProfiles)

export = router;