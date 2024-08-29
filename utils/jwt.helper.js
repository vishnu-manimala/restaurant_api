const jwt =  require('jsonwebtoken');
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const tokenGenerator = async(data,expiry) => {
  return await jwt.sign({data}, PRIVATE_KEY, { expiresIn:expiry }); 
}


module.exports = {
    tokenGenerator,
}