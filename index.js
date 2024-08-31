const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConnect = require('./database/db.connect');
const swaggerjsdoc = require('swagger-jsdoc');
const swaggeruiexpress = require('swagger-ui-express');
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

//for swagger api documentation
const options = {
    definition:{
        openapi: "3.0.0",
        info: {
            title: " Restaurant Listing api doc",
            version: "0.1.0",
            description:"This is a restaurant listing platform that provides information about various restaurants and     has features such as restaurant menus, images, addresses, features, pricing, book a table, call for ordering, user-reviews, etc.",
            contact: {
                name: "Vishnu P S",
                email: "vishnumanimala8133@gmail.com",
            }
        },
        servers:[
            {
                url: "http://localhost:300/api/"
            },
        ],
    },
    apis: [ " ./routes/*js"],
}
const swagger = swaggerjsdoc(options);
app.use(
    "/api-docs",
    swaggeruiexpress.serve,
    swaggeruiexpress.setup(swagger)
)

app.listen( PORT, ()=>{
    console.log(`server is running at http://localhost:${PORT}`);
});