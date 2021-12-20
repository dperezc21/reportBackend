const {updateStatusFiles, insertFiles} = require("../controllers/controllerFile");

const {Router} = require('express');

const router = Router();
router.post('/insertFiles', insertFiles)
router.put('/updateFiles', updateStatusFiles);

export = router;