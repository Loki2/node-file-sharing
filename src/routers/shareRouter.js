import express from 'express';
import { deleteSharedFileById, getAllSharedFiles, getSharedFileById, shareFile } from '../controllers/shareController.js';
import { isAuthenticated } from '../utils/authUser.js';

const router = express.Router();


//user upload new share file or 's
router.post("/share-file", isAuthenticated, shareFile);

// user all share file
router.get("/", isAuthenticated, getAllSharedFiles);

// User fetch share file by id
router.get("/fetch/:file_id", getSharedFileById);

// User delete share file by id
router.delete("/delete/:file_id", deleteSharedFileById);



export default router;