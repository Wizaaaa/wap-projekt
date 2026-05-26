var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const cors = require("cors");
const MenuSection = require('./models/MenuSection');
const Reservation = require('./models/Reservation');

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

app.get('/api/reservations', async (req, res) => {
    try {
        // Seřadíme od nejnovějších
        const reservations = await Reservation.find().sort({ createdAt: -1 });
        res.json(reservations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Chyba při načítání rezervací." });
    }
});

// 2. VYTVOŘENÍ NOVÉ REZERVACE (Pro klienty z webu)
app.post('/api/reservations', async (req, res) => {
    try {
        const newReservation = new Reservation(req.body);
        const savedReservation = await newReservation.save();
        // Přidal jsem setTimeout jen abys při testování viděl tu krásnou animaci načítání
        setTimeout(() => {
            res.status(201).json(savedReservation);
        }, 1000);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Chyba při vytváření rezervace.", error: err });
    }
});

// 3. ZMĚNA STATUSU REZERVACE (Pro Admina - potvrzení/zrušení)
app.patch('/api/reservations/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedReservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(updatedReservation);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Chyba při změně statusu." });
    }
});

// 4. SMAZÁNÍ REZERVACE (Pro Admina)
app.delete('/api/reservations/:id', async (req, res) => {
    try {
        await Reservation.findByIdAndDelete(req.params.id);
        res.json({ message: "Rezervace smazána." });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Chyba při mazání." });
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