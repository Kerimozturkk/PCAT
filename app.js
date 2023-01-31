const express = require('express');
const path = require('path');

const app = express();

const myLogger = (req, res, next) => {
  console.log('Middleware Log 1');
  next(); // next demessek ilerlemez middleware func ending
};

const myLogger2 = (req, res, next) => {
  console.log('Middleware Log 2');
  next(); // next demessek ilerlemez middleware func ending
};

//MIDDLEWARES
app.use(express.static('public')); // express static gömülü bir middleware fonksiyonudur.
//static dosyalar için public klasçrü
app.use(myLogger);
app.use(myLogger2);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'temp/index.html'));
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server port ${port} de başlatıldı...`);
});
