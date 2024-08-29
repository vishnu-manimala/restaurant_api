const mongoose = require( 'mongoose' );
const userModel = require('./user.model');

const listingSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
    },
    name: {
        type: String,
        required: true,
    },
    businessPhone: {
        type: Number,
    },
    imgaes: [],
    addres: {
        street : String,
        city: String,
        state: String,
        zipCode : Number,
        country: String
    }
});

module.exports = mongoose.model( 'listing', listingSchema);