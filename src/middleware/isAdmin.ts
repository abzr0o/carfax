import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers["authorization"];
  if (auth) {
    const token = auth.split(" ")[1];
    try {
      const data = verify(token, "test") as {
        email: string;
        username: string;
        isAdmin: boolean;
      };
      if (data.isAdmin) {
        next();
      } else {
        res.status(403).json({ error: "Forbidden" });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({ erorr: "token error" }).end();
      return;
    }
  } else {
    res.status(400).json({ erorr: "no authorization header" }).end();
    return;
  }
};

export default isAdmin;
