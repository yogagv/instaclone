import User from '../models/UserSchema.js'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

// const secretkey = crypto.randomBytes(32).toString('hex');
// console.log(secretkey);


const generateToken =(user) => {

    return jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET_KEY, {expiresIn:'2d'});
}

export const registerUser = async(req, res, next) => {

    const {name, email, password, mobno, profilePic, role} = req.body

    const nameRegex = /^[a-zA-Z]{3,}(?:\s[a-zA-Z]{1,})?$/;
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9]{3,}[@]{1}[a-zA-Z]{3,}\.[a-zA-Z]{2,}$/;
    const passwordRegex =  /^(?=.*[A-Za-z0-9])(?=.*[@#$%^&*!])[A-Za-z0-9@#$%^&*!]{8,}$/;
    const mobnoRegex = /^[8,9,6][0-9]{9}$/;
    const profilePicRegex = /\.(png|jpg|jpeg)$/i;

    if(!name || !nameRegex.test(name)) {

        return res.status(400).json({success:false, message:'User name must be at least 3 character and only alphabets are allowed.'});
    }

    if(!email || !emailRegex.test(email)) {

        return res.status(400).json({success:false, message:'Invalid email address.'}); 
    }

    if(!password || !passwordRegex.test(password)) {

        return res.status(400).json({success:false, message:'Passowrd must be 8 character at least one letter, one number and one special character must be included.'});
    }

    if(!mobno || !mobnoRegex.test(mobno)) {

        return res.status(400).json({success:false, message:'Invalid Mobile no.'});
    }

    if(!profilePic || !profilePicRegex.test(profilePic)) {

        return res.status(400).json({success:false, message:'Invalid image URL!'});
    }

    try {

        let user = await User.findOne({email: email})

        if(user) {

            return res.status(400).json({success:false, message:'User Already Exist'})
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        user = new User({

            name,
            email,
            password:passwordHash,
            mobno,
            profilePic,
            role
        })

        await user.save();

        return res.status(200).json({success:true, message:'User Registered Successfully!'});

    }catch(error) {}

        return res.status(500).json({success:false, message:'Faild to Register user'})

}


export const loginUser = async(req, res, next) => {

    const { email } = req.body

    try{

        const user = await User.findOne({email:email})

        if(!user) {

            return res.status(400).json({success:false, message:'Invalid Email'});
        }

        //password matching

        const isPasswordMatch = await bcrypt.compare(req.body.password , user.password)

        if(!isPasswordMatch) {

            return res.status(400).json({success:false, message:'Invalid Password'});
        }

        const token = generateToken(user);

        const {password, role, ...rest} = user._doc

            return res.status(200).json({success:true, message:'User Found Successfully!', token,  data:{...rest}, role});

    }catch(error) {

            return res.status(500).json({success:false, message:'Unable to fetch user'});

    }

}