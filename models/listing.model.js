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
        required: true,
    },
    images: [],
    
    street : {
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipCode : {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    isDeleted:{
        type:Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
    
});

module.exports = mongoose.model( 'listing', listingSchema);