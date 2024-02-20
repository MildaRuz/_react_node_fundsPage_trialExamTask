const express = require('express');

const fundsRouter = express.Router();
const fundsController = require('../controllers/fundsController');

// routes

// GET all /api/items
fundsRouter.get('/funds', fundsController.getAll);

// GET one /api/funds/1
fundsRouter.get('/funds/:idea_id', fundsController.getSingle);

// POST /api/funds - create
fundsRouter.post('/funds', fundsController.create);

// PuT /api/funds - update
fundsRouter.put('/funds/:idea_id', fundsController.update);

// DELETE /api/funds - delete
fundsRouter.delete('/funds/:idea_id', fundsController.delete);

module.exports = fundsRouter;
