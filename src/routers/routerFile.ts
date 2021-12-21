const {updateStatusFiles, insertFiles} = require("../controllers/controllerFile");
const {verifiyJWT} = require( "../middleware/verifyToken");
const {Router} = require('express');

const router = Router();
router.post('/insertFiles',verifiyJWT, insertFiles)
router.put('/updateFiles',verifiyJWT, updateStatusFiles);

export = router;