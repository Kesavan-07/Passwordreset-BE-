const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.post("/logout", authController.logout);
authRouter.post('/resetpassword', authController.resetPassword);
authRouter.put('/resetpasswordform/:token', authController.resetPasswordform); 
authRouter.get("/myProfile", auth.verifylogin, authController.myProfile);

module.exports = authRouter;

