const puppeteer = require('puppeteer');

async function extractData() {
    const browser = await puppeteer.launch({
        headless: 'new',
        defaultViewport: false,
        // userDataDir: './temp',
    });
    const page = await browser.newPage();

    await page.goto('https://www.amazon.com/s?i=specialty-aps&bbn=16225007011&rh=n%3A16225007011%2Cn%3A172456&ref=nav_em__nav_desktop_sa_intl_computer_accessories_and_peripherals_0_2_6_2');

    const extractedData = [];

    let isBtnDisabled = false;

    while(!isBtnDisabled){

        await page.waitForSelector('[data-cel-widget="search_result_0"]');
    const productsHandles = await page.$$('div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item');


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
        
    
        }
    
    await page.waitForSelector('span.s-pagination-item.s-pagination-next',
    {
        visible: true,
    }
    );

    const is_disabled = await page.$eval('span.s-pagination-item.s-pagination-next.s-pagination-disabled', el => el !== null);

    if(!is_disabled){
        await Promise.all([
            page.click('span.s-pagination-item.s-pagination-next'),
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
        ])
    }

    
    }

    return extractedData;
}

// extractData(

// );
extractData().then((data) => console.log(data));
