
const {verifiyJWT} = require( "../middleware/verifyToken");

const {verifyToken} = require("../controllers/controllerToken");

const {Router} = require('express');

const router = Router();

router.get('/validToken', verifiyJWT, verifyToken)

export = router