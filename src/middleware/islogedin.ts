import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const isLoged = async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers["authorization"];
  if (auth) {
    const token = auth.split(" ")[1];
    try {
      const data = verify(token, "test") as {
        email: string;
        username: string;
        isAdmin: boolean;
      };

      next();
    } catch (error) {
      console.log(error);
      res.status(300).redirect("/");
      return;
    }
  } else {
    res.status(300).redirect("/");
    return;
  }
};

export default isLoged;
