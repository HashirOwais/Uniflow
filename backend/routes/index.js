const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const groupRoutes = require('./groupRoutes');
const eventRoutes = require('./eventRoutes');
const taskRoutes = require('./taskRoutes');

router.use('/users', userRoutes);
router.use('/groups', groupRoutes);
router.use('/events', eventRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;
