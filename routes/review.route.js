const express = require('express');
const reviewRoute = express.Router();

const reviewController = require('../controllers/review.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware =  require('../middlewares/role.middleware');

reviewRoute.post('/create/:id', authMiddleware.isAuthorized, roleMiddleware.isNotBusinessOwner, reviewController.createReview);
reviewRoute.get('/review/:id',reviewController.listReview);
reviewRoute.patch('/update/:id', authMiddleware.isAuthorized, reviewController.updateReview);
reviewRoute.delete('/delete/:id', authMiddleware.isAuthorized, roleMiddleware.isNotBusinessOwner, reviewController.deleteReview);
reviewRoute.post('/addReply/:id', authMiddleware.isAuthorized, reviewController.addReply);
reviewRoute.delete('/deleteReply/:id', authMiddleware.isAuthorized, reviewController.deleteReview);

module.exports = reviewRoute;