const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const threadRoutes = require('./threadRoutes');

router.use('/users', userRoutes);
router.use('/comment', commentRoutes);
router.use('/thread', threadRoutes);

module.exports = router;
