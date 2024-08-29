const mongoose = require('mongoose');

module.exports = async(req, res)=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/restaurent',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(()=>{
            console.log("Server connected to database...");
        }).catch((err)=>{
            console.log(err)
        })
    } catch(err){
        console.log(err.message);
    }
}