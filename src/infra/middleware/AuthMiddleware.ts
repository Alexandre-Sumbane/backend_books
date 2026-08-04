import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


import { env } from "@/env";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        token: string;
        userType?: string;
        role?: string;
      };
    }
  }
}

interface TokenPayload extends JwtPayload {
  id: string;
  userType?: string;
  role?: string;
}

export class AuthMiddleware {
  static async authenticate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          message: "Token não fornecido",
        });
      }

      const decoded = jwt.verify(
        token,
        env.JWT_SECRET!
      ) as TokenPayload;

      req.user = {
        userId: decoded.id,
        token,
        userType: decoded.userType,
        role: decoded.role,
      };

      console.log("User authenticated:", req.user);

      next();
    } catch (err) {
      console.error(err);

      return res.status(403).json({
        message: "Token inválido",
      });
    }
  }
}