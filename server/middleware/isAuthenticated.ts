import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
      return;
    }

    // verify the token
    const decode = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;

    // check whether decoding is successful
    if (!decode || !decode.userId) {
      res.status(401).json({ success: false, message: "Invalid token" });
      return;
    }

    req.id = decode.userId;
    next();
  } catch (error) {
    console.log("isAuthenticated error: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default isAuthenticated;
