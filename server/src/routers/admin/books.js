const { upload } = require('../../middleware/upload.middleware');
const express = require("express");
const router = express.Router();
const bookController = require('../../controllers/admin/books');
const Authozation = require("../../middleware/auth")


router.get('/category', Authozation.authenticateToken, Authozation.authorizeRoles(1), bookController.getAllCategories);
router.post('/category', Authozation.authenticateToken, Authozation.authorizeRoles(1), bookController.createCategory);
router.get('/category/:id', Authozation.authenticateToken, Authozation.authorizeRoles(1), bookController.getCategoryById);
router.put('/category/:id', Authozation.authenticateToken, Authozation.authorizeRoles(1), bookController.updateCategory);
router.delete('/category/:id', Authozation.authenticateToken, Authozation.authorizeRoles(1), bookController.deleteCategory);

router.post('/', Authozation.authenticateToken, Authozation.authorizeRoles(1), bookController.createBook);

router.get('/', Authozation.authenticateToken, Authozation.authorizeRoles(1), bookController.getAllBooks);
router.get('/:id', Authozation.authenticateToken, Authozation.authorizeRoles(1), bookController.getBookById);

router.put('/:id', Authozation.authenticateToken, Authozation.authorizeRoles(1), bookController.updateBook);

router.delete('/:id', Authozation.authenticateToken, Authozation.authorizeRoles(1), bookController.deleteBook);


module.exports = router;