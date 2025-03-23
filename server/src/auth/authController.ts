import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import client from "../db";
import { generateAccessToken, generateRefreshToken } from "./authService";
// import { verifyToken } from "./authMiddleware";
import jwt, {JwtPayload} from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
    const { name, email, password,  } = req.body;

    const existingUser = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rowCount && existingUser.rowCount > 0) {
        res.status(400).json({ error: "User already exists" });
        return;
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await client.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
        [name, email, hashedPassword]
    );

    res.json({ message: "user registered" });
}

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const user = await client.query("SELECT * FROM users WHERE email = $1", [ email ]);

    if(user.rowCount === 0) {
        res.status(401).json({ error: "invalid credentials (no such email in db)"});
        return;
    }

    const isValid = await bcrypt.compare(password, user.rows[0].password);
    if(!isValid) {
        res.status(401).json({error: "invalid credentials (password)"});
        return;
    }

    const accessToken = generateAccessToken(user.rows[0].id);
    const refreshToken = generateRefreshToken(user.rows[0].id);

    res.cookie("accessToken", accessToken, { httpOnly: true, secure: false });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false});
    res.json({ message: "Logged in!!!!"});
}


export const logout = (req: Request, res: Response) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out!!"});
}



export const refreshToken = (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
  
    if (!refreshToken) {
        res.status(403).json({ error: "Refresh token required" });
        return;
    }
  
    jwt.verify(refreshToken, process.env.JWT_SECRET!, (err: jwt.VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err) {
        res.status(403).json({ error: "Invalid refresh token" });
        return;
      }
  
      const accessToken = generateAccessToken((decoded as JwtPayload).userId);
      res.cookie("accessToken", accessToken, { httpOnly: true, secure: false });
      res.json({ accessToken });
    });
  };
  