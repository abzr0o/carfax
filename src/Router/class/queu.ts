import Puppeteer, { Browser, Page } from "puppeteer";
export class puppeterr {
  private browser: Browser;
  private loginpage: Page;
  private page: Page;
  constructor() {}
  async init() {
    console.time("starting browser");
    this.browser = await Puppeteer.launch({
      headless: true,
      executablePath: "/usr/bin/google-chrome",
      args: ["--no-sandbox "],
      defaultViewport: null,
      userDataDir: "./userCache",
    });
    this.loginpage = await this.browser.newPage();
    await this.loginpage.goto("https://www.carfaxonline.com/login");
    await this.loginpage.type("[id=username]", "yousif.2ljanabi@gmail.com");
    await this.loginpage.type("[id=password-input]", "Mustafa71");
    await this.loginpage.click("[type=submit]");
    await this.loginpage.waitForTimeout(1000);
    console.timeEnd("starting browser");
    return this;
  }
  async find(vin: string) {
    console.time(`finding ${vin}`);
    this.page = await this.browser.newPage();
    await this.page.goto(`https://www.carfaxonline.com/vhrs/${vin}`);
    await this.page.waitForTimeout(1500);
    const info = await this.page.evaluate(() => {
      const nav = document.querySelector("#nav");
      const t = document.querySelector("#dealer-name-in-lights");
      const p = document.querySelector("#print-only-nil") as HTMLElement;
      const car = document.querySelectorAll("#dealer-name");
      const head = document.querySelector("#headerMakeModelYear");
      const vin = document.querySelector(".vin");
      if (nav) {
        nav.remove();
      }
      if (t) {
        t.remove();
      }

      if (car) {
        car.forEach((e) => {
          e.remove();
        });
      }

      const list = p?.childNodes;
      if (list) {
        for (let i = 0; i < list.length; i++) {
          p.removeChild(list[i]);
        }
      }
      const time = new Date();
      function formatAMPM(date: Date) {
        var hours = date.getHours();
        var minutes = date.getMinutes() as string | number;
        var ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var strTime = hours + ":" + minutes + " " + ampm;
        return strTime;
      }
      if (p) {
        p.style.border = "none";
        p.innerHTML = `<span>${
          time.toLocaleDateString("en-US") + " " + formatAMPM(time)
        }</span><span>CARFAX Vehicle History Report for this${
          head?.textContent
        }:${vin?.textContent}</span>`;
      }
      return head?.textContent;
    });

    await this.page.evaluate(() => {
      const body = document.querySelector("#originalWindowSticker");
      const vin = document.querySelector(".vin");
      if (body) {
        const a = body.querySelector("a");
        if (a) {
          a.href = `https://carvin17.com/sticker?vin=${vin?.textContent}`;
          a.target = "_blank";
          return a.href;
        }
      }
      return null;
    });
    console.timeEnd(`finding ${vin}`);
    if (info) {
      const data = await this.page.pdf({});
      await this.page.close();
      return data;
    }
    return null;
  }
  async close() {
    await this.browser.close();
  }
}
