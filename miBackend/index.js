const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

let saldo = 0;

// Ruta para obtener el saldo de la billetera
app.get('/saldo', (req, res) => {
  res.json({ saldo });
});

// Ruta para depositar dinero en la billetera
app.post('/depositar', (req, res) => {
  const { cantidad } = req.body;
  saldo = saldo + cantidad;
  res.json({ mensaje: `Se depositaron ${cantidad} unidades en la billetera.` });
});

// Ruta para retirar dinero de la billetera
app.post('/retirar', (req, res) => {
  const { cantidad } = req.body;
  if (saldo >= cantidad) {
    saldo -= cantidad;
    res.json({ mensaje: `Se retiraron ${cantidad} unidades de la billetera.` });
  } else {
    res.status(400).json({ error: 'Saldo insuficiente.' });
  }
});

app.listen(port, () => {
  console.log(`La aplicación de billetera virtual está funcionando en http://localhost:${port}`);
});
