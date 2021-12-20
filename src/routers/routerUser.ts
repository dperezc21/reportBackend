
const validNumberUser = require("../middleware/validNumUser");
const {validUserName, validPassword} = require( "../middleware/validateFields");
const {insertUser, loginUser} = require('../controllers/controllerUser');

const {Router} = require('express');

const router = Router();
router.post('/insertUser',[validUserName, validPassword, validNumberUser], insertUser);
router.post('/loginUser', [validUserName, validPassword], loginUser);
export = router;