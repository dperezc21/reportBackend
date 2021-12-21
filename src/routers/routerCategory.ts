const { validRol } =require("../middleware/validateFields");

const { getCategories,
    deleteCategory, 
    insertCategory } = require( "../controllers/controllerCategory");
const {verifiyJWT} = require( "../middleware/verifyToken");

const {Router} = require('express');

const router = Router();

router.post('/insertCategory', [verifiyJWT, validRol], insertCategory)
router.get('/getCategory', verifiyJWT, getCategories);
router.delete('/deleteCategory', [verifiyJWT, validRol] , deleteCategory);

export = router;