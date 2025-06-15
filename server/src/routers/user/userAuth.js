const express = require("express");
const router = express.Router();
// const Authozation = require("../../middleware/auth")
const controller = require('../../controllers/user/userAuths')
// const { upload } = require('../../middleware/upload.middleware');

router.post('/register', controller.register);
router.post('/verify-account', controller.vertifyAccount);
router.post('/forgot-password', controller.forgot);
router.post('/otp-forgot', controller.otp);
router.post('/reset-password', controller.reset);
router.post('/resend-verify', controller.resendOtp);
// router.get('/profile', Authozation.authenticateToken, controller.getProfile);
// router.post('/profile', Authozation.authenticateToken, upload.fields([{ name: 'avatar', maxCount: 1 }]), controller.updateProfile);
router.post('/login-google', controller.loginGoogle);

module.exports = router;