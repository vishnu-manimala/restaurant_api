const User = require( '../models/user.model' );
const helper = require( '../utils/helper');


const register = async( req, res ) =>{

    try{

        //Checks if body has data
        if(!req.body){
            return res.status(400)
                      .json({ status:'error', message: "Request body is empty" });
        }

        //Destructuring data form req.body
        const { name, email, phone, password, role } = req.body;
        
        // Checking if the user already exists
        const existingUser = await User.findOne({ email: email});
        if(existingUser) return res.status(400).json({ status:'error', message: "user already exists" });

        const securePassword = await helper.encryptPassword(password);

        //Create new user
        const newUser = new User({
            name:name,
            email:email,
            password: securePassword,
            role:role
        })

        await newUser().save();

        res.status(201).json({ status:'success', message: ' User registered successfully'});

    }catch(err){
        console.log(err.message);
        res.status(500).json({ status:'error', message: ' Internal server error' })
    }
}


module.exports = {
    register,
};