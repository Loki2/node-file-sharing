import express from 'express';
import { loginUser, logoutUser, signupUser } from '../controllers/authController.js';

const router = express.Router();

//user login 
router.post("/login", loginUser);

// user register
router.post("/sign-up", signupUser);

//user logout
router.get("/logout", logoutUser);

export default router;