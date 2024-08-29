const express = require('express');
const reviewRoute = express.Router();

const reviewController = require('../controllers/review.controller');

reviewRoute.post('/create',reviewController.createReview);
reviewRoute.get('/list/:id',reviewController.listReview);
reviewRoute.patch('/update/:id',reviewController.updateReview);
reviewRoute.delete('/delete/:id',reviewController.deleteReview);
reviewRoute.post('/addReply/:id', reviewController.addReply);

module.exports = reviewRoute;