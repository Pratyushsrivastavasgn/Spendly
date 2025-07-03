const express = require('express');
const usersController = require('../controllers/usersController');
const isAuth = require('../middleware/isAuth');

const userRouter = express.Router();

// Public routes
userRouter.post('/register', usersController.register);
userRouter.post('/login', usersController.login);

// Protected routes
// userRouter.get('/profile', isAuth, usersController.profile);
// userRouter.put('/change-password', isAuth, usersController.changeUserPassword);
// userRouter.put('/update-profile', isAuth, usersController.updateUserProfile);

module.exports = userRouter;
