


const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio'); 
const app = express();


app.get('/', (req, res) => {
    res.send('Welcome to my web scraper');
});

const newspapers = [
    {
        name: 'yahoo',
        address: 'https://news.yahoo.com',
        base: ''
    },
    {
        name: 'nbc-tech',
        address: 'https://www.nbcnews.com/tech-media',
        base: ''
    },
    {
        name: 'nbc-biz',
        address: 'https://www.nbcnews.com/business',
        base: ''
    },
    {
        name: 'cbs',
        address: 'https://www.cbsnews.com/technology/',
        base: '',
    },
    {
        name: 'cnn',
        address: 'https://edition.cnn.com/business/tech',
        base: '',
    },
    {
        name: 'nyt',
        address: 'https://www.nytimes.com/international/section/technology',
        base: '',
    },
    {
        name: 'fox',
        address: 'https://www.foxbusiness.com/',
        base: 'https://www.foxnews.com/',
    },
    {
        name: 'bbc',
        address: 'https://www.bbc.com/',
        base: 'https://www.bbc.co.uk',
    },
    {
        name: 'cnbc',
        address: 'https://www.cnbc.com/elon-musk/',
        base: 'https://www.cnbc.com',
    }
    
]


const articles = []
const websites=[]


newspapers.forEach(newspaper => {
    
    axios.get(newspaper.address)
    .then(reponse => {
        const html = reponse.data;
        const $ = cheerio.load(html);

        $('a:contains("Business")' , html).each(function () {
            const title = $(this).text();
            const url = $(this).attr('href');

            articles.push({
                title,
                url: newspaper.base + url,
                source: newspaper.name
        })
    })

})

})


app.get('/news', (req, res) => {
    res.json(articles);
})




app.listen(3000, () => {
    console.log('Server running on port 3000');
}
);

