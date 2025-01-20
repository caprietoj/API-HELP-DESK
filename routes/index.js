const express = require('express');
const userRoutes = require('./userRoutes');
const ticketRoutes = require('./ticketRoutes');
const incidentTypesRoutes = require('./incidentTypesRoutes');
const technicianRoutes = require('./technicianRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/tickets', ticketRoutes);
router.use('/incident-types', incidentTypesRoutes);
router.use('/technicians', technicianRoutes);

module.exports = router;
