const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Restaurant = require('../models/Restaurant');

module.exports = Router()
  .delete('/:id', [authenticate, authorize], async (req, res, next) => {
    try {
      const data = await Restaurant.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
