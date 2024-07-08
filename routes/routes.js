const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.js');
const { reservationController, resStausTypes, getCredentials, getAllData } = require('../controller/reservation.controller.js');

router.post('/reservation', authenticate, reservationController);
router.get('/responseTypes', resStausTypes)
router.get('/credentials', getCredentials)
router.get('/getAll', getAllData)

module.exports = router;
