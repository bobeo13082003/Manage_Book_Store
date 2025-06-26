const express = require("express");
const router = express.Router();
const Authozation = require("../../middleware/auth")
const controller = require('../../controllers/admin/user')
// const { upload } = require('../../middleware/upload.middleware');

router.get('/all-users', Authozation.authenticateToken, Authozation.authorizeRoles(1), controller.getAll);

router.post('/',
    Authozation.authenticateToken, Authozation.authorizeRoles(1),
    controller.create);

router.put('/:id',
    Authozation.authenticateToken, Authozation.authorizeRoles(1),
    controller.update);

router.patch('/:id/status',
    Authozation.authenticateToken, Authozation.authorizeRoles(1),
    controller.updateStatus);

router.patch('/:id/role',
    Authozation.authenticateToken, Authozation.authorizeRoles(1),
    controller.updateRole);

module.exports = router;