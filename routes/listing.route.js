const express = require('express');
const listingRouter = express.Router();
const multer = require('multer');

const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware =  require('../middlewares/role.middleware');
const listingController = require('../controllers/listing.controller');

// listingRouter.use( authMiddleware );
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'restaurantImages');//destination folder
    },
    filename: (req, file, cb) =>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()* 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
})

const upload = multer({ storage: storage });

listingRouter.get('/lists', listingController.listRestaurants);
listingRouter.get('/list/:id', listingController.singleRestaurant);
listingRouter.post('/create', authMiddleware.isAuthorized, roleMiddleware.isNotUser, upload.array('files'),listingController.createListing);
listingRouter.patch('/update/:id', authMiddleware.isAuthorized, roleMiddleware.isNotUser, listingController.updateListing);
listingRouter.delete('/delete/:id', authMiddleware.isAuthorized, roleMiddleware.isAdmin, listingController.deleteListing);
listingRouter.patch('/updateImage/:id', authMiddleware.isAuthorized, roleMiddleware.isNotUser, upload.array('files'), listingController.updateImage);
listingRouter.delete('/deleteImage/:id', authMiddleware.isAuthorized, roleMiddleware.isAdmin, listingController.deleteImage);


module.exports = listingRouter;