import Puppeteer from "puppeteer";
import { Request, Response } from "express";
import dehash from "./hashs";
import { Bucket, s3 } from "../../util/upload";
import remove from "../../middleware/removepoint";
const getCar = async (req: Request, res: Response) => {
  const browser = req.Browser;
  const { vin, type } = req.query as {
    vin: string;
    lan?: string;
    type?: string;
  };
  const hashedvin = dehash(vin);

  console.time(`finding ${hashedvin}`);

  s3.getObject({ Bucket, Key: "pdf/" + hashedvin }, async (err, data) => {
    if (data) {
      res.set("title", "carvin17");
      res.contentType("application/pdf");
      res.end(data.Body, "base64");
    } else if (err) {
      console.log(err);

      const data = await browser.find(hashedvin);
      if (data) {
        if (req.headers.id) {
          remove(req.headers.id as string).then((a) => console.log(a));
        }
        res.contentType("application/pdf");
        res.end(data, "base64");
      }
      // // const h = await page.evaluate(() => {
      // //   const body = document.querySelector("body");
      // //   const end: HTMLDivElement | null =
      // //     document.querySelector("#glossaryModule");
      // //   const end2: HTMLDivElement | null =
      // //     document.querySelector("#disclaimerSection");

      // //   if (body && end && end2) {
      // //     return {
      // //       height: body.offsetHeight - end.offsetHeight - end2.offsetHeight,
      // //       width: body.offsetWidth,
      // //     };
      // //   }
      // //   return { height: 1080, width: 1920 };
      // // });
      // await page.setViewport({ height: h.height, width: h.width });

      // }
      // s3.upload(
      //   {
      //     Key: "pdf/" + hashedvin,
      //     Body: data,
      //     Bucket: Bucket,
      //     ContentType: "application/pdf",
      //   },
      //   (err, res) => {
      //     if (err) {
      //       console.log(err);
      //     }
      //     console.log(res);
      //   }
      // );
      // }
    }
  });
};

export default getCar;
