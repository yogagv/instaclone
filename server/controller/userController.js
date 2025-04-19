import User from '../models/UserSchema.js'
import bcrypt from 'bcrypt';

export const getAllUser = async(req, res, next) => {

    try {

        const user = await User.find().select('-password')


            return res.status(200).send({success:true, message:'Users found Successfully!', data: user})

    }catch(error) {


            return res.status(500).send({success:false, message:'Unable to get all Users.'})
    }

};

export const getSingleUser = async(req, res, next) => {

    const userId = req.params.id;

    try{

        const user = await User.findById(userId);

        if(!user) {

            return res.status(404).send({succes:false, message:'User not Found!'})
        }

            const {password, ...rest} = user._doc;

            return res.status(200).send({success:true, message:'User found Succeessfully!', data:{...rest}})

    }catch(error) {

            return res.status(500).send({success:false, message:'Unable to fetch User. '})
    }
}


export const profileUpdate = async(req, res, next) => {

    const id = req.params.id;

    const user = await User.findById(id);

    const nameRegex = /^[a-zA-Z]{3,}(?:\s[a-zA-Z]{1,})?$/;
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9]{3,}[@]{1}[a-zA-Z]{3,}\.[a-zA-Z]{2,}$/;
    const passwordRegex =  /^(?=.*[A-Za-z0-9])(?=.*[@#$%^&*!])[A-Za-z0-9@#$%^&*!]{8,}$/;
    const mobnoRegex = /^[8,9,6][0-9]{9}$/;
    const profilePicRegex = /\.(png|jpg|jpeg)$/i;

    try {

        const {name, email, password, mobno, profilePic} = req.body

        const updatedData = {name, email, mobno, profilePic}

        const changedFields = [];

        if(email && email !== user.email) {

            return res.status(400).json({success:false, message:'Email cannot be updated.'})
        }

        if(name && name !== user.name) {

            if(!nameRegex.test(name)) {
            
            return res.status(400).json({success:false, message:'User name must be at least 3 character and only alphabets are allowed.'});

        }

            updatedData.name = name;
            changedFields.push('name');
        }

        if(mobno && mobno !== user.mobno) {

            if(!mobnoRegex.test(mobno)) {

                return res.status(400).json({success:false, message:'Invalid Mobile no.'})
            }

            updatedData.mobno = mobno;
            changedFields.push('mobno');
        }

        if(profilePic && profilePic !== user.profilePic){

            if(!profilePicRegex.test(profilePic)) {

                return res.status(400).json({success:false, message:'Invalid image URL'})
            }

            updatedData.profilePic = profilePic;
            changedFields.push('profilepic');

        }

        if(password) {

            if(!passwordRegex.test(password)) {

                return res.status(400).json({success:false, message:'Password must be 8 character at least one letter, one number and one special character must be included.'})
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updatedData.password = hashedPassword;
            changedFields.push('password');
        }

        if(changedFields.length === 0) {

            return res.status(400).json({success:false, message:'No valid Field Provided for Update.'})
        }

        const userUpdate = await User.findByIdAndUpdate(id, {$set: updatedData}, {new:true}).select('-password');

        return res.status(200).json({success:true, message:'Profile Updated Successfully!', userUpdate});

    }catch(error) {

        return res.status(500).json({success:false, message:'Failed to update Profile.'});

    }

}

export const profileDelete = async(req, res, next) => {

    const id = req.params.id;

    try {

        const user = await User.findByIdAndDelete(id);

        if(!user) {

            return res.status(404).json({success:false, message:'User not found!'})
        }

            return res.status(200).json({success:true, message:'User Deleted Successfully!'});

    }catch(error) {

        return res.status(500).json({success:false, message:'Failed to delete user'});

    }

}