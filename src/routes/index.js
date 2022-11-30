const express = require('express');
const router = express.Router();
const usersRouter = require('./user.route');
const mangasRouter = require('./manga.route');
const tokenRouter = require('./token.route');
const stripeRouter = require('./stripe.route')

router.use('/users/', usersRouter);
router.use('/mangas/', mangasRouter);
router.use('/token/', tokenRouter);
router.use('/stripe/', stripeRouter);

module.exports = router;