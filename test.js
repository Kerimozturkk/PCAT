const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const Schema = mongoose.Schema;

// connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//Eğer aynı veri tabanı varsa bağlanıyor yoksa oluşturuyor.

// create schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
}); // Projemizin ana verisi fotoğraf
// pptpğraf verisine ait bir schema oluşturduk

const Photo = mongoose.model('Photo', PhotoSchema); // Burda mongose Photo yu photos'a çevirip collection oluşturuyor.

// create a photo
// Photo.create({
//   title: 'Photo Title 4',
//   description: 'Photo description 4 lorem ipsum',
// });

// Photo.find({}, (err, data) => {
//   console.log(data);
// });

// const id = '63d8bd8de8a11ee2c284f029';

// Photo.findByIdAndUpdate(
//   id,
//   {
//     title: 'Photo Title 444 updated',
//     description: 'Photo Description 444 updated',
//   },
//   {
//     new: true // bu nesneyi ekleyince aşağıdaki logta güncellenmiş veriyi göstericek
//   },
//   (err, data) => {
//     console.log(data); // update edilecek veriyi döndü
//   }
// );

// delete a photo
const id = '63d8bd8de8a11ee2c284f029';
Photo.findByIdAndDelete(id,(err,data) => {
    console.log('Photo is removed');
})

//mongoose bir ODM aracıdır. Yani Object Document Mapper
// Schema şablonu yardımıyla verileri document'a map eder...
// mongoose ile schema yardımıyla veri tabanında ilgili dökümanları oluşturabiliriz.

//DeprecationWarning eskimiş teknik bi dökümantasyona bak
