const {updateStatusFiles, insertFiles, getFilesByCodeReport} = require("../controllers/controllerFile");
const {verifiyJWT} = require( "../middleware/verifyToken");
const {Router} = require('express');
const {validNumberImages, validNumberVideos, validNumberAudios} = require('../middleware/validFiles');

const router = Router();
router.post('/insertFiles',[
    verifiyJWT,
    validNumberImages,
    validNumberVideos,
    validNumberAudios], insertFiles);
router.put('/updateFiles',verifiyJWT, updateStatusFiles);
router.get('/getFilesByCodeReport', verifiyJWT, getFilesByCodeReport)

export = router;