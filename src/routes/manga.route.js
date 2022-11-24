const express = require('express');
const router = express.Router();
const mangaController = require('../controllers/manga.controller')
const verifyToken = require('../middleware/verifyToken');

router.get('/', mangaController.getAll);
router.get('/:id', mangaController.getId);
router.post('/', mangaController.post);
router.put('/:id', mangaController.update);
router.delete('/:id', mangaController.delete);

module.exports = router;