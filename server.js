
// create express server from scratch

const express = require('express');
const data = require('./prothom-alo');

const app = express();

app.get('/', async (req, res) => {

  const result = await data()

  console.log(result, 'result');

    res.status(200).json(result);
    }
);


app.listen(3000, () => {
    console.log('Server is listening on port 3000');
    }
);

