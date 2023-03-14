import axios from "axios";
import { Request, Response } from "express";
import path from "path";
import Puppeteer from "puppeteer";
import dehash from "./hashs";

const get2 = async (req: Request, res: Response) => {
  const { vin } = req.query as { vin: string; lan?: string };
  try {
    const browser = await Puppeteer.launch({
      headless: true,
      executablePath: "/usr/bin/google-chrome",
      args: ["--no-sandbox "],
      defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto("https://www.carfaxonline.com/login");
    await page.type("[id=username]", "yousif.carfax@gmail.com");
    await page.type("[id=password-input]", "Yousif716@");
    await page.click("[type=submit]");
    //CARFAX Vehicle History Report for this 2020 FORD EXPLORER LIMITED: 1FMSK8FH3LGD1618
    await page.waitForTimeout(700);
    await page.goto(`https://www.carfaxonline.com/vhrs/${vin}`);
    await page.waitForTimeout(1000);

    const info = await page.evaluate(() => {
      const body = document.querySelector(
        "#originalWindowSticker"
      ) as HTMLDivElement;
      if (body) {
        const a = body.querySelector(":scope > a") as HTMLAnchorElement;
        return a.href;
      }
    });
    if (info) {
      console.log(info);
      const pa = await axios.get(info, { responseType: "arraybuffer" });
      res.contentType("application/pdf");
      res.send(pa.data).end();
    }
    await browser.close();
  } catch (error) {
    res.sendStatus(500);
  }
};
export default get2;
