var express = require('express');
var router = express.Router();

//Require controller mode
var katalogController = require('../controllers/katalog.controller');

// Get Index Page from Asset Controller
router.get('/', katalogController.catalog);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
// router.get('/aset/tambah', katalogController.book_create_get);

// POST request for creating Book.
// router.post('/aset/tambah', katalogController.book_create_post);

// GET request to delete Book.
// router.get('/aset/:id/hapus', katalogController.book_delete_get);

// POST request to delete Book.
// router.post('/aset/:id/hapus', katalogController.book_delete_post);

// GET request to update Book.
router.get('/aset/:id/edit', katalogController.asetUpdateGet);

// POST request to update Book.
router.post('/aset/:id/edit', katalogController.asetUpdatePost);

module.exports = router;
