const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const Photo = require('./models/Photo');

const app = express();

// connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
 
// ROUTES
app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index', {
    photos,
  });
});

app.get('/photos/:id', async (req, res) => {
  // res.render('about');
  // console.log(req.params.id);

  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  // console.log(req.files.image);

  // await Photo.create(req.body);
  // res.redirect('/');

  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir); // Asenkron değil önce klasör oluşturulucak
  }

  let uploadedImage = req.files.image; // Burda img'a ait bilgiler alıyoruz. forma birşeyler eklenmesi gerekli

  let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;
  // yüklenen img'ler için server kök dizininde bir dosya oluşturuyoruz.
  // Bu dosya üzerinden img'ler gösterilecek dosya oluşturduk path'i yakalamak için
  // img'i da ekliyoruz.

  //img'yi istenilen klasöre move et
  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name, // görselin yolunu yani path'ini db'ye attık
    });
    res.redirect('/');
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server port ${port} de başlatıldı...`);
});
