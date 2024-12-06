import express from "express";
import {addBookmark, deleteSaved} from '../controller/savedController.js';

const router = express.Router();

router.post('/save', addBookmark);

router.delete('/removeBookmark',deleteSaved);

export default router;