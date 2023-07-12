const puppeteer = require("puppeteer");

const navigatePages = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.amazon.com/s?i=computers-intl-ship&bbn=16225007011&rh=n%3A16225007011%2Cn%3A11036071%2Cp_36%3A1253503011&dc&fs=true&qid=1635596580&rnid=16225007011&ref=sr_pg_1',{
    waitUntil: "load",
  })
  
    // Get the next page button again
    const is_disabled = (await page.$(' span.s-pagination-item.s-pagination-next.s-pagination-disabled') !== null);
  console.log(is_disabled, "is_disabled");

  await browser.close();
}

navigatePages();
