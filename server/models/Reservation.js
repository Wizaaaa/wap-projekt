const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    date: { type: String, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    notes: { type: String, default: "" },
    status: {
        type: String,
        enum: ['new', 'confirmed', 'cancelled'],
        default: 'new'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', ReservationSchema);