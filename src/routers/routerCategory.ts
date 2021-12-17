const { getCategories, deletecategory, insertCategory } = require( "../controllers/controllerCategory");
import verifiyJWT from "../middleware/verifyToken";

const {Router} = require('express');

const router = Router();

router.post('/insertCategory', insertCategory)
router.get('/getCategory', getCategories);
router.delete('/deleteCategory' , deletecategory);

export = router;