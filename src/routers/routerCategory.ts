const { getCategories,
    deleteCategory, 
    insertCategory } = require( "../controllers/controllerCategory");
const {verifiyJWT} = require( "../middleware/verifyToken");


const {Router} = require('express');

const router = Router();

router.post('/insertCategory', insertCategory)
router.get('/getCategory', getCategories);
router.delete('/deleteCategory' , deleteCategory);

export = router;