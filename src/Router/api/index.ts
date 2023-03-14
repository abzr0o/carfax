import { Request, Response, Router } from "express";
import Puppeteer from "puppeteer";
import remove from "../../middleware/removepoint";

const api = Router();

api.get("/:vin", async (req: Request, res: Response) => {
  const { vin } = req.params;
  try {
    const browser = await Puppeteer.launch({
      headless: true,
      executablePath: "/usr/bin/chromium-browser",

      defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto("https://www.carfaxonline.com/login");
    await page.type("[id=username]", "yousifbusiness6@gmail.com");
    await page.type("[id=password-input]", "Yousif26@");
    await page.click("[type=submit]");
    await page.waitForSelector("[class=search_by_text]");
    await page.goto(`https://www.carfaxonline.com/vhrs/${vin}`);
    await page.waitForTimeout(5000);
    const data = await page.pdf({});
    res.contentType("application/pdf");
    res.set("title", "carvin17");
    res.set("Cache-control", "public, max-age=864000").send(data).end();

    await browser.close();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default api;
