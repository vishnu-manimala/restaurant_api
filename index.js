const express = require('express');

const dbConnect = require('./database/db.connect');
const { connect } = require('mongoose');

const app = express();
require('dotenv').config();
dbConnect();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require( './routes/auth.route');

app.use( '/api/auth', authRoutes); // For authentication and authorization requests.

// app.get('/', ( req,res ) =>{
//     res.send("hi");
// })


app.listen( PORT, ()=>{
    console.log(`server is running at http://localhost:${PORT}`);
});