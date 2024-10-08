const mongoose = require( 'mongoose' );

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type:String,
        required: true,
        enum: [ 'BusinessOwner', 'User', 'Admin' ]
    },
    refreshToken: {
        type:String
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('user', userSchema);