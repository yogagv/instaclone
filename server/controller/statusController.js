import Status from '../models/StatusSchema.js'
import User from '../models/UserSchema.js'

export const registerStatus = async (req, res, next) => {

    const { statusPic, caption } = req.body
    
    try {

        const userId = req.userId

        let user = await User.findById(userId)
        
                if(!user) {
        
                    return res.status(404).send({success:false, message:'User not found!'});
                }
        
                let userStory = new Status({
        
                    statusPic,
                    caption,
                    
                })
        
                await userStory.save();

                user.userStatus.push({

                    id: userStory._id,
                    statusPic: userStory.statusPic,
                    caption: userStory.caption
                })

                await user.save();
        
                return res.status(200).send({success:true, message:'Status registered Successfully!'});

    }catch(error) {

        console.log(error);
        

        return res.status(500).send({success:false, message:'internal server error'});

    }

}

export const getAllStatus = async (req, res, next) => {

    try {

        const status = await Status.find();

        return res.status(200).json({success:true, message:'All Status Found!', data: status})
    
    } catch(error) {

        return res.status(404).json({success:false, message:'Unable to get Status.'})

    }
}

export const getSingleStatus = async (req, res, next) => {

    const statusId = req.params.id;

    try{

        const status = await Status.findById(statusId);

        if(!status) {

            return res.status(404).send({succes:false, message:'Status not Found!'})
        }

            return res.status(200).send({success:true, message:'Status found Succeessfully!', data:status})

    }catch(error) {

            return res.status(500).send({success:false, message:'Unable to fetch Status. '})

    }

}

