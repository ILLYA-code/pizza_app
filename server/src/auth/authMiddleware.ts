import { Request, Response, NextFunction } from "express";
import jwt, {JwtPayload} from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(403).json({ error: "access denied ((" });  

    jwt.verify(token, process.env.JWT_SECRET!, (err: jwt.VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
        if(err) return res.status(403).json({ error: "invalid token *("});
        
        if(decoded && typeof decoded !== "string") {
            (req as any).user = decoded;
        }

        next();
    })
    
}