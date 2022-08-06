const { Router} = require('express')
const userController = require('../controllers/user.controller')

const userRouter = Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/me', userController.me)

module.exports = userRouter;