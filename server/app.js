const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

let lances = []

app.get('/', (req, resp) => {
    resp.send(lances.sort((a, b) => a.valor-b.valor).reverse());
})

app.post('/lance', (req, resp) => {
    lances.push(req.body);
    resp.status(201).send('Lance recebido');    
})

app.listen(3000, () => {
    console.log('Server iniciado')
})