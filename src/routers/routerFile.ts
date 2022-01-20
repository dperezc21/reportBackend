const {updateStatusFiles, insertFiles, getFilesByCodeReport} = require("../controllers/controllerFile");
const {verifiyJWT} = require( "../middleware/verifyToken");
const {Router} = require('express');
const {validNumberVideos,
    validNumberImages,
    validNumberAudios} = require('../middleware/validFiles');

const router = Router();
router.post('/insertFiles',[
    verifiyJWT], insertFiles);
router.put('/updateFiles',verifiyJWT, updateStatusFiles);
router.get('/getFilesByCodeReport', verifiyJWT, getFilesByCodeReport)

export = router;