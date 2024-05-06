import express from 'express';
import { isAuthenticated } from '../utils/authUser.js';
import { deleteDirById, getAllDirectories } from '../controllers/dirController.js';

const router = express.Router();

// user all directory
router.get("/", isAuthenticated, getAllDirectories);

// User delete directory by id
router.delete("/delete/:id", isAuthenticated, deleteDirById);




export default router;