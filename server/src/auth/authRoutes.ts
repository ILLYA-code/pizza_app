import express, { Request, Response} from "express";
import { register, login, logout, refreshToken } from "./authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshToken);

export default router;