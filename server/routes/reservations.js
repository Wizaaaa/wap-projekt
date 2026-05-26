const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const {
    getReservations,
    createReservation,
    updateReservationStatus,
    deleteReservation
} = require('../controllers/Reservations');

router.post('/', createReservation);

router.get('/', verifyToken, getReservations);
router.patch('/:id/status', verifyToken, updateReservationStatus);
router.delete('/:id', verifyToken, deleteReservation);

module.exports = router;