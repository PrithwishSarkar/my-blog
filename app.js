const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const blogRoutes = require('./routes/blogRoutes')

const app = express();

app.set('view engine','ejs');
app.set('views','Views');

const dbURI = process.env.DB_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.redirect('/blogs')
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

app.use('/blogs', blogRoutes);

app.use((req, res) => {
    res.render('404', {title: '404'});
})