// importando os pacotes para uso no arquivo index.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const jsonReader = require('./jsonReader');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/users', (req, res) => {
  jsonReader(`./data/${req.route.path}.json`, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json({ data });
  });
});

app.get('/customers', (req, res) => {
  jsonReader(`./data/${req.route.path}.json`, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json({ data });
  });
});

app.post('/customers', (req, res) => {
  const customer = req.body;

  if (!customer) {
    return res.status(400).end();
  }

  fs.writeFile(`./data/${req.route.path}.json`, JSON.stringify(customer), (err) => {
    if (err) {
      console.log('Error writing file', err)
    } else {
      console.log('Successfully wrote file')
    }
  })

  return res.json({ customer });
});

// o servidor irá rodar dentro da porta 9000
app.listen(9999, () => console.log('Express started at http://localhost:9999'));
