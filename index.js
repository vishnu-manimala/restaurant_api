const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConnect = require('./database/db.connect');
const { connect } = require('mongoose');

const app = express();
require('dotenv').config();
dbConnect();

const PORT = process.env.PORT;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require( './routes/auth.route');
const listingRoutes = require('./routes/listing.route');
const reviewRoutes = require('./routes/review.route');

app.use( '/api/auth', authRoutes); // For authentication and authorization requests.
app.use( '/api/listing', listingRoutes); // For listing related requests.
app.use( '/api/review', reviewRoutes); // For review related requests.

app.listen( PORT, ()=>{
    console.log(`server is running at http://localhost:${PORT}`);
});