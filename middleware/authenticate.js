const jwt = require('jsonwebtoken');
const User = require('../models/user');

const Authenticate = async (req,res,next) =>{
    try{
            const token = req.cookies.usertoken;
            const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

            const rootUser = await User.findOne( {_id: verifyToken._id, "tokens.token":token });
            if(!rootUser){
                 res.status(400).json({errorMessage:'User not found'});
            }
            
            return res.status(200).json(rootUser);
            req.token = token;
            req.rootUser = rootUser;
            req.userId = rootUser._id;
            next();    
        }
    catch(err){
        // res.status(404).json({errorMessage:'Unauthorized: No Token Provided or Expired'});
        console.log('Unauthorized: No Token Provided or Expired');
    }
}
module.exports = Authenticate;