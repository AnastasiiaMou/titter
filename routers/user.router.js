const { Router} = require('express')
const userController = require('../controllers/user.controller')
const {authMiddleware} = require("../auth");

const userRouter = Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/me', authMiddleware, userController.me);

module.exports = userRouter;