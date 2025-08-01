// src/routes/auth.routes.js

import express from 'express';
import { sendSignupOtp, signup } from '../controllers/signup.controller.js';
import { login, logout } from '../controllers/login.controller.js';
import { getMe } from '../controllers/login.controller.js';
import { verifyJwt } from '../middlewares/verifyJwt.middleware.js';

const register = express.Router();

register.post('/send-otp', sendSignupOtp);
register.post('/signup', signup);
register.post('/login',login);
register.post('/logout',logout);
register.get('/getme',verifyJwt,getMe);


export default register;
