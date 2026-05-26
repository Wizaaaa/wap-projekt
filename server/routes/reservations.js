const express = require('express');
const router = express.Router();
const {
    getReservations,
    createReservation,
    updateReservationStatus,
    deleteReservation
} = require('../controllers/Reservations');

router.get('/', getReservations);
router.post('/', createReservation);

router.patch('/:id/status', updateReservationStatus);
router.delete('/:id', deleteReservation);

module.exports = router;