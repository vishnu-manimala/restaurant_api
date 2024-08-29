const User = require( '../models/user.model' );
const helper = require( '../utils/password.helper');
const jwtHelper = require('../utils/jwt.helper');

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

        await newUser.save();

        res.status(201).json({ status:'success', message: ' User registered successfully'});

    }catch(err){
        console.log(err.message);
        res.status(500).json({ status:'error', message: ' Internal server error' })
    }
}

const login = async (req, res) => {
    try{
        //Checks if body has data
        if(!req.body){
            return res.status(400)
                    .json({ status:'error', message: "Request body is empty" });
        }

        const { email, password } = req.body;

        const user  = await User.findOne({email});
        if(!user) return res.status(404).json({ status:"error", message:"User doesn't exists"});

        const isPasswordMatch = helper.matchPassword(password, user.password);

        if(!isPasswordMatch) return res.status(401).json({ status: "error", message: "Invalid username or password" });

        const accessToken = await jwtHelper.tokenGenerator(user,"1d");
        const refreshToken = await jwtHelper.tokenGenerator(user,"15d");

        user.refreshToken = refreshToken;
        await user.save();

        return res.status(200).json({status:"success", message:"Succesfully logged in.", accessToken:accessToken, refreshToken: refreshToken, user: user })

    }catch(err){
        console.log(err.message);
        return res.status(500).json({ status:"error", message:"Internal server error"});
    }
}

const refreshTokenVerification = async (req, res) => {
    try{
        const { refreshToken } = req.body;
        if(!refreshToken) return res.status(400).json({ status:'error', message: "Request body is empty" });

        const decode = await jwtHelper.verifyToken(refreshToken);
        if(!decode) return res.status(401).json({ staus:"error", message:"invalid refresh token, login again."})

        const user = await User.findOne({_id:decode._id});
        if(!user || user.refreshToken !== refreshToken) return res.status(401).json({ staus:"error", message:"invalid refresh token, login again."})

        const accessToken = await jwtHelper.tokenGenerator(user,"1d");
        return res.status(200).json({ status:"success", message:"New access token generated", accessToken: accessToken });

    } catch(err){
        console.log(err.message);
        return res.status(500).json({ status:"error", message:"Internal server error"});
    }
}

module.exports = {
    register,
    login,
    refreshTokenVerification
};