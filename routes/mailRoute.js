import express from "express";
import { sendEmail } from "../controllers/emailCtrl.js";
const router = express.Router();
router.post('/send',sendEmail)
export default router;