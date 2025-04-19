import mongoose from 'mongoose'

const StatusSchema = new mongoose.Schema({


    statusPic: {

        type: String,
        required: true
    },
    
    caption: {

        type: String,
        required: true
    },

})

export default mongoose.model('Status', StatusSchema)