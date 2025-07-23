const express = require("express");
const router = express.Router();
const Authozation = require("../../middleware/auth")
const controller = require('../../controllers/admin/statistic')

router.get('/:year', Authozation.authenticateToken, Authozation.authorizeRoles(1), controller.dashBoard);


module.exports = router;