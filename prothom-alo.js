const puppeteer = require('puppeteer');

const data =  async function extractData() {
  const browser = await puppeteer.launch({
    headless: "new",
  } );
  const page = await browser.newPage();

  // Navigate to the URL containing the HTML grid
  await page.goto('https://www.prothomalo.com/business');

  // Wait for the grid elements to load
  await page.waitForSelector('div._0M8sO, div.PdzjE, div.G-Wf8, div.QbrSF, div.kR3by');

  // Extract the data from all div elements
  const divElements = await page.$$('div._0M8sO, div.PdzjE, div.G-Wf8, div.QbrSF, div.kR3by');
  const extractedData = [];

  console.log('checkin', divElements);
  for (const divElement of divElements) {
    const title = await divElement.$eval('h3.headline-title', (element) => element.textContent.trim());
    const link = await divElement.$eval('a', (element) => element.href);
    const text = await divElement.$eval('span.tilte-no-link-parent', (element) => element.textContent.trim());

    extractedData.push({
      title,
      link,
      text,
    });
  }

  // Close the browser
  await browser.close();

  return extractedData;
}


data();
// Call the function to extract data

  // export

  // module.exports = data;
