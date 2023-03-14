import express from "express";
import cors from "cors";
import api from "./Router";
import path from "path";
import getCar from "./Router/Car/get";
import get2 from "./Router/Car/get2";
import { puppeterr } from "./Router/class/queu";
import { Browser } from "puppeteer";
const port = (process.env as any).PORT || 5000;
declare global {
  namespace Express {
    interface Request {
      Browser: puppeterr;
    }
  }
}
const start = async () => {
  const pup = await new puppeterr().init();

  const app = express();
  app.use(
    cors({
      origin: ["https://carvin17.com", "https://www.carvin17.com"],
    })
  );
  app.request.Browser = pup;
  app.request.app.use(express.json({}));
  app.use("/api", api);
  app.get("/vhrs", getCar);
  app.get("/sticker", get2);
  app.use(express.static(path.join(__dirname, "..", "static")));

  app.listen(port, () => {
    console.log(`up and running at port ${port}`);
  });
};
start();
