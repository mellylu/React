const express = require('express');
const router = express.Router();
const usersRouter = require('./user.route');
const mangasRouter = require('./manga.route');

router.use('/users/', usersRouter);
router.use('/mangas/', mangasRouter);

module.exports = router;