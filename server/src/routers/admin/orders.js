const express = require("express");
const router = express.Router();
const Authozation = require("../../middleware/auth")
const controller = require('../../controllers/admin/order')

router.get('/user', Authozation.authenticateToken, Authozation.authorizeRoles(1), controller.allUserOrder);
router.get('/book', Authozation.authenticateToken, Authozation.authorizeRoles(1), controller.allBook);
router.post('/', Authozation.authenticateToken, Authozation.authorizeRoles(1), controller.createOrder);
router.get('/get-order', Authozation.authenticateToken, Authozation.authorizeRoles(1), controller.getAllOrder);
router.put('/status/:orderId', Authozation.authenticateToken, Authozation.authorizeRoles(1), controller.updateOrderStatus);


module.exports = router;