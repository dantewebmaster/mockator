// importando os pacotes para uso no arquivo index.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const jsonReader = require('./jsonReader');

const port = 9999;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

fs.readdir('./data', (err, files) => {
  files.forEach(file => {

    const [endpoint] = file.split('.');

    // Create get endpoints
    app.get(`/${endpoint}`, (req, res) => {
      jsonReader(`./data/${file}`, (err, data) => {
        if (!data) {
          return res.json({});
        }

        if (err) {
          return res.status(500).json(err);
        }

        return res.json({ data });
      });
    });

    // Create get by id endpoints
    app.get(`/${endpoint}/:id`, (req, res) => {
      jsonReader(`./data/${file}`, (err, data) => {
        if (!data) {
          return res.json({});
        }
        
        if (err) {
          return res.status(500).json(err);
        }

        const id = req.params.id;
        const response = data.find(item => item.id === id);

        return res.json({ response });
      });
    });

    // Create post endpoints
    app.post(`/${endpoint}`, (req, res) => {
      const body = req.body;
      
      if (Object.keys(body).length === 0) {
        return res.status(400).end();
      }
    
      jsonReader(`./data/${file}`, (err, data) => {
        const currentData = data || [];
        
        const newItem = {
          ...body, id: '_' + Math.random().toString().substr(2, 9)
        };
        
        currentData.push(newItem);
        
        fs.writeFile(`./data/${file}`, JSON.stringify(currentData, null, 2), (err) => {
          if (err) {
            console.log('Error writing file', err);
          } else {
            console.log('Successfully wrote file');
          }
        });

        return res.json({ newItem });
      });
    });
  });
});

app.listen(port, () => console.log(`Mock started at http://localhost:${port}`));
