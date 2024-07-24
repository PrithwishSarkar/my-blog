const express = require('express');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes')

const app = express();

app.set('view engine','ejs');
app.set('views','Views');

const dbURI = "mongodb+srv://nodeuser:Asdf123@nodelearn.qpw8i2d.mongodb.net/NodeTutorial?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(3000))
.catch((err) => console.log(err));
// app.listen(3000);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //   ];
    // res.send('<p>Home page</p>');
    // res.sendFile('./Views/index.html', {root: __dirname});
    // res.render('index', {title: 'Home', blogs});
    res.redirect('/blogs')
});

app.get('/about', (req, res) => {
    // res.send('<p>About page</p>');
    // res.sendFile('./Views/about.html', {root: __dirname});
    res.render('about', {title: 'About'});
});

app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

app.use('/blogs', blogRoutes);

app.use((req, res) => {
    // res.status(404).sendFile('./Views/404.html', {root: __dirname});
    res.render('404', {title: '404'});
})