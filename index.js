const puppeteer = require('puppeteer');

async function extractData() {
    const browser = await puppeteer.launch({
        headless: 'new',
        // userDataDir: './temp',
    });
    const page = await browser.newPage();

    await page.goto('https://www.amazon.com/s?i=specialty-aps&bbn=16225007011&rh=n%3A16225007011%2Cn%3A172456&ref=nav_em__nav_desktop_sa_intl_computer_accessories_and_peripherals_0_2_6_2');

    const productsHandles = await page.$$('div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item');
    const extractedData = [];
console.log(productsHandles, 'productsHandles');
    for (const producthandle of productsHandles) {
        let title = "Null";
        let price = "Null";
        let img = "Null";
  
        try {
          title = await page.evaluate(
            (el) => el.querySelector("h2 > a > span").textContent,
            producthandle
          );
        } catch (error) {}

        try {
            price = await page.evaluate(
                (el) => el.querySelector(".a-price > .a-offscreen").textContent,
                producthandle
            );
        } catch (error) {}

        try {
            img = await page.evaluate(
                (el) => el.querySelector(".s-image").src,
                producthandle
            );
        } catch (error) {}

        if(title != "Null"){
            extractedData.push({
                title,
                price,
                img,
            });
        }
    
        console.log(title, 'title');
    // await browser.close();
    }

    return extractedData;
}

// extractData(

// );
extractData().then((data) => console.log(data));
