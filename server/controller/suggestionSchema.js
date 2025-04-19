import Suggestion from '../models/SuggestionSchema.js'

export const registerSuggestion = async(req, res, next) => {

    const { name, email, profilePic } = req.body

    try { 

        let user = await Suggestion.findOne({email: email})

        if(user) {

            return res.status(400).send({success:false, message:'User already EXist'});
        }

        user = new Suggestion({

            name,
            email,
            profilePic
        })

        await user.save();

        return res.status(200).send({success:true, message:'User registered Successfully!'});

    }catch(error) {
        
        return res.status(500).send({success:false, message:'internal server error'});

    }
}


export const getAllSuggestions = async (req, res, next) => {

    try {

        const suggestions = await Suggestion.find();

        return res.status(200).json({success:true, message:'All Suggestions Found!', data: suggestions})
    
    } catch(error) {

        return res.status(404).json({success:false, message:'Unable to get Suggestions.'})

    }
}