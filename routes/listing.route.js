const express = require('express');
const listingRouter = express.Router();
const multer = require('multer');

const authMiddleware = require('../middlewares/auth.middleware');
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

listingRouter.post('/create',upload.array('files'),listingController.createListing);
listingRouter.get('/lists',listingController.listRestaurants);
listingRouter.get('/list/:id',listingController.singleRestaurant);
listingRouter.patch('/update/:id',listingController.updateListing);
listingRouter.delete('/delete/:id',listingController.deleteListing);


module.exports = listingRouter;