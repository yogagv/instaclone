import User from '../models/UserSchema.js';
import jwt from 'jsonwebtoken';

export const authenticate = (req,res,next) => {

        const authToken = req.headers.authorization;

        if(!authToken || !authToken.startsWith("Bearer")) {

            return res.status(401).json({success:false, message:'Access Denied'});
        }

        try {

            const token = authToken.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.userId = decoded.id;
            req.role = decoded.role;
            next();
        }catch(error) {

            if(error.name === 'TokenExpiredError') {

            return res.status(401).json({success:false, message:'Token Expired!'});
        }
            return res.status(401).json({success:false, message:'Invalid Token'});

        }

}


export const restrict = (role) => async(req,res,next) => {

    try {

        const userId = req.userId;
        const user = await User.findById(userId);

        if(!user) {

            return res.status(404).send({success:false, message:'User not found!'});
        }

        const userRole = user.role;

        if(userRole === 'user' && role.includes('user')) {

            next();
        }

        else if(userRole === 'admin' && role.includes('admin')) {
            next();

        }

        else {

            return res.status(401).send({success:false, message:'You are not Authorized'});
        }

    }catch(error) {

        return res.status(500).send({success:false, message:'Internal Server Error'});
    }

}