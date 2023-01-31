const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));

app.use(express.urlencoded({extended:true})); //url'deki datayı okur
app.use(express.json()); // url'deki datayı jsona çevirir.
//postu yakalamamızı sağlayan core express middleware'ı normalde body parser kullanılır.

// ROUTES
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', (req, res) => { //add.ejs yaptığım yönlendirmeyi yakalıyorum...
  console.log(req.body);
  res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server port ${port} de başlatıldı...`);
});
