const express = require('express');
const cookieParser = require('cookie-parser');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.listen(3000, () => {
    console.log('Listened')
})

module.exports = app;
