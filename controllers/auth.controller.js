const User = require( '../models/user.model' );
const helper = require( '../utils/password.helper');
const jwtHelper = require('../utils/jwt.helper');

const register = async( req, res ) =>{

    try{

        //Checks if body has data
        if(!req.body){
            return res.status(400).json({ status:'error', message: "Request body is empty" });
        }

        //Destructuring data form req.body
        const { name, email, phone, password, role } = req.body;
        
        // Checking if the user already exists
        const existingUser = await User.findOne({ email: email});
        if(existingUser) return res.status(409).json({ status:'error', message: "user already exists" });

        const securePassword = await helper.encryptPassword(password);

        //Create new user
        const newUser = new User({
            name:name,
            email:email,
            password: securePassword,
            role:role
        })

        await newUser.save();

        res.status(201).json({ status:'success', message: 'User registered successfully'});

    }catch(err){
        console.log(err.message);
        res.status(500).json({ status:'error', message: err.message})
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
        if(!email || !password) return res.status(400).json({ status:"error", message:"User credentials required"});

        //Checks for existence of user
        const user  = await User.findOne({email});
        if(!user) return res.status(401).json({ status:"error", message:"User doesn't exists"});

        //checks password matching
        const isPasswordMatch = await helper.matchPassword(password, user.password);
        console.log(isPasswordMatch);
        if(!isPasswordMatch) return res.status(401).json({ status: "error", message: "Invalid username or password" });

        //Generating Tokens
        const accessToken = await jwtHelper.tokenGenerator(user,"1d");
        const refreshToken = await jwtHelper.tokenGenerator(user,"15d");

        //Saves refresh token in db
        user.refreshToken = refreshToken;
        await user.save();

        return res.status(200).json({status:"success", message:"Successfully logged in.", accessToken:accessToken, refreshToken: refreshToken, user: user })

    }catch(err){
        console.log(err.message);
        return res.status(500).json({ status:"error", message:"Internal server error"});
    }
}

const refreshTokenVerification = async (req, res) => {
    try{
        
        //Checks req body have enough data to proceed
        const { refreshToken } = req.body;
        if(!refreshToken) return res.status(400).json({ status:'error', message: "Request body is empty" });
        console.log(refreshToken)
        //decodes refresh token to get user data- verifying
        const decode = await jwtHelper.verifyToken(refreshToken);
        console.log("decode",decode)
        if(!decode) return res.status(401).json({ status:"error", message:"invalid refresh token, login again."})

        //gets data from user db and validates refresh token
        const user = await User.findOne({_id:decode.data._id});
        if(!user || user.refreshToken !== refreshToken) return res.status(401).json({ status:"error", message:"invalid refresh token, login again."})

        //generates new access token and sends back to client
        const accessToken = await jwtHelper.tokenGenerator(user,"1d");
        return res.status(201).json({ status:"success", message:"New access token generated", accessToken: accessToken });

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