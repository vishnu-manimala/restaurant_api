const jwtHelper = require('../utils/jwt.helper');

const isAuthorized = async( req, res, next ) => {

    //Checks for token in headers.
    const token = req.headers.authorization;
    if(!token) return res.status(400).json({ status:'error', message: "Token not provided" });

    //verify jwt token
    const decode = await jwtHelper.verifyToken(token);
    if(!decode) return res.status(401).json({status:"Unauthorized access", message:"Token expired"});

    req.role = decode.role;// adding user role to req object;
    req.userId = decode._id;// adding user id to req object;
    next();

}