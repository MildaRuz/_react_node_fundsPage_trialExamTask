const express = require('express');

const fundsRouter = express.Router();
const fundsController = require('../controllers/fundsController');
const { validateJWTToken } = require('../middleware');

// routes

// GET all /api/items
fundsRouter.get('/funds', fundsController.getAll);

// GET one /api/funds/1
fundsRouter.get('/funds/:idea_id', fundsController.getSingle);

// POST /api/funds - create
fundsRouter.post('/funds', fundsController.create);

fundsRouter.post('/funds/donated', fundsController.createDonation);

// PuT /api/funds - update
fundsRouter.put('/funds/:idea_id', validateJWTToken, fundsController.update);

// DELETE /api/funds - delete
fundsRouter.delete('/funds/:idea_id', validateJWTToken, fundsController.delete);

module.exports = fundsRouter;
