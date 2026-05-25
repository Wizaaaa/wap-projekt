var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const cors = require("cors");
const MenuSection = require('./models/MenuSection');

var app = express();

mongoose
    .connect("mongodb+srv://admin:ujankaadmin@ujanka.vjb8ymh.mongodb.net/UJankaDatabaze?appName=UJanka")
    .then(() => console.log("Databaze pripojena"))
    .catch((err) => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/menu', async (req, res) => {
    try {
        // Najde všechny položky v kolekci a pošle je jako JSON
        const menu = await MenuSection.find();
        res.json(menu);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Chyba při načítání menu z databáze." });
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server úspěšně běží a naslouchá na portu ${PORT}`);
});