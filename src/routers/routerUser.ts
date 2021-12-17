
const  {loginUser}  =require( "../auth/loginUser");
import validNumberUser from "../middleware/validNumUser";
const {validUserName, validPassword} = require( "../middleware/validateFields");
const {insertUser} = require('../controllers/controllerUser')

const {Router} = require('express');

const router = Router();
router.post('/insertUser',[validUserName, validPassword, validNumberUser], insertUser);
router.post('/loginUser', [validUserName, validPassword], loginUser);
export = router;