const Reservation = require('../models/Reservation');

const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ createdAt: -1 });
        res.json(reservations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Chyba při načítání rezervací." });
    }
};

const createReservation = async (req, res) => {
    try {
        const newReservation = new Reservation(req.body);
        const savedReservation = await newReservation.save();
        setTimeout(() => {
            res.status(201).json(savedReservation);
        }, 1000);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Chyba při vytváření rezervace.", error: err });
    }
};

const updateReservationStatus = async (req, res) => {
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
};

const deleteReservation = async (req, res) => {
    try {
        await Reservation.findByIdAndDelete(req.params.id);
        res.json({ message: "Rezervace smazána." });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Chyba při mazání." });
    }
};

module.exports = {
    getReservations,
    createReservation,
    updateReservationStatus,
    deleteReservation
};