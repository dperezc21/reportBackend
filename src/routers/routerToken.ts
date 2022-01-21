import verifyToken from "../middleware/verifyToken";

const validToken = require("../controllers/controllerToken");

const {Router} = require('express');

const router = Router();

router.get('/validToken', [verifyToken], validToken)

export = router