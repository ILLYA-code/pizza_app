import express from "express";
import { register, login, logout, refreshToken } from "./authController";
import { sendCode, verifyCode } from "./emailVerification";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshToken);
router.post("/send-code", sendCode);
router.post("/verify-code", verifyCode);

export default router;