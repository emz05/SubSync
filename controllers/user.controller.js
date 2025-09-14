import User from '../models/user.model.js'

// function that fetches all users from database
export const getUsers = async(req, res, next) =>{
    try{
        const users = await User.find();

        res.status(200).json({success: true, data: users});
    }catch(error){
        next(error);
    }
}

// function that fetches one specific user
export const getUser = async(req, res, next) =>{
    try{
        // get user from specific id, get all fields except password (email, name)
        const user = await User.findById(req.params.id).select('-password');

        if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({success: true, data: user});
    }catch(error){
        next(error);
    }
}