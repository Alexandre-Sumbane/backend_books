import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

export class AuthMiddleware {
    async authenticate(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization;

            const token = authHeader && authHeader.split(" ")[1];

            if (!token) {
                return res.status(401).json({ message: "Token não fornecido" });
            }

             const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

      req.user = {
        //...user.toJSON(),
        userId: decoded.id,
        token,
        userType: decoded.userType,
        role: decoded.role
      };
      console.log("User authenticated:", req.user);

      
            next();
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}