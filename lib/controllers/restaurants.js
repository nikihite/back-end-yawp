const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Restaurant = require('../models/Restaurant');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await Restaurant.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .get('/:id', async (req, res) => {
    const food = await Restaurant.getById(req.params.id);
    food.reviews = await food.getRestReviews();
    res.json(food);
  })

  .post('/:id/reviews', [authenticate, authorize], async (req, res, next) => {
    try {
      const data = await Restuarant.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
