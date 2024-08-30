const mongoose = require( 'mongoose' );
const userModel = require('./user.model');
const listingModel = require('./listing.model');

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
        required: true
    },
    listingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: listingModel,
        require: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    reply: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: userModel,
          },
          userEmail:{
            type: String,
          },
          userName:{
            type: String,
          },
          message: {
            type: String,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        }
      ],
})

module.exports = mongoose.model('review', reviewSchema);