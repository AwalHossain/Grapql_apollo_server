const puppeteer = require('puppeteer');
const express = require('express');
const app = express();

const newspapers = [
    {
        name: 'cbs',
        address: 'https://www.cbsnews.com/technology/',
        base: '',
    }

    // Add other newspaper entries here
  ];


const articles = []
const websites =[]


  
  async function scrapeNewspaper(newspaper) {
    const browser = await puppeteer.launch(
        {headless: 'new'}

    ); // Launch a new browser instance
    const page = await browser.newPage(); // Create a new browser page
  
    await page.goto(newspaper.address); // Navigate to the newspaper's address
  
    // Implement the logic to extract news article links, titles, and source site names
    const articleLinks = await page.$$eval('a', (links) =>
      links.map((link) => link.href)
    );
    const articleTitles = await page.$$eval('a', (links) =>
      links.map((link) => link.textContent)
    );
    const sourceSiteName = newspaper.name;
  
    console.log('Article Links:', articleLinks);
    console.log('Article Titles:', articleTitles);
    console.log('Source Site Name:', sourceSiteName);

    
    const allArticle = articleLinks.map((link, index) => ({
        articleTitle: articleTitles[index],
        url: link,
        source: sourceSiteName,
      }));
      

    articles.push({
        allArticle
    })
    await browser.close(); // Close the browser instance
  }

  

  async function scrapeAllNewspapers() {
    for (const newspaper of newspapers) {
      await scrapeNewspaper(newspaper);
    }
  }
 
  scrapeAllNewspapers()



  app.get('/news', (req, res) => {
    res.json( articles);
})

  

app.listen(3000, () => {
    console.log('Server running on port 3000');
}
);
