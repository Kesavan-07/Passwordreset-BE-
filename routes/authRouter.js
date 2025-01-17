const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.post('/resetpassword', authController.resetPassword);
authRouter.post('/resetpasswordform', authController.resetPasswordform);
authRouter.get('/myprofile', auth, authController.myprofile);

module.exports = authRouter;