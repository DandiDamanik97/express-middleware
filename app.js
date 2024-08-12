const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const app = express()
const port = 3000



//view engine menggunakan EJS

app.set('view engine', 'ejs');

//third-party middleware
app.use(expressLayouts);
app.use(morgan('dev'));


//build-in middleware
app.use(express.static('public'))

//application level middleware
//middleware bisa beberapa,tapi perhatikan posisi letak middilewarenya
app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next(); //janganlupa harus buat next
})

app.get('/', (req, res,) => { //callback itu req dan res
  const mahasiswa  = [
    {
      nama: 'Dandi Damanik',
      email: 'dandi@gmail.com',
    },
    {
      nama: 'Tornando',
      email: 'tornando@gmail.com',
    },
    {
      nama: 'Frangko',
      email: 'franko@gmail.com',
    },
  ];
    res.render('index', {
      layout:'layouts/main-layout',
      nama: 'Dandi Damanik',
       title: 'Halaman Home',
      mahasiswa,
    });
  });

app.get('/about', (req, res,) => {
  res.render('about', {
    layout: 'layouts/main-layout',
    title: 'Halaman About',
  });
  });

app.get('/contact', (req, res) => {
  res.render('contact', {
    layout: 'layouts/main-layout',
    title: 'Halaman Contact'});
  });

app.get('/product/:id', (req, res) => {
    res.send(`Product ID :  ${req.params.id} <br> Category : ${req.query.category}`);
});


//caontoh middlware
app.use((req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
}); //menjalankan middleware,jadi use test ini saat menjalankan  yang bukan routenya,dan jangan buat posisinya di palinga atas


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


