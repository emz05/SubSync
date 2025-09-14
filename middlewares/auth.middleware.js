import jwt from 'jsonwebtoken';

import { JWT_SECRET } from "../config/env.js";
import User from '../models/user.model.js';

const authorize = async(req, res, next) =>{
    try{
        let token;
        // finds user based off of token of the user trying to make request
        // checks if it exists and decodes the token, verifies user
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            // splits Bearer and returns second half of string aka token
            token = req.headers.authorization.split(' ')[1];
        }
        
        if(!token) return res.status(401).json({message: 'Unauthorized'});

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if(!user) return res.status(401).json({message: 'Unauthorized'});
        // attaches to request (now know who is making request)
        req.user = user;

        next();
    }catch(error){
        res.status(401).json({message:'Unauthorized', error: error.message});
    }
}

export default authorize;